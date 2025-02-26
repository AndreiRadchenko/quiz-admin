'use client';

import * as React from 'react';
import { useFormState } from 'react-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Check, ChevronsUpDown, Link, Unlink } from 'lucide-react';

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
import { getQuestionsData } from '@/services/questions';
import Loader from '@/components/quiz/loader';
import { bindQuestion } from '@/actions/tiers';
import { useEffect } from 'react';
import { ToastMessageType } from '@/types/stateTypes';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';

export function Combobox({ idx }: { idx: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const bindQuestionAction = async (previousState: any, formData: FormData) =>
    await bindQuestion(formData, idx);

  const { toast } = useToast();
  const [message, formAction, isPending] = useFormState(
    bindQuestionAction,
    null
  );

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<QuestionDataType[]>([
    QUERYKEY.QUESTIONS,
  ]);

  useEffect(() => {
    if (value) {
      const formDataToSend = new FormData();
      formDataToSend.set('boundQuestion', value);
      formAction(formDataToSend);
    }
  }, [formAction, value]);

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
      action={formAction}
      onSubmit={e => {
        e.preventDefault();
      }}
      className="flex flex-row gap-1 justify-end w-full"
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
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
