import PageContextProvider from './_context/pageContext';
import { getDictionary } from '../../../../../dictionaries/dictionaries';

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { lang: string };
};

export default async function QuestionsDataLayout({
  children,
  modal,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { questionBank },
  } = await getDictionary(lang);

  return (
    <PageContextProvider questionsLocale={questionBank}>
      {modal}
      {children}
    </PageContextProvider>
  );
}
