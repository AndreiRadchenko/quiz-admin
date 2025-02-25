'use client';

import { useQuery, useMutation } from '@tanstack/react-query';

import { usePageContext } from './_context/pageContext';
import { QuizTable, ButtonsSection } from '@/components/quiz';
import { type FilterValue } from '@/components/quiz/FilterRadioGroup';
import PlayersTableRow from './_components/PlayersTableRow';
import { getPlayersData } from '@/services/players';
import { QUERYKEY } from '@/services/queryKeys';

type FilterType = {
  all: FilterValue;
  active: FilterValue;
  passes: FilterValue;
};

type Props = {
  params: { lang: string };
};

export default function QuizPlayers({ params: { lang } }: Readonly<Props>) {
  const { playersLocale } = usePageContext();
  const {
    data: playersData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QUERYKEY.PLAYERS],
    queryFn: getPlayersData,
    // staleTime: Infinity,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
  return (
    <>
      <h1 className="mb-6">{playersLocale.title}</h1>
      <ButtonsSection
        filter={playersLocale.filter as FilterType}
        buttons={playersLocale.buttons!}
        variants={['default', 'accent', 'default', 'destructive']}
      />
      <QuizTable
        QuizTableRow={PlayersTableRow}
        header={playersLocale.table!.header}
        rowsData={playersData}
        isLoading={isLoading}
        error={error?.message}
      />
    </>
  );
}
