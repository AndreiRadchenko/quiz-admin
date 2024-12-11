import { AppSidebar } from '@/components/nav/app-sidebar';
import { type Locale } from '../../../../i18n-config';

import { getDictionary } from '../../../../dictionaries/dictionaries';

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
  modalShowQuestionImages: React.ReactNode;
  params: { lang: string };
};

export default async function QuizLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { nav, navGroupName, navTooltip },
    menu,
  } = await getDictionary(lang);

  const navHeight =
    global?.window !== undefined
      ? window?.document?.getElementById('navBar')?.clientHeight
      : '16';

  return (
    <>
      <AppSidebar
        nav={nav}
        navGroupName={navGroupName}
        navTooltip={navTooltip}
        menu={menu}
        lang={lang as Locale}
      />
      <div className="bg-background container py-6 h-fit">{children}</div>
    </>
  );
}
