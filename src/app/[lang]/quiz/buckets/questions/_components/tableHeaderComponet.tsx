'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { QuizTable } from '@/components/quiz';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import { usePageContext } from '../../_context/pageContext';
import { useSystemState } from '@/context/SystemStateProvider';

type HeaderProps = {
  header: { [key: string]: string };
};

export function TableHeaderComponent({ header }: HeaderProps) {
  const {
    state: { questionImages },
    updateQuestionImages,
  } = useSystemState();
  const {
    state: { selectedQuestionImages },
    selectQuestion,
    deselectQuestion,
    selectAllQuestions,
    deselectAllQuestions,
  } = usePageContext();

  const onChange = (checked: CheckboxPrimitive.CheckedState) => {
    checked ? selectAllQuestions() : deselectAllQuestions();
  };

  return (
    <TableHeader className="bg-secondary-hover sticky top-0">
      <TableRow>
        <TableHead className="text-primary-foreground">
          <Checkbox
            className="w-6 h-6 bg-background"
            checked={selectedQuestionImages.length === questionImages.length}
            onCheckedChange={onChange}
          />
        </TableHead>
        {Object.keys(header)
          .slice(1)
          .map((key, idx) => (
            <TableHead className="text-primary-foreground" key={idx}>
              {header[key]}
            </TableHead>
          ))}
      </TableRow>
    </TableHeader>
  );
}
