'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { QuizTable, ButtonsSection } from '@/components/quiz';
import AnswersTableRow from './_components/AnswersTableRow';

import { usePageContext } from './_context/pageContext';
import { getAnswersData } from '@/services/answers';
import { QUERYKEY } from '@/services/queryKeys';

type Props = {
  params: { lang: string };
};

export default function QuizAnswers({ params: { lang } }: Readonly<Props>) {
  const { answersLocale } = usePageContext();
  const {
    data: answersData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERYKEY.ANSWERS],
    queryFn: getAnswersData,
    // staleTime: Infinity,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <>
      <h1 className="mb-6">{answersLocale.title}</h1>
      <ButtonsSection
        buttons={answersLocale.buttons!}
        variants={['default', 'default', 'destructive']}
      />
      <QuizTable
        QuizTableRow={AnswersTableRow}
        header={answersLocale.table!.header}
        rowsData={answersData}
        isLoading={isLoading}
        error={error?.message}
      />
    </>
  );
}
