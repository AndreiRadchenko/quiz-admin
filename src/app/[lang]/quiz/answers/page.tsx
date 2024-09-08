import { QuizTable, ButtonsSection } from '@/components/quiz';
import { getDictionary } from '../../../../../dictionaries/dictionaries';
// import QuestionsTableRow from './_components/QuestionsTableRow';

// import questionsData from './_template/tableTemplate.json' assert { type: 'json' };

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizAnswers({
  children,
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
      {/* <QuizTable
        QuizTableRow={QuestionsTableRow}
        header={questionDefinitions.table.header}
        rowsData={questionsData}
      /> */}
    </>
  );
}
