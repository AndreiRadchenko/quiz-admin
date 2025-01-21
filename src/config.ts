// import dotenv from 'dotenv';
// dotenv.config();

export const config = {
  S3_PORT: Number(process.env.NEXT_PUBLIC_S3_PORT),
  S3_END_POINT: process.env.NEXT_PUBLIC_S3_END_POINT as string,
  S3_ACCESS_KEY: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
  S3_SECRET_KEY: process.env.NEXT_PUBLIC_S3_SECRET_KEY as string,
  S3_BUCKET_QUESTIONS: process.env.NEXT_PUBLIC_S3_BUCKET_QUESTIONS as string,
  S3_BUCKET_PLAYERS: process.env.NEXT_PUBLIC_S3_BUCKET_PLAYERS as string,

  // S3_PORT: 9002,
  // S3_END_POINT: 'localhost',
  // S3_ACCESS_KEY: 'd94sewIw2EciOt9qJfWT',
  // S3_SECRET_KEY: 'jurJBIaoulo8LWjXiqmEjL7TQMMnDRcs7NdtvN7Z',
  // S3_BUCKET_QUESTIONS: 'questions',
  // S3_BUCKET_PLAYERS: 'players',
};
