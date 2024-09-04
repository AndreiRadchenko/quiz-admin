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
};

function QuizTable<T extends { index?: number }>({
  header,
  rowsData,
  QuizTableRow,
}: TableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-secondary-hover">
        <TableRow>
          {Object.keys(header).map((key, idx) => (
            <TableHead className="text-primary-foreground" key={idx}>
              {header[key]}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowsData.map((row, index) => (
          <QuizTableRow key={index} {...(row as T)} index={index} />
        ))}
      </TableBody>
    </Table>
  );
}

export default QuizTable;
