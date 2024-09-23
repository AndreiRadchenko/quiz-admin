export default function PlayersLayout({
  children,
  modalEditPlayer,
}: Readonly<{
  children: React.ReactNode;
  modalEditPlayer: React.ReactNode;
}>) {
  return (
    <>
      {modalEditPlayer}
      {children}
    </>
  );
}
