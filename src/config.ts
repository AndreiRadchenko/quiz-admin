import dotenv from 'dotenv';
dotenv.config();

export const config = {
  S3_PORT: Number(process.env.S3_PORT),
  S3_END_POINT: process.env.S3_END_POINT as string,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY as string,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY as string,
};
