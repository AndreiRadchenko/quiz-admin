'use client';

import { useQuery, useMutation } from '@tanstack/react-query';

import { QuizTable, ButtonsSection } from '@/components/quiz';
import QuestionsTableRow from './_components/QuestionsTableRow';
import { usePageContext } from './_context/pageContext';
import { QUERYKEY } from '@/services/queryKeys';
import { getQuestionsData } from '@/services/questions';

type Props = {
  params: { lang: string };
};

export default function QuizQuestionsData({
  params: { lang },
}: Readonly<Props>) {
  const { questionsLocale } = usePageContext();
  const {
    data: questionsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERYKEY.QUESTIONS],
    queryFn: getQuestionsData,
    // staleTime: Infinity,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <>
      <h1 className="mb-6">{questionsLocale.title}</h1>
      <ButtonsSection
        buttons={questionsLocale.buttons!}
        variants={['default', 'default', 'default', 'destructive']}
      />
      <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={questionsLocale.table!.header}
        rowsData={questionsData}
        isLoading={isLoading}
        error={error?.message}
      />
    </>
  );
}
