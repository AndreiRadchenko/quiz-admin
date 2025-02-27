'use client';

import React from 'react';

import Loader from './loader';
import { cn } from '@/lib/utils';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

type TableProps<T extends { index?: number }> = {
  QuizTableRow: React.ComponentType<T>;
  header: { [key: string]: string };
  rowsData: Omit<T, 'index'>[] | undefined;
  isLoading: boolean;
  error?: string;
  TableHeaderComponent?: React.ComponentType<{ [key: string]: string }>;
};

export function QuizTable<T extends { index?: number }>({
  header,
  rowsData,
  QuizTableRow,
  TableHeaderComponent,
  isLoading,
  error,
}: TableProps<T>) {
  return (
    <div
      className="h-[78vh] relative overflow-auto overflow-y-auto border scrollbar rounded-md
        border-background"
    >
      <Table className="w-full">
        {TableHeaderComponent ? (
          <TableHeaderComponent />
        ) : (
          <HeaderComponent header={header} />
        )}
        <TableBody className="">
          {isLoading ? (
            <TableRow className="absolute top-1/2 left-1/2 h-full -translate-x-1/2 -translate-y-1/2">
              <Loader table={true} />
            </TableRow>
          ) : !rowsData ? (
            <div className="m-6 font-medium">{error}</div>
          ) : (
            rowsData.map((row, index) => (
              <QuizTableRow key={index} {...(row as T)} index={index} />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

type HeaderProps = {
  header: { [key: string]: string };
};

export function HeaderComponent({ header }: HeaderProps) {
  const columns = Object.keys(header).length;
  const columnWidth = Math.round(100 / (columns + 2)) + '%';
  return (
    <TableHeader className="bg-secondary-hover sticky top-0 w-full">
      <TableRow className="flex flex-row justify-between">
        {Object.keys(header).map((key, idx) => (
          <TableHead
            className={cn(
              'text-primary-foreground flex flex-col justify-center',
              ` w-[${columnWidth}]`
            )}
            key={idx}
          >
            {header[key]}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export default QuizTable;
