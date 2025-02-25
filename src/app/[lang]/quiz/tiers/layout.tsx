import PageContextProvider from './_context/pageContext';
import { getDictionary } from '../../../../../dictionaries/dictionaries';

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: { lang: string };
};

export default async function QuestionsLayout({
  children,
  modal,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { quizTiers },
  } = await getDictionary(lang);

  return (
    <PageContextProvider tiersLocale={quizTiers}>
      {modal}
      {children}
    </PageContextProvider>
  );
}
