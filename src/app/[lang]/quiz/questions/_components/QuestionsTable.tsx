import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

import QuestionsTableRow from './QuestionsTableRow';
import questions from '../_template/questionTableTemplate.json' assert { type: 'json' };

type TableProps = {
  header: { [key: string]: string };
  data?: {};
};

function QuestionsTable({ header, data }: TableProps) {
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
        {questions.map((question, index) => (
          <QuestionsTableRow key={index} {...question} index={index} />
        ))}
      </TableBody>
    </Table>
  );
}

export default QuestionsTable;
