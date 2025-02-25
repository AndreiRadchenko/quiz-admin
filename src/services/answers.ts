'use client';
import answersData from '@/mock/answersTableTemplate.json' assert { type: 'json' };

const wait = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

export const getAnswersData = async () => {
  await wait(500);
  return answersData;
};
