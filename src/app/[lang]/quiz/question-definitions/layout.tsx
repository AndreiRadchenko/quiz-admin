export default function QuestionsDataLayout({
  children,
  modalEditQuestion,
}: Readonly<{
  children: React.ReactNode;
  modalEditQuestion: React.ReactNode;
}>) {
  return (
    <>
      {modalEditQuestion}
      {children}
    </>
  );
}
