'use client';

import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from './button';
import { Loader2 as Spinner } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

export interface IButtonWithTooltip extends ButtonProps {
  tooltip?: string;
}

export function ButtonWithTooltip({
  children,
  tooltip = '',
  ...props
}: IButtonWithTooltip) {
  const { pending } = useFormStatus();
  return (
    <TooltipProvider delayDuration={1500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button disabled={pending} {...props}>
            {pending ? (
              <>
                <Spinner className="mr-2 h-4 w-4 animate-spin" />
                {'Upload...'}
              </>
            ) : (
              children
            )}
          </Button>
        </TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
