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
    quiz: { questionDefinitions },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">{questionDefinitions.title}</h1>
      <ButtonsSection
        buttons={questionDefinitions.buttons}
        variants={['default', 'default', 'default', 'destructive']}
      />
      <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={questionDefinitions.table.header}
        rowsData={questionsData}
      />
    </>
  );
}
