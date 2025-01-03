import * as Minio from 'minio';
import debounce from 'lodash.debounce';
import { EventEmitter } from 'events';

import { config } from '@/config';

export interface UploadedObjectInfo {
  etag: string;
  versionId: string | null;
}

export class S3Service {
  public eventEmitter = new EventEmitter();
  private static instances: Map<string, S3Service> = new Map();
  private Bucket: Minio.Client;
  private bucketName: string;

  // private publicReadPolicy = {
  //   Version: '2012-10-17',
  //   Statement: [
  //     {
  //       Effect: 'Allow',
  //       Principal: '*',
  //       Action: ['s3:GetObject'],
  //       Resource: [], // To be updated dynamically
  //     },
  //   ],
  // };
  private publicReadPolicy = () => ({
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${this.bucketName}/*`],
      },
    ],
  });

  private constructor(bucketName: string) {
    this.bucketName = bucketName;
    this.Bucket = new Minio.Client({
      endPoint: config.S3_END_POINT,
      port: config.S3_PORT,
      useSSL: false,
      accessKey: config.S3_ACCESS_KEY,
      secretKey: config.S3_SECRET_KEY,
    });

    // Update the publicReadPolicy with the current bucket name
    // this.publicReadPolicy.Statement[0].Resource = [
    //   `arn:aws:s3:::${this.bucketName}/*`,
    // ];
  }

  private async init(): Promise<void> {
    const exists = await this.Bucket.bucketExists(this.bucketName);
    if (!exists) {
      await this.Bucket.makeBucket(this.bucketName);
      await this.Bucket.setBucketPolicy(
        this.bucketName,
        JSON.stringify(this.publicReadPolicy())
      );
    }
    this.startBucketPoller();
  }

  public static async getInstance(bucketName: string): Promise<S3Service> {
    if (!S3Service.instances.has(bucketName)) {
      const instance = new S3Service(bucketName);
      await instance.init();
      S3Service.instances.set(bucketName, instance);
      console.log(`S3Service for bucket "${bucketName}" initialized.`);
    }
    return S3Service.instances.get(bucketName)!;
  }

  public async uploadFile(file: File): Promise<UploadedObjectInfo> {
    try {
      return await this.Bucket.putObject(
        this.bucketName,
        file.name,
        Buffer.from(await file.arrayBuffer())
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Failed to upload file: ${file.name}`);
    }
  }

  public async getImages(): Promise<Minio.BucketItem[]> {
    const data: Minio.BucketItem[] = [];
    const stream = this.Bucket.listObjects(this.bucketName, '', true);

    return new Promise((resolve, reject) => {
      stream.on('data', obj => data.push(obj));
      stream.on('end', () => resolve(data));
      stream.on('error', err => reject(err));
    });
  }

  public async removeImages(objectsList: string[]): Promise<void> {
    try {
      await this.Bucket.removeObjects(this.bucketName, objectsList);
    } catch (error) {
      console.error('Error removing files:', error);
      throw new Error('Failed to remove files');
    }
  }

  private startBucketPoller(): void {
    const poller = this.Bucket.listenBucketNotification(
      this.bucketName,
      '',
      '',
      ['s3:ObjectCreated:*', 's3:ObjectRemoved:*']
    );

    const debouncedUpdate = debounce(async () => {
      try {
        const bucketImages = await this.getImages();
        this.eventEmitter.emit('bucketUpdate', this.bucketName, bucketImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }, 1000);

    poller.on('notification', debouncedUpdate);
  }

  public onBucketUpdate(
    callback: (bucket: string, images: Minio.BucketItem[]) => void
  ): void {
    this.eventEmitter.on('bucketUpdate', callback);
  }
}
