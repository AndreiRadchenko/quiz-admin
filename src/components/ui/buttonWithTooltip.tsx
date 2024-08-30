import { HTMLInputTypeAttribute } from 'react';
import { Button, ButtonProps } from './button';
import { Input } from './input';
import { Label } from './label';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

import { cn } from '@/lib/utils';

export interface InputProps extends ButtonProps {
  btnName?: string;
  tooltip?: string;
}

export function ButtonWithTooltip({
  children,
  tooltip = '',
  className,
  ...props
}: InputProps) {
  return (
    <TooltipProvider delayDuration={1500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...props}>{children}</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
