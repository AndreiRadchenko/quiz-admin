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
import { ButtonWithTooltip, IButtonWithTooltip } from './buttonWithTooltip';
import { IoMdInformationCircleOutline } from 'react-icons/io';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // ButtonWithTooltip: React.ComponentType<IButtonWithTooltip>;
  // btnName: string;
  tooltip?: string;
  label?: string;
  btnSize?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
}

export function InputWithButton({
  // btnName,
  children,
  tooltip = '',
  label,
  className,
  btnSize = 'default',
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col justify-around w-fit">
      {label && (
        <Label className="mb-1 w-fit" htmlFor="input">
          {label}
        </Label>
      )}
      <div className="flex align-top gap-0 w-fit">
        <div className="flex items-center space-x-2">
          <Input className={cn('', className)} id="input" {...props} />
          {/* <Button type="button" size={btnSize}>
            {btnName}
          </Button> */}
          {children}
        </div>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="h-fit ml-1">
                <IoMdInformationCircleOutline size={20} className="" />
              </TooltipTrigger>
              <TooltipContent className="border-input">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}
