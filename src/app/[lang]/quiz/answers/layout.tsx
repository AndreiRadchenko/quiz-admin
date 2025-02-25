import PageContextProvider from './_context/pageContext';
import { getDictionary } from '../../../../../dictionaries/dictionaries';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function PlayersLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { answers },
  } = await getDictionary(lang);

  return (
    <PageContextProvider answersLocale={answers}>
      {children}
    </PageContextProvider>
  );
}
