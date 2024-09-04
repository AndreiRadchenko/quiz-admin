import QuestionsTable from './_components/QuestionsTable';
import { ButtonsSection } from './_components/ButtonsSection';
import { getDictionary } from '../../../../../dictionaries/dictionaries';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizQuestions({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { questions, players },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">Quiz questions</h1>
      <ButtonsSection buttons={questions.buttons} />
      <QuestionsTable header={questions.table.header} />
    </>
  );
}
