'use client';
import questionsData from '@/mock/questionsTableTemplate.json' assert { type: 'json' };

const wait = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

export const getQuestionsData = async () => {
  await wait(500);
  return questionsData;
};
