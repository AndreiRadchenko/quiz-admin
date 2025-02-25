import { Loader2 as Spinner } from 'lucide-react';

import React from 'react';

type Props = {
  fullscreen?: boolean;
};

export default function Loader({ fullscreen = true }: Props) {
  if (fullscreen) {
    return (
      <div className="h-[90vh] flex flex-row justify-center items-center">
        <Spinner className="m-4 h-8 w-8 animate-spin" />
        {'Loading...'}
      </div>
    );
  } else {
    return (
      <div className="h-3/4 flex flex-row justify-center items-center">
        <Spinner className="m-4 h-8 w-8 animate-spin" />
        {'Loading...'}
      </div>
    );
  }
}
