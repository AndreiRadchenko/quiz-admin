'use client';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { TableHeaderComponent } from '../../_components/TableHeaderComponet';

import { usePageContext } from '../../_context/pageContext';
import { useAppStore } from '@/context/appStoreProvider';

type HeaderProps = {
  header: { [key: string]: string };
  headerTooltips: { [key: string]: string };
};

export function QuestionTableHeader({ header, headerTooltips }: HeaderProps) {

  const questionImages = useAppStore(state => state.questionImages);
  
  const {
    state: { selectedQuestionImages, sort },
    selectAllQuestions,
    deselectAllQuestions,
    changeSortType,
  } = usePageContext();

  const isChecked =
    selectedQuestionImages.length === questionImages.length &&
    questionImages.length !== 0;

  const onChange = (checked: CheckboxPrimitive.CheckedState) => {
    checked ? selectAllQuestions() : deselectAllQuestions();
  };

  const onNameClick = () => {
    sort === 'a-z' ? changeSortType('z-a') : changeSortType('a-z');
  };

  const onModifiedClick = () => {
    sort === 'newest' ? changeSortType('oldest') : changeSortType('newest');
  };

  return (
    <TableHeaderComponent
      header={header}
      headerTooltips={headerTooltips}
      isChecked={isChecked}
      sort={sort}
      onChange={onChange}
      onNameClick={onNameClick}
      onModifiedClick={onModifiedClick}
    />
  );
}
