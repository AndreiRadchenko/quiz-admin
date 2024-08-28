import { Button } from '@/components/ui/button';
import { InputWithButton } from '@/components/ui/inputWithButton';

import { getDictionary } from '../../../../dictionaries/dictionaries';

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function QuizDashboard({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: {
      dashboard: { buttons = {}, inputs = {}, importFiles = {} },
    },
  } = await getDictionary(lang);
  const { gameFlow, buyout, endGameBuyout, showButtons, commCheck } = buttons;

  return (
    <>
      <h1 className="mb-6">1% Club Dashboard</h1>
      <section id="buttons" className="flex flex-col gap-8 my-12">
        {Object.keys(buttons)?.map(key => (
          <ul key={key} className="flex flex-row gap-4">
            {Object.keys(buttons[key])?.map(button => (
              <li key={button} className="">
                <Button variant={'default'}>{buttons[key][button]}</Button>
              </li>
            ))}
          </ul>
        ))}
      </section>
      <section id="inputs" className="flex flex-row gap-6 justify-start my-12">
        {Object.keys(inputs)?.map((key, idx) => (
          <InputWithButton
            key={idx}
            btnName={inputs[key].buttonText}
            tooltip={inputs[key].tooltip}
            type="number"
            defaultValue={0}
            className="w-24"
          />
        ))}
      </section>
      <section id="import-files" className="grid grid-cols-2 gap-6 my-12 w-fit">
        {Object.keys(importFiles)?.map((key, idx) => (
          <InputWithButton
            key={idx}
            btnName={importFiles[key].buttonText}
            tooltip={importFiles[key].tooltip}
            label={importFiles[key].label}
            type="file"
            className="w-80 placeholder:background text-inherit"
            accept=".csv"
          />
        ))}
      </section>
    </>
  );
}
