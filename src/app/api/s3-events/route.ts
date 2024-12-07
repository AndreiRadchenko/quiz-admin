import { S3Service } from '@/services/s3Services';
import { QuestionImagesType } from '@/context/SystemStateProvider';

export async function GET(request: Request): Promise<Response> {
  // Create a new ReadableStream to handle SSE
  const stream = new ReadableStream({
    start(controller) {
      (async () => {
        const s3Service = await S3Service.getInstance();

        if (!s3Service) {
          controller.close();
          throw new Error('Failed to initialize S3Service');
        }

        // Function to send bucket updates to the client
        const onUpdate = (images: QuestionImagesType) => {
          const data = `data: ${JSON.stringify(images)}\n\n`;
          controller.enqueue(new TextEncoder().encode(data));
        };

        // Register the event listener
        s3Service.onBucketUpdate(onUpdate);

        // Handle cleanup when the client disconnects
        const cleanup = () => {
          console.log('Connection closed');
          s3Service.eventEmitter.removeListener('bucketUpdate', onUpdate);
          controller.close();
        };

        // Listen for client disconnect via AbortSignal
        request.signal.addEventListener('abort', cleanup);
      })().catch(err => {
        console.error('Error in SSE handler:', err);
        controller.error(err);
      });
    },
  });

  // Return the Response object with SSE headers
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
