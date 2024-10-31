import React from 'react';

type QuestionState =
  | 'IDLE'
  | 'QUESTION_PREPARE'
  | 'QUESTION_OPEN'
  | 'QUESTION_CLOSED'
  | 'QUESTION_COMPLETE';

type Props = {
  title: string;
  titleRef: string;
  state: QuestionState;
  prizePot: string;
  responded?: string;
  countdown?: string;
  answers?: {
    correct: number;
    pass: number;
    incorrect: number;
  };
};

export function QuestionTextArea({
  title,
  titleRef,
  state,
  prizePot,
  responded,
  countdown,
  answers,
}: Props) {
  return (
    <div className="flex flex-col gap-16 w-[600px] mt-16">
      <div id="question_number">
        <h1 className="text-6xl font-bold" id="question_title">
          {title}
        </h1>
        <p className="text-4xl mt-2">{titleRef}</p>
      </div>
      <h2 id="question_state" className="text-4xl">
        {state}
      </h2>
      <h2 id="prize_pot" className="text-4xl">
        {prizePot}
      </h2>
      {state !== 'QUESTION_COMPLETE' ? (
        <>
          <h2 id="responded" className="text-4xl">
            Responded: {responded}
          </h2>
          <h2 id="countdown" className="text-4xl">
            Countdown: {countdown}
          </h2>
        </>
      ) : (
        <ul id="answers" className="flex flex-col gap-6">
          <li>
            <p className="text-4xl leading-normal rounded-md px-2 w-[300px] h-16 bg-green-800">
              Correct: {answers?.correct}
            </p>
          </li>
          <li>
            <p className="text-4xl leading-normal rounded-md px-2 w-[300px] h-16 bg-blue-800">
              Pass: {answers?.pass}
            </p>
          </li>
          <li>
            <p className="text-4xl leading-normal rounded-md px-2 w-[300px] h-16 bg-red-800">
              Incorrect: {answers?.incorrect}
            </p>
          </li>
        </ul>
      )}
    </div>
  );
}
