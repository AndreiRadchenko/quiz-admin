'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import QuestionImage from './_components/QuestionImage';
import SliderHeader from './_components/SliderHeader';
import ControlButtons from './_components/ControlButtons';
import StateButtons from './_components/StateButtons';
import Countdown from './_components/Countdown';
import QuizPagination from '@/app/[lang]/quiz/_components/QuizPagination';
import Loader from '@/components/quiz/loader';
import { ArrowLeft } from 'lucide-react';

import { usePageContext } from '../_context/pageContext';
import { QUERYKEY } from '@/services/queryKeys';
import { getQuestionsData } from '@/services/questions';
import { getTiersData } from '@/services/tiers';
import { type QuestionDataType, type TierDataType } from '@/types/dataTypes';
import { extractFileName } from '@/utils/RegEx';
import {
  type QuestionBankType,
  type NestedType,
  type QuizTiersType,
} from '../../../../../../dictionaries/dictionaries';
import { Locale } from '../../../../../../i18n-config';
import { config } from '@/config';
import { useCachedQuery } from '@/hooks/useCachedQuery';
import QuestionData from './_components/QuestionData';
import Countdown2 from './_components/Countdown2';

export type SliderType = NestedType<QuizTiersType, 'slider'>;
export type LabelsType = NestedType<SliderType, 'labels'>;

const defaultData = {
  id: '100',
  idx: '-3',
  legend: 'Demo 1',
  answerType: '',
  boundQuestion: '',
};

const uboundQuestionData = {
  id: '3',
  label: 'No question bound',
  imagePath: 'noImage',
  answerType: '',
  answerOptions: '',
  correctAnswer: '',
  description: 'No description',
  boundToNumber: 'unbound',
  passAllowed: true,
};

type Props = {
  params: { lang: string; id: string };
};

export default function QuizTierSlide({
  params: { lang, id },
}: Readonly<Props>) {
  const {
    tiersLocale: { slider },
  } = usePageContext();

  const { data: questionsState } = useCachedQuery<QuestionDataType[]>(
    [QUERYKEY.QUESTIONS],
    getQuestionsData
  );

  const { data: tiersState, isLoading } = useCachedQuery<TierDataType[]>(
    [QUERYKEY.TIERS],
    getTiersData
  );

  const currentTier = tiersState?.find(e => e.id === id) || defaultData;
  const boundQuestion =
    questionsState?.find(e => e.label === currentTier.boundQuestion) ||
    uboundQuestionData;
  const imagePath = extractFileName(boundQuestion.imagePath);

  const slideData = {
    ...boundQuestion,
    imagePath,
    idx: currentTier.idx,
    legend: currentTier.legend,
    boundQuestion: currentTier.boundQuestion,
  };

  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/questions/';

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col justify-around gap-5 h-[90vh]">
      <div className="flex flex-row justify-between gap-10">
        <Link href={'/' + lang + '/quiz/tiers'} className="self-start mt-1">
          <ArrowLeft />
        </Link>
        <SliderHeader
          locale={lang as Locale}
          labels={(slider as SliderType)!.labels}
          data={{ ...slideData }}
        />
        <StateButtons buttons={slider!.buttons.state} className="my-0" />
      </div>
      <ControlButtons
        buttons={slider!.buttons.control}
        className="mx-auto mt-5"
      />

      <div className="flex flex-row justify-around items-end gap-10 mt-5 mb-5">
        <div className="flex flex-col justify-around items-center h-full">
          QUESTION_OPEN
          <Countdown2 />
          <QuestionData labels={slider!.labels} data={slideData} />
        </div>
        {slideData.imagePath && (
          <QuestionImage img={slideData.imagePath} imgBasePath={imgBasePath} />
        )}
      </div>
      {tiersState && <QuizPagination questions={tiersState} id={id} />}
    </div>
  );
}
