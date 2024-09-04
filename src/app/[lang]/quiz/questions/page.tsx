import QuizTable from '@/components/table/quizTable';
import { ButtonsSection } from './_components/ButtonsSection';
import { getDictionary } from '../../../../../dictionaries/dictionaries';
import QuestionsTableRow from './_components/QuestionsTableRow';

import questionsData from './_template/questionTableTemplate.json' assert { type: 'json' };

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizQuestions({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { questions },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">Quiz questions</h1>
      <ButtonsSection buttons={questions.buttons} />
      <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={questions.table.header}
        rowsData={questionsData}
      />
    </>
  );
}
