import { Button, ButtonProps } from './button';

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
  return (
    <TooltipProvider delayDuration={1500}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button {...props}>{children}</Button>
        </TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}
