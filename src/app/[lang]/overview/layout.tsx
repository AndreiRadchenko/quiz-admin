import { type Locale } from '../../../../i18n-config';

import { getDictionary } from '../../../../dictionaries/dictionaries';

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
    quiz: { nav, navGroupName, navTooltip },
    menu,
  } = await getDictionary(lang);

  return <div className="bg-background m-auto">{children}</div>;
}
