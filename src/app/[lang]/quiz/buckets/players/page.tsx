'use client';
import { useEffect } from 'react';

import { QuizTable } from '@/components/quiz';
import PlayerTableRow from './_components/PlayerTableRow';
import { usePageContext } from '../_context/pageContext';
import { useSystemState } from '@/context/SystemStateProvider';
import { PlayerTableHeader } from './_components/PlayerTableHeader';
import { PlayerImages } from './_components/PlayerImages';

import { sortItemsByField } from '@/utils/SortFunc';

type Props = {
  params: { lang: string };
};

export default function PlayerImagesPage({
  params: { lang },
}: Readonly<Props>) {
  const {
    bucketsLocale: { table },
    state: { sort, view },
  } = usePageContext();
  const {
    state: { playerImages },
    updatePlayerImages,
  } = useSystemState();

  useEffect(() => {
    switch (sort) {
      case 'a-z':
        updatePlayerImages(sortItemsByField(playerImages, 'name', 'asc'));
        break;
      case 'z-a':
        updatePlayerImages(sortItemsByField(playerImages, 'name', 'desc'));
        break;
      case 'newest':
        updatePlayerImages(
          sortItemsByField(playerImages, 'lastModified', 'asc')
        );
        break;
      case 'oldest':
        updatePlayerImages(
          sortItemsByField(playerImages, 'lastModified', 'desc')
        );
        break;
      default:
    }
  }, [playerImages, sort, updatePlayerImages]);

  return view === 'list' ? (
    <QuizTable
      QuizTableRow={PlayerTableRow}
      header={table!.header}
      TableHeaderComponent={() => (
        <PlayerTableHeader
          header={table!.header}
          headerTooltips={table!.headerTooltips}
        />
      )}
      rowsData={playerImages!.map((e, idx) => {
        const isoDate = new Date(e.lastModified as Date);
        return {
          name: e.name as string,
          lastModified: isoDate.toLocaleString('en-GB'),
          size: e.size as number,
          id: String(idx),
        };
      })}
    />
  ) : (
    <PlayerImages />
  );
}
