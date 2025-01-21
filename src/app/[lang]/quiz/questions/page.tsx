import { QuizTable, ButtonsSection } from '@/components/quiz';
import { getDictionary } from '../../../../../dictionaries/dictionaries';
import QuestionsTableRow from './_components/QuestionsTableRow';

import questionsData from './_template/questionTableTemplate.json' assert { type: 'json' };

type Props = {
  params: { lang: string };
};

export default async function QuizQuestions({
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { questions },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">{questions.title}</h1>
      <ButtonsSection
        buttons={questions.buttons}
        variants={['default', 'default', 'default', 'accent']}
      />
      <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={questions.table.header}
        rowsData={questionsData}
      />
    </>
  );
}
