import { Nav, NavLink } from '@/components/Nav/Nav';
import { IoMdHome } from "react-icons/io";

import { getDictionary } from '../../../../dictionaries/dictionaries';

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizLayout({
  children,
  params: { lang }
}: Readonly<Props>) {
  const { quiz: { nav } } = await getDictionary(lang);

  return (
    <>
      <Nav>
        <NavLink href={`/${lang}/quiz`}>
          <IoMdHome size={24} />
        </NavLink>
        <NavLink href={`/${lang}/quiz/players`}>{nav.players}</NavLink>
        <NavLink href={`/${lang}/quiz/questions`}>{nav.questions}</NavLink >
        <NavLink href={`/${lang}/quiz/question-data`}>{nav.questionData}</NavLink >
        <NavLink href={`/${lang}/quiz/answers`}> {nav.answers} </NavLink >
      </Nav >
      <div className="bg-background container pt-6 min-h-screen ">
        {children}
      </div>
    </>
  );
}