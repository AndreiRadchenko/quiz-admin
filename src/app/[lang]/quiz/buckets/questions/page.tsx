'use client';

import { QuizTable } from '@/components/quiz';
import ImagesTableRow from './_components/ImagesTableRow';
import { usePageContext } from '../_context/pageContext';
import { useSystemState } from '@/context/SystemStateProvider';
import { TableHeaderComponent } from './_components/tableHeaderComponet';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default function QuestionImages({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    bucketsLocale: { table },
  } = usePageContext();
  const {
    state: { questionImages },
  } = useSystemState();

  return (
    <QuizTable
      QuizTableRow={ImagesTableRow}
      header={table!.header}
      TableHeaderComponent={() => (
        <TableHeaderComponent header={table!.header} />
      )}
      rowsData={questionImages!.map((e, idx) => {
        const isoDate = new Date(e.lastModified as Date);
        return {
          name: e.name as string,
          lastModified: isoDate.toLocaleString('en-GB'),
          size: e.size as number,
          id: String(idx),
        };
      })}
    />
  );
}
