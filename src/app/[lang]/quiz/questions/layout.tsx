import PageContextProvider from './_context/pageContext';

export default function QuestionsDataLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <PageContextProvider>
      {modal}
      {children}
    </PageContextProvider>
  );
}
