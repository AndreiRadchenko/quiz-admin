import React from 'react';
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
  rowsData: Omit<T, 'index'>[];
  TableHeaderComponent?: React.ComponentType<{ [key: string]: string }>;
};

export function QuizTable<T extends { index?: number }>({
  header,
  rowsData,
  QuizTableRow,
  TableHeaderComponent,
}: TableProps<T>) {
  return (
    <div className="h-[78vh] relative overflow-auto">
      <Table className="">
        {TableHeaderComponent ? (
          <TableHeaderComponent />
        ) : (
          <HeaderComponent header={header} />
        )}
        <TableBody className="">
          {rowsData.map((row, index) => (
            <QuizTableRow key={index} {...(row as T)} index={index} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

type HeaderProps = {
  header: { [key: string]: string };
};

export function HeaderComponent({ header }: HeaderProps) {
  return (
    <TableHeader className="bg-secondary-hover sticky top-0">
      <TableRow>
        {Object.keys(header).map((key, idx) => (
          <TableHead className="text-primary-foreground" key={idx}>
            {header[key]}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export default QuizTable;
