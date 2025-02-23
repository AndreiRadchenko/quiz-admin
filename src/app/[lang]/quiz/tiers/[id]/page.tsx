import QuestionImage from './_components/QuestionImage';
import SliderHeader from './_components/SliderHeader';
import QuestionData from './_components/QuestionData';
import QuestionButtons from './_components/QuestionButtons';
import QuestionPagination from './_components/QuestionPagination';

import questionsData from '../_template/questionTableTemplate.json' assert { type: 'json' };

import { extractFileName } from '@/utils/RegEx';
import { getDictionary } from '../../../../../../dictionaries/dictionaries';
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
export type QuestionsDataType = ArrayElementType<typeof questionsData>;

type Props = {
  params: { lang: string; id: string };
};

export default async function QuizQuestionSlide({
  params: { lang, id },
}: Readonly<Props>) {
  const {
    quiz: {
      questionBank: { slider },
    },
  } = await getDictionary(lang);

  const defaultData = {
    idx: 'Unknown',
    legend: '50% Question',
    bindType: '',
    boundQuestion: '',
  };

  const slideData = questionsData.find(e => e.idx === id) || defaultData;
  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/questions/';
  const img = '';

  return (
    <>
      <div className="flex flex-row justify-between gap-10">
        <Link href={'/' + lang + '/quiz/questions'} className="self-start mt-1">
          <ArrowLeft />
        </Link>
        <SliderHeader
          locale={lang as Locale}
          labels={(slider as SliderType).labels}
          data={slideData}
        />
        <QuestionButtons buttons={slider.buttons} className="my-0" />
      </div>
      <div className="flex flex-col gap-5 mt-5 mb-5">
        <QuestionImage img={img} imgBasePath={imgBasePath} />
      </div>
      <QuestionPagination questions={questionsData} id={id} />
    </>
  );
}
