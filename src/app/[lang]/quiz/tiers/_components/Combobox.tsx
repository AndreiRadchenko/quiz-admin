'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Link, Unlink } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { QUERYKEY } from '@/services/queryKeys';
import { QuestionDataType } from '@/types/dataTypes';
import { bindQuestion } from '@/actions/tiers';
import { ToastMessageType } from '@/types/stateTypes';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';

export function Combobox({ idx }: { idx: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [message, setMessage] = useState<ToastMessageType | undefined>(
    undefined
  );

  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => bindQuestion(formData, idx),
    onSuccess: data => setMessage(data),
    // onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERYKEY.TIERS] }),
    mutationKey: [`boundQuestion${idx}`],
  });

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<QuestionDataType[]>([
    QUERYKEY.QUESTIONS,
  ]);

  useEffect(() => {
    if (value) {
      const formDataToSend = new FormData();
      formDataToSend.set('boundQuestion', value);
      mutate(formDataToSend);
    }
  }, [value, mutate]);

  useEffect(() => {
    if (message) {
      const { messageType, toastMessage } = message as ToastMessageType;
      toastMessage !== '' &&
        toast({
          variant: messageType === 'error' ? 'destructive' : 'default',
          // title: messageType === 'error' ? messageType.toLocaleUpperCase() : '',
          description: toastMessage,
        });
    }
  }, [message, toast]);

  const questions = data?.map(q => ({
    value: q.label,
    label: () => (
      <div className="max-h-9 overflow-hidden">
        <p className="text-foreground group-data-[selected=true]:text-nav-foreground font-bold">
          {q.label + ': '}
        </p>
        <p className="text-accent-hover italic">{q.description}</p>
      </div>
    ),
  }));

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
      className="flex flex-row gap-1 justify-end w-full"
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span>
            <TooltipProvider delayDuration={1500}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size={'sm'}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                  >
                    <Link size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="font-normal bg-secondary-foreground">
                  Bind question
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] h-[45vh] p-0">
          <Command className="bg-background text-foreground">
            <CommandInput placeholder="Search question..." className="" />
            <CommandList className="max-h-full">
              <CommandEmpty>No questions found.</CommandEmpty>
              <CommandGroup className="h-full">
                {questions &&
                  questions.map((question, idx) => (
                    <CommandItem
                      className="max-h-10 group overflow-hidden data-[selected=true]:bg-primary-hover items-start
                        text-sm/4 cursor-pointer"
                      key={idx}
                      value={question.value}
                      onSelect={currentValue => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === question.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      <question.label />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ButtonWithTooltip
        size={'sm'}
        variant={'default'}
        tooltip="Unbind question"
        onClick={() => setValue('unbound')}
      >
        <Unlink size={16} />
      </ButtonWithTooltip>
    </form>
  );
}
