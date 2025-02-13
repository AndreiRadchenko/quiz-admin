'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const frameworks = [
  {
    value: 'Demo 1 (-3)',
    label: 'Demo 1 (-3)',
  },
  {
    value: 'Demo 2 (-2)',
    label: 'Demo 2 (-2)',
  },
  {
    value: 'Demo 3 (-1)',
    label: 'Demo 3 (-1)',
  },
  {
    value: '90% (1)',
    label: '90% (1)',
  },
  {
    value: '80% (2)',
    label: '80% (2)',
  },
  {
    value: '70% (3)',
    label: '70% (3)',
  },
  {
    value: '60% (4)',
    label: '60% (4)',
  },
  {
    value: '50% (5)',
    label: '50% (5)',
  },
  {
    value: '40% (6)',
    label: '40% (6)',
  },
  {
    value: '35% (7)',
    label: '35% (7)',
  },
  {
    value: '30% (8)',
    label: '30% (8)',
  },
  {
    value: '25% (9)',
    label: '25% (9)',
  },
  {
    value: '20% (10)',
    label: '20% (10)',
  },
  {
    value: '15% (11)',
    label: '15% (11)',
  },
  {
    value: '10% (12)',
    label: '10% (12)',
  },
  {
    value: '5% (13)',
    label: '5% (13)',
  },
  {
    value: '1% (14)',
    label: '1% (14)',
  },
  {
    value: 'Unbound!',
    label: 'Unbound!',
  },
];

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find(framework => framework.value === value)?.label
            : 'Unbound!'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-background text-foreground">
          <CommandInput placeholder="Search number..." className="" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
