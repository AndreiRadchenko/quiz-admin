import * as Minio from 'minio';
import { S3Service } from '@/services/s3Services';
import { config } from '@/config';

export async function GET(request: Request): Promise<Response> {
  // Create a new ReadableStream to handle SSE
  const stream = new ReadableStream({
    start(controller) {
      (async () => {
        const questionsService = await S3Service.getInstance(
          config.S3_BUCKET_QUESTIONS
        );
        const playerService = await S3Service.getInstance(
          config.S3_BUCKET_PLAYERS
        );

        if (!questionsService && !playerService) {
          controller.close();
          throw new Error('Failed to initialize S3Service');
        }

        // Function to send bucket updates to the client
        const onUpdate = (bucket: string, images: Minio.BucketItem[]) => {
          const data = `data: ${JSON.stringify({ bucket, images })}\n\n`;
          controller.enqueue(new TextEncoder().encode(data));
        };

        // Register the event listener
        questionsService.onBucketUpdate(onUpdate);
        playerService.onBucketUpdate(onUpdate);

        // Handle cleanup when the client disconnects
        const cleanup = () => {
          console.log('Connection closed');
          questionsService.eventEmitter.removeListener(
            'bucketUpdate',
            onUpdate
          );
          playerService.eventEmitter.removeListener('bucketUpdate', onUpdate);
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
