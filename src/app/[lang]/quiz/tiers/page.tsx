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
    quiz: { quizTiers },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">{quizTiers.title}</h1>
      <ButtonsSection
        buttons={quizTiers.buttons}
        variants={['default', 'default', 'default', 'accent']}
      />
      <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={quizTiers.table.header}
        rowsData={questionsData}
      />
    </>
  );
}
