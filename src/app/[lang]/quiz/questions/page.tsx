import { QuizTable, ButtonsSection } from '@/components/quiz';
import { getDictionary } from '../../../../../dictionaries/dictionaries';
import QuestionsTableRow from './_components/QuestionsTableRow';

import questionsData from './_template/tableTemplate.json' assert { type: 'json' };

type Props = {
  params: { lang: string };
};

export default async function QuizQuestionsData({
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { questionBank },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">{questionBank.title}</h1>
      <ButtonsSection
        buttons={questionBank.buttons}
        variants={['default', 'default', 'default', 'destructive']}
      />
      <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={questionBank.table.header}
        rowsData={questionsData}
      />
    </>
  );
}
