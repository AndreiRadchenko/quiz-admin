'use client';

import { useQuery, useMutation } from '@tanstack/react-query';

import { usePageContext } from './_context/pageContext';
import { QuizTable, ButtonsSection } from '@/components/quiz';
import TiersTableRow from './_components/TiersTableRow';
import { QUERYKEY } from '@/services/queryKeys';
import { getTiersData } from '@/services/tiers';

type Props = {
  params: { lang: string };
};

export default function QuizTiers({ params: { lang } }: Readonly<Props>) {
  const { tiersLocale } = usePageContext();
  const {
    data: tiersData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERYKEY.TIERS],
    queryFn: getTiersData,
    // staleTime: 1 * 60 * 1000,
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
