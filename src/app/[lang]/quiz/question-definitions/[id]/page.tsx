import QuestionImage from './_components/QuestionImage';
import SliderHeader from './_components/SliderHeader';
import QuestionData from './_components/QuestionData';
import QuestionButtons from './_components/QuestionButtons';
import QuestionPagination from './_components/QuestionPagination';

import questionsData from '../_template/tableTemplate.json' assert { type: 'json' };

import { extractFileName } from '@/utils/RegEx';
import { getDictionary } from '../../../../../../dictionaries/dictionaries';
import {
  type QuestionDefinitionsType,
  type NestedType,
  type ArrayElementType,
} from '../../../../../../dictionaries/dictionaries';
import { Locale } from '../../../../../../i18n-config';
import { config } from '@/config';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export type SliderType = NestedType<QuestionDefinitionsType, 'slider'>;
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
      questionDefinitions: { slider },
    },
  } = await getDictionary(lang);

  const defaultData = {
    id: 'Unknown',
    label: 'Not found',
    imagePath: '',
    answerType: '',
    answerOptions: '',
    correctAnswer: '',
    description: '',
  };

  const slideData = questionsData.find(e => e.id === id) || defaultData;
  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/questions/';
  const img = extractFileName(slideData.imagePath);

  return (
    <>
      <div className="flex flex-row justify-between gap-10">
        <Link
          href={'/' + lang + '/quiz/question-definitions'}
          className="self-start mt-1"
        >
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
