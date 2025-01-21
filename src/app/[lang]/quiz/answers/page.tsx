import { QuizTable, ButtonsSection } from '@/components/quiz';
import { getDictionary } from '../../../../../dictionaries/dictionaries';
import AnswersTableRow from './_components/AnswersTableRow';

import answersData from './_template/tableTemplate.json' assert { type: 'json' };

type Props = {
  params: { lang: string };
};

export default async function QuizAnswers({
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { answers },
  } = await getDictionary(lang);

  return (
    <>
      <h1 className="mb-6">{answers.title}</h1>
      <ButtonsSection
        buttons={answers.buttons}
        variants={['default', 'default', 'destructive']}
      />
      <QuizTable
        QuizTableRow={AnswersTableRow}
        header={answers.table.header}
        rowsData={answersData}
      />
    </>
  );
}
