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
  const t = await getDictionary(lang);

  return (
    <>
      <Nav>
        <NavLink href={{
          pathname: `/${lang}/quiz`,
        }}
        >
          <IoMdHome size={24} />
        </NavLink>
        <NavLink href={{
          pathname: `/${lang}/quiz/players`,
        }}
        >{t.quiz.nav.players}</NavLink>
        <NavLink href={{
          pathname: `/${lang}/quiz/questions`,
        }}>{t.quiz.nav.questions}</NavLink >
        <NavLink href={{
          pathname: `/${lang}/quiz/question-data`,
        }} > {t.quiz.nav.questionData}</NavLink >
        <NavLink href={{
          pathname: `/${lang}/quiz/answers`,
        }}> {t.quiz.nav.answers} </NavLink >
      </Nav >
      <div className="bg-background container pt-6 min-h-screen ">
        {children}
      </div>
    </>
  );
}