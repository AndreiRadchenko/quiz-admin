import { QuizTable, ButtonsSection } from '@/components/quiz';
import { getDictionary } from '../../../../dictionaries/dictionaries';
import { Seat } from './_components/seat';
import { Sector } from './_components/sector';
import { QuestionTextArea } from './_components/questionTextArea';

const players = Array.from({ length: 100 }, (_, i) => {
  const label = i <= 8 ? `A0${i + 1}` : `A${i + 1}`;
  const description = 'Description for question ' + label;
  return {
    number: i + 1,
    description,
    active: i > 30 && i < 46 ? undefined : i > 63 ? true : false,
    usedPass: i < 15 ? false : i > 82 ? false : true,
  };
});

export type Players = typeof players;

type Props = {
  params: { lang: string };
};

const offset = [125, 225, 330];

export default async function Overview({ params: { lang } }: Readonly<Props>) {
  const {
    quiz: { answers },
  } = await getDictionary(lang);

  return (
    <div className="mt-10 flex flex-row justify-around gap-24">
      <div id="seats_sectors" className="relative w-[950px] h-[900px]">
        <div
          id="inner_sectors"
          className="absolute top-[50%] left-[48%] w-[700px] h-[350px] mx-auto bg-transparent"
        >
          <Sector inner players={players.slice(0, 15)} offset={offset[0]} />
          <Sector inner players={players.slice(15, 31)} offset={offset[1]} />
          <Sector inner players={players.slice(31, 46)} offset={offset[2]} />
        </div>
        <div
          id="outer_sectors"
          className="absolute top-[50%] left-[48%] w-[900px] h-[450px] mx-auto"
        >
          <Sector players={players.slice(46, 64)} offset={offset[0]} />
          <Sector players={players.slice(64, 82)} offset={227} />
          <Sector players={players.slice(82, 100)} offset={327} />
        </div>
      </div>
      <QuestionTextArea
        title={'100% Question'}
        titleRef={'Ref: b65'}
        state={'QUESTION_COMPLETE'}
        prizePot={'Prize Pot: $96K (+$0K)'}
        responded={'22/34'}
        countdown={'76'}
        answers={{ correct: 5, pass: 15, incorrect: 55 }}
      />
    </div>
  );
}
