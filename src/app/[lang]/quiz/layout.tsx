import { Nav, NavLink } from '@/components/Nav/Nav';
import { IoMdHome } from 'react-icons/io';

import {
  getDictionary,
  type MenuType,
} from '../../../../dictionaries/dictionaries';

import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { nav },
    menu,
  } = await getDictionary(lang);

  const navHeight =
    global?.window !== undefined
      ? window?.document?.getElementById('navBar')?.clientHeight
      : '16';

  return (
    <>
      <Nav menu={menu}>
        <NavLink href={`/${lang}/quiz`}>
          <IoMdHome size={24} />
        </NavLink>
        <NavLink href={`/${lang}/quiz/players`}>{nav.players}</NavLink>
        <NavLink href={`/${lang}/quiz/questions`}>{nav.questions}</NavLink>
        <NavLink href={`/${lang}/quiz/question-definitions`}>
          {nav.questionDefinitions}
        </NavLink>
        <NavLink href={`/${lang}/quiz/answers`}> {nav.answers} </NavLink>
      </Nav>
      <div className="bg-background container py-6 h-fit mt-16">{children}</div>
    </>
  );
}
