import PlayersTable from './_components/PlayersTable';

import { getDictionary } from '../../../../../dictionaries/dictionaries';

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
      <h1 className="mb-12">Players</h1>
      <PlayersTable header={players.table.header} />
    </>
  );
}
