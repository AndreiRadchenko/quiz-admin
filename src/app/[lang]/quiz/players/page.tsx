import { QuizTable, ButtonsSection } from '@/components/quiz';
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
      <h1 className="mb-6">{players.title}</h1>
      <ButtonsSection
        filter={players.filter}
        buttons={players.buttons}
        variants={['default', 'accent', 'default', 'destructive']}
      />
      <QuizTable
        QuizTableRow={PlayersTableRow}
        header={players.table.header}
        rowsData={playersData}
      />
    </>
  );
}
