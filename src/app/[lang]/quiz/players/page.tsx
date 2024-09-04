import QuizTable from '@/components/table/quizTable';
import { ButtonsSection } from './_components/ButtonsSection';
import { getDictionary } from '../../../../../dictionaries/dictionaries';

import PlayersTableRow from './_components/PlayersTableRow';
import playersData from '@/moc/players.json' assert { type: 'json' };

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizPlayers({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { players },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">Players</h1>
      <ButtonsSection filter={players.filter} buttons={players.buttons} />
      <QuizTable
        QuizTableRow={PlayersTableRow}
        header={players.table.header}
        rowsData={playersData}
      />
    </>
  );
}
