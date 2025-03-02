export type QuestionDataType = {
  id: string;
  label: string;
  imagePath: string;
  answerType: string;
  answerOptions: string;
  correctAnswer: string;
  description: string;
  boundToNumber: string;
  passAllowed: boolean;
};

export type AnswerType = 'MULTIPLE' | 'TEXT' | 'TEXT NUMERIC' | '';

export type TierDataType = {
  id: string;
  idx: string;
  legend: string;
  answerType: AnswerType;
  boundQuestion: string;
};
