'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import QuestionImage from './_components/QuestionImage';
import SliderHeader from './_components/SliderHeader';
import QuestionButtons from './_components/QuestionButtons';
import QuizPagination from '@/app/[lang]/quiz/_components/QuizPagination';
import { usePageContext } from '../_context/pageContext';
import { QUERYKEY } from '@/services/queryKeys';
import { getQuestionsData } from '@/services/questions';
import Loader from '@/components/quiz/loader';
import { type QuestionDataType } from '@/types/dataTypes';

import { extractFileName } from '@/utils/RegEx';
import {
  type QuestionBankType,
  type NestedType,
  type ArrayElementType,
} from '../../../../../../dictionaries/dictionaries';
import { Locale } from '../../../../../../i18n-config';
import { config } from '@/config';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export type SliderType = NestedType<QuestionBankType, 'slider'>;
export type LabelsType = NestedType<SliderType, 'labels'>;

type Props = {
  params: { lang: string; id: string };
};

export default function QuizQuestionSlide({
  params: { lang, id },
}: Readonly<Props>) {
  const {
    questionsLocale: { slider },
  } = usePageContext();

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<QuestionDataType[]>([
    QUERYKEY.QUESTIONS,
  ]);

  const { data, isLoading } = useQuery({
    queryKey: [QUERYKEY.QUESTIONS],
    queryFn: getQuestionsData,
    enabled: !cachedData, // ✅ Only fetch if not in cache
    initialData: cachedData, // ✅ Use cached data if available
  });

  const defaultData = {
    id: 'Unknown',
    label: 'Not found',
    imagePath: '',
    answerType: '',
    answerOptions: '',
    correctAnswer: '',
    description: '',
    boundToNumber: 'unbound',
    passAllowed: true,
  };

  const slideData = data?.find(e => e.id === id) || defaultData;
  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/questions/';
  const img = extractFileName(slideData.imagePath);

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col justify-around gap-10 h-[90vh]">
      <div className="flex flex-row justify-between gap-10">
        <Link href={'/' + lang + '/quiz/questions'} className="self-start mt-1">
          <ArrowLeft />
        </Link>
        <SliderHeader
          locale={lang as Locale}
          labels={(slider as SliderType)!.labels}
          data={slideData}
        />
        <QuestionButtons buttons={slider!.buttons} className="my-0" />
      </div>
      <div className="flex flex-col gap-5 mt-5 mb-5">
        {img && <QuestionImage img={img} imgBasePath={imgBasePath} />}
      </div>
      {data && <QuizPagination questions={data} id={id} />}
    </div>
  );
}
