import * as Minio from 'minio';

import { config } from '@/config';

export interface UploadedObjectInfo {
  etag: string;
  versionId: string | null;
}

export class S3Service {
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

}