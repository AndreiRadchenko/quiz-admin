import React from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from '@/components/ui/table';

import PlayersTableRow from './PlayersTableRow';
import players from '@/moc/players.json' assert { type: 'json' };

type TableProps = {
  header: { [key: string]: string };
  data?: {};
};

function PlayersTable({ header, data }: TableProps) {
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
        {players.map((player, idx) => (
          <PlayersTableRow key={idx} {...player} idx={idx} />
        ))}
      </TableBody>
    </Table>
  );
}

export default PlayersTable;
