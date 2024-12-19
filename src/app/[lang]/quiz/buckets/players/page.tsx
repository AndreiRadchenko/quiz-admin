import { QuizTable, ButtonsSection } from '@/components/quiz';
import { getDictionary } from '../../../../../../dictionaries/dictionaries';
import QuestionsTableRow from './_components/QuestionsTableRow';

import questionsData from './_template/tableTemplate.json' assert { type: 'json' };

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuestionImages({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { questionDefinitions },
  } = await getDictionary(lang);

  return (
    <>
      <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={questionDefinitions.table.header}
        rowsData={questionsData}
      />
    </>
  );
}
