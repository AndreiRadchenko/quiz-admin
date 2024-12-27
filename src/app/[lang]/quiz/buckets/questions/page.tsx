'use client';
import { useEffect } from 'react';

import { QuizTable } from '@/components/quiz';
import ImagesTableRow from './_components/ImagesTableRow';
import { usePageContext } from '../_context/pageContext';
import { useSystemState } from '@/context/SystemStateProvider';
import { TableHeaderComponent } from './_components/tableHeaderComponet';
import { ShowImages } from './_components/showImages';

import { sortItemsByField } from '@/utils/SortFunc';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default function QuestionImages({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    bucketsLocale: { table },
    state: { sort, view },
  } = usePageContext();
  const {
    state: { questionImages },
    updateQuestionImages,
  } = useSystemState();

  useEffect(() => {
    switch (sort) {
      case 'a-z':
        updateQuestionImages({
          questionImages: sortItemsByField(questionImages, 'name', 'asc'),
        });
        break;
      case 'z-a':
        updateQuestionImages({
          questionImages: sortItemsByField(questionImages, 'name', 'desc'),
        });
        break;
      case 'newest':
        updateQuestionImages({
          questionImages: sortItemsByField(
            questionImages,
            'lastModified',
            'asc'
          ),
        });
        break;
      case 'oldest':
        updateQuestionImages({
          questionImages: sortItemsByField(
            questionImages,
            'lastModified',
            'desc'
          ),
        });
        break;
      default:
    }
  }, [questionImages, sort, updateQuestionImages]);

  return view === 'list' ? (
    <QuizTable
      QuizTableRow={ImagesTableRow}
      header={table!.header}
      TableHeaderComponent={() => (
        <TableHeaderComponent
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
    <ShowImages />
  );
}
