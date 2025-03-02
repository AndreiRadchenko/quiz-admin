import { Loader2 as Spinner } from 'lucide-react';

import React from 'react';
import { TableCell } from '../ui/table';

type Props = {
  table?: boolean;
};

export default function Loader({ table = false }: Props) {
  if (!table) {
    return (
      <div className="h-[90vh] flex flex-row justify-center items-center">
        <Spinner className="m-4 h-8 w-8 animate-spin" />
        {'Loading...'}
      </div>
    );
  } else {
    return (
      <TableCell className="h-3/4 flex flex-row justify-center items-center">
        <Spinner className="m-4 h-8 w-8 animate-spin" />
        {'Loading...'}
      </TableCell>
    );
  }
}
