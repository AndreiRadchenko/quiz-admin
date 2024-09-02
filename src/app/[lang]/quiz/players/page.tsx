import PlayersTable from './_components/PlayersTable';
import { ButtonsSection } from './_components/ButtonsSection';
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
      <h1 className="mb-6">Players</h1>
      <ButtonsSection
        filter={players.filter}
        buttons={players.buttons}
      />
      <PlayersTable header={players.table.header} />
    </>
  );
}
