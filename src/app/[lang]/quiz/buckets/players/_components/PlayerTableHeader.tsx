'use client';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { TableHeaderComponent } from '../../_components/TableHeaderComponet';

import { usePageContext } from '../../_context/pageContext';
import { useAppStore } from '@/context/appStoreProvider';

type HeaderProps = {
  header: { [key: string]: string };
  headerTooltips: { [key: string]: string };
};

export function PlayerTableHeader({ header, headerTooltips }: HeaderProps) {
  const playerImages = useAppStore(stor => stor.playerImages);
  const {
    state: { selectedPlayerImages, sort },
    selectAllPlayers,
    deselectAllPlayers,
    changeSortType,
  } = usePageContext();

  const isChecked =
    selectedPlayerImages.length === playerImages.length &&
    playerImages.length !== 0;

  const onChange = (checked: CheckboxPrimitive.CheckedState) => {
    checked ? selectAllPlayers() : deselectAllPlayers();
  };

  const onNameClick = () => {
    sort === 'a-z' ? changeSortType('z-a') : changeSortType('a-z');
  };

  const onModifiedClick = () => {
    sort === 'newest' ? changeSortType('oldest') : changeSortType('newest');
  };

  return (
    <TableHeaderComponent
      header={header}
      headerTooltips={headerTooltips}
      isChecked={isChecked}
      sort={sort}
      onChange={onChange}
      onNameClick={onNameClick}
      onModifiedClick={onModifiedClick}
    />
  );
}
