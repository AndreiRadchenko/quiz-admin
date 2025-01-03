'use client';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';

import { SortType } from '../_context/pageContext';

type HeaderProps = {
  header: { [key: string]: string };
  headerTooltips: { [key: string]: string };
  isChecked: boolean;
  sort: SortType;
  onChange: (checked: CheckboxPrimitive.CheckedState) => void;
  onNameClick: () => void;
  onModifiedClick: () => void;
};

export function TableHeaderComponent({
  header,
  headerTooltips,
  isChecked,
  sort,
  onChange,
  onNameClick,
  onModifiedClick,
}: HeaderProps) {
  return (
    <TableHeader className="bg-secondary-hover sticky top-0">
      <TableRow>
        <TableHead className="text-primary-foreground">
          <Checkbox
            className="w-6 h-6 bg-background"
            checked={isChecked}
            onCheckedChange={onChange}
          />
        </TableHead>
        <TableHead className="text-primary-foreground">
          <ButtonWithTooltip
            variant="header_switch"
            className="border w-[6rem]"
            onClick={onNameClick}
            tooltip={headerTooltips!.sortByName}
          >
            {header['name']}
            <SortArrow sortDir={sort} start="a-z" finish="z-a" />
          </ButtonWithTooltip>
        </TableHead>
        <TableHead className="text-primary-foreground">
          <ButtonWithTooltip
            variant="header_switch"
            className="w-[10rem]"
            onClick={onModifiedClick}
            tooltip={headerTooltips!.sortByTime}
          >
            {header['lastModified']}
            <SortArrow sortDir={sort} start="newest" finish="oldest" />
          </ButtonWithTooltip>
        </TableHead>
        <TableHead className="text-primary-foreground">
          {header['size']}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export function SortArrow({
  sortDir,
  start,
  finish,
}: {
  sortDir: SortType;
  start: SortType;
  finish: SortType;
}) {
  return (
    <>
      {sortDir === start ? (
        <span className="w-5">&nbsp; &#x2BC5;</span>
      ) : sortDir === finish ? (
        <span className="w-5">&nbsp; &#x2BC6;</span>
      ) : (
        <span className="w-5" />
      )}
    </>
  );
}
