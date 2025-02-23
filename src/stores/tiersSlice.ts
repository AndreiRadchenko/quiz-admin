import { StateCreator } from 'zustand';

import tiersData from '@/app/[lang]/quiz/tiers/_template/questionTableTemplate.json' assert { type: 'json' };

export type AnswerType = 'MULTIPLE' | 'TEXT' | 'TEXT NUMERIC';

export type TierType = {
  idx: string;
  legend: string;
  boundQuestion: string | 'unbound';
};

export type TierSateType = {
  quizTiers: TierType[];
};

export type TierActionType = {
  bindQuestion: (tierId: string, questionId: string) => void;
  unbindQuestion: (tierId: string) => void;
};

export type TierStoreType = TierSateType & TierActionType;

const initState: TierSateType = {
  quizTiers: tiersData as TierType[],
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
