import { Button } from "@/components/ui/button";
import { InputWithButton } from "@/components/ui/inputWithButton"

import { getDictionary } from "../../../../dictionaries/dictionaries";

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizDashboard({
  children,
  params: { lang }
}: Readonly<Props>) {
  const { quiz: { dashboard: { buttons = {}, inputs = {} } } } = await getDictionary(lang);
  const { gameFlow, buyout, endGameBuyout, showButtons, commCheck } = buttons;

  return (
    <>
      <h1 className="mb-6">1% Club Dashboard</h1>
      <section className="flex flex-col gap-8 my-12">
        {Object.keys(buttons)?.map(key => (<ul key={key} className="flex flex-row gap-4">
          {Object.keys(buttons[key])?.map(button => (<li key={button} className="">
            <Button variant={'default'}>{buttons[key][button]}</Button>
          </li>))}
        </ul>))}
      </section>
      <section className="flex flex-row gap-6 justify-start my-12">
        {Object.keys(inputs)?.map((key, idx) => (<InputWithButton key={idx} btnName={inputs[key].name} tooltip={inputs[key].tooltip} />))}
      </section>
    </>
  );
}

