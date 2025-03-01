'use client';
import tiersData from '@/mock/tiersTableTemplate.json' assert { type: 'json' };
import { type TierDataType } from '@/types/dataTypes';

const wait = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

export const getTiersData = async () => {
  await wait(500);
  return tiersData as unknown as TierDataType[];
};
