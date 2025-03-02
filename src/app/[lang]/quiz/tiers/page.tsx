'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { usePageContext } from './_context/pageContext';
import { QuizTable, ButtonsSection } from '@/components/quiz';
import TiersTableRow from './_components/TiersTableRow';
import { QUERYKEY } from '@/services/queryKeys';
import { getTiersData } from '@/services/tiers';
import { AnswerType, QuestionDataType, TierDataType } from '@/types/dataTypes';
import { getQuestionsData } from '@/services/questions';
import { useCachedQuery } from '@/hooks/useCachedQuery';

type Props = {
  params: { lang: string };
};

export default function QuizTiers({ params: { lang } }: Readonly<Props>) {
  const { tiersLocale } = usePageContext();

  const { data: questionsState } = useCachedQuery<QuestionDataType[]>(
    [QUERYKEY.QUESTIONS],
    getQuestionsData
  );

  const {
    data: tiersState,
    isLoading,
    error,
  } = useCachedQuery<TierDataType[]>([QUERYKEY.TIERS], getTiersData);

  const tiersData = tiersState?.map(t => {
    const answerType: AnswerType =
      (questionsState?.find(q => q.label === t.boundQuestion)
        ?.answerType as AnswerType) || '';
    return { ...t, answerType };
  });

  return (
    <>
      <h1 className="mb-6">{tiersLocale.title}</h1>
      <ButtonsSection
        buttons={tiersLocale.buttons!}
        variants={['default', 'default', 'default', 'accent']}
      />
      <QuizTable
        QuizTableRow={TiersTableRow}
        header={tiersLocale.table!.header}
        rowsData={tiersData}
        isLoading={isLoading}
        error={error?.message}
      />
    </>
  );
}
