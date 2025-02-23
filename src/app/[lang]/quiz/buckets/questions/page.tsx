'use client';
import { useEffect } from 'react';

import { QuizTable } from '@/components/quiz';
import QuestionTableRow from './_components/QuestionTableRow';
import { usePageContext } from '../_context/pageContext';
import { useAppStore } from '@/context/appStoreProvider';
import { QuestionTableHeader } from './_components/QuestionTableHeader';
import { QuestionImages } from './_components/QuestionImages';

import { sortItemsByField } from '@/utils/SortFunc';

type Props = {
  params: { lang: string };
};

export default function QuestionImagesPage({
  params: { lang },
}: Readonly<Props>) {
  const {
    bucketsLocale: { table },
    state: { sort, view },
  } = usePageContext();

  const questionImages = useAppStore(state => state.questionImages);
  const updateQuestionImages = useAppStore(state => state.updateQuestionImages);

  useEffect(() => {
    switch (sort) {
      case 'a-z':
        updateQuestionImages(sortItemsByField(questionImages, 'name', 'asc'));
        break;
      case 'z-a':
        updateQuestionImages(sortItemsByField(questionImages, 'name', 'desc'));
        break;
      case 'newest':
        updateQuestionImages(
          sortItemsByField(questionImages, 'lastModified', 'asc')
        );
        break;
      case 'oldest':
        updateQuestionImages(
          sortItemsByField(questionImages, 'lastModified', 'desc')
        );
        break;
      default:
    }
  }, [questionImages, sort, updateQuestionImages]);

  return view === 'list' ? (
    <QuizTable
      QuizTableRow={QuestionTableRow}
      header={table!.header}
      TableHeaderComponent={() => (
        <QuestionTableHeader
          header={table!.header}
          headerTooltips={table!.headerTooltips}
        />
      )}
      rowsData={questionImages!.map((e, idx) => {
        const isoDate = new Date(e.lastModified as Date);
        return {
          name: e.name as string,
          lastModified: isoDate.toLocaleString('en-GB'),
          size: e.size as number,
          id: String(idx),
        };
      })}
    />
  ) : (
    <QuestionImages />
  );
}
