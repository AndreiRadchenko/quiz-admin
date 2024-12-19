import * as Minio from 'minio';
import debounce from 'lodash.debounce';
import { EventEmitter } from 'events';

import { config } from '@/config';
import { type QuestionImagesType } from '@/context/SystemStateProvider';

export interface UploadedObjectInfo {
  etag: string;
  versionId: string | null;
}

export class S3Service {
  public eventEmitter = new EventEmitter();
  private static instance: S3Service | null = null;
  private Bucket: Minio.Client;
  private QuestionsBucket: string = 'questions';
  publicReadPolicy = {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${this.QuestionsBucket}/*`],
      },
    ],
  };

  constructor() {
    this.Bucket = new Minio.Client({
      endPoint: config.S3_END_POINT,
      port: config.S3_PORT,
      useSSL: false,
      accessKey: config.S3_ACCESS_KEY,
      secretKey: config.S3_SECRET_KEY,
    });
  }

  async init() {
    const exists = await this.Bucket.bucketExists(this.QuestionsBucket);
    if (exists) {
    } else {
      await this.Bucket.makeBucket(this.QuestionsBucket);
      await this.Bucket.setBucketPolicy(
        this.QuestionsBucket,
        JSON.stringify(this.publicReadPolicy)
      );
    }
    this.startBucketPoller();
  }

  static async getInstance(): Promise<S3Service | null> {
    if (!S3Service.instance) {
      try {
        const instance = new S3Service();
        await instance.init();
        S3Service.instance = instance;
        console.log('S3Service initialized.');
      } catch (error) {
        console.error('Error initializing S3Service:', error);
        return null;
      }
    }
    return S3Service.instance;
  }

  async uploadFile(file: File): Promise<UploadedObjectInfo> {
    try {
      return await this.Bucket.putObject(
        this.QuestionsBucket,
        file.name,
        Buffer.from(await file.arrayBuffer())
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Failed to upload file: ${file.name}`);
    }
  }

  async getImages(): Promise<QuestionImagesType> {
    const data: Minio.BucketItem[] = [];
    const stream = this.Bucket.listObjects(this.QuestionsBucket, '', true);

    return new Promise((resolve, reject) => {
      stream.on('data', obj => data.push(obj));
      stream.on('end', () => resolve({ questionImages: data }));
      stream.on('error', err => reject(err));
    });
  }

  startBucketPoller(): void {
    const poller = this.Bucket.listenBucketNotification(
      this.QuestionsBucket,
      '',
      '',
      ['s3:ObjectCreated:*', 's3:ObjectRemoved:*']
    );

    const debouncedUpdate = debounce(async () => {
      try {
        const bucketImages = await this.getImages();
        this.eventEmitter.emit('bucketUpdate', bucketImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }, 1000);

    poller.on('notification', debouncedUpdate);
  }

  onBucketUpdate(callback: (images: QuestionImagesType) => void): void {
    this.eventEmitter.on('bucketUpdate', callback);
  }
}
