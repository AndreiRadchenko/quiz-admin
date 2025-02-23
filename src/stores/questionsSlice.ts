import { StateCreator } from 'zustand';

import questionsData from '@/app/[lang]/quiz/questions/_template/tableTemplate.json' assert { type: 'json' };

export type AnswerType = 'MULTIPLE' | 'TEXT' | 'TEXT NUMERIC';

export type QuestionType = {
  id: string;
  label: string;
  boundToNumber: string | 'unbound';
  passAllowed: boolean;
  imagePath: string;
  answerType: AnswerType;
  answerOptions: string;
  correctAnswer: string;
  description?: string;
};

export type QuestionSateType = {
  questionBank: QuestionType[];
};

export type QuestionActionType = {
  addQuestion: (q: QuestionType) => void;
  deleteQuestion: (id: string) => void;
  updateQuestion: (q: QuestionType) => void;
  getBoundNumber: (label: string) => void;
};

export type QuestionStoreType = QuestionSateType & QuestionActionType;

const initState: QuestionSateType = {
  questionBank: questionsData as QuestionType[],
};

export const questionImagesSlice: StateCreator<
  QuestionStoreType,
  [['zustand/devtools', unknown]]
> = (set, get) => ({
  ...initState,

  addQuestion: (q: QuestionType) =>
    set(state => {
      return { questionBank: [...state.questionBank, q] };
    }),
  deleteQuestion: (id: string) =>
    set(state => {
      return { questionBank: state.questionBank.filter(e => e.id !== id) };
    }),
  updateQuestion: (q: QuestionType) =>
    set(state => {
      return {
        questionBank: state.questionBank.map(e => (e.id === q.id ? q : e)),
      };
    }),
  getBoundNumber: (label: string) =>
    set(state => {
      return {};
    }),
});
