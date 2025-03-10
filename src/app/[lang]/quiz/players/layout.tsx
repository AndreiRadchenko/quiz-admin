import PageContextProvider from './_context/pageContext';
import { getDictionary } from '../../../../../dictionaries/dictionaries';

type Props = {
  children: React.ReactNode;
  modalEditPlayer: React.ReactNode;
  params: { lang: string };
};

export default async function PlayersLayout({
  children,
  modalEditPlayer,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { players },
  } = await getDictionary(lang);

  return (
     <PageContextProvider playersLocale={players}>
      {modalEditPlayer}
      {children}
    </PageContextProvider>
  );
}
