import * as Minio from 'minio';

import { config } from '@/config';

export interface UploadedObjectInfo {
  etag: string;
  versionId: string | null;
}

class S3Service {
  Bucket;
  QuestionsBucket: string = 'questions';
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
    if (!exists) {
      await this.Bucket.makeBucket(this.QuestionsBucket);
      await this.Bucket.setBucketPolicy(
        this.QuestionsBucket,
        JSON.stringify(this.publicReadPolicy)
      );
    }
  }

  async uploadFile(file: File): Promise<UploadedObjectInfo> {
    return await this.Bucket.putObject(
      this.QuestionsBucket,
      file.name,
      Buffer.from(await file.arrayBuffer())
    );
  }

  // async deleteImage(url: string): Promise<DeleteObjectOutput> {
  //   return this.Bucket.deleteObject({
  //     Bucket: configs.S3_NAME as string,
  //     Key: url,
  //   }).promise();
  // }
}

export const s3Service = await (async () => {
  try {
    const instance = new S3Service();
    await instance.init();
    return instance;
  } catch (error) {
    console.log('s3Service error: ', error);
    return null;
  }
})();
