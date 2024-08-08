import { Nav, NavLink } from '@/components/Nav';
import { IoMdHome } from "react-icons/io";

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/quiz">
          <IoMdHome size={24} />
        </NavLink>
        <NavLink href="/quiz/players">Players</NavLink>
        <NavLink href="/quiz/questions">Questions</NavLink>
        <NavLink href="/quiz/question-data">Question Data</NavLink>
        <NavLink href="/quiz/answers">Answers</NavLink>
      </Nav>
      <div className="bg-background container my-6 min-h-screen ">
        {children}
      </div>
    </>
  );
}