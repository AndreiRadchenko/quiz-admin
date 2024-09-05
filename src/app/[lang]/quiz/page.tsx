import { Button } from '@/components/ui/button';
import { InputWithButton } from '@/components/ui/inputWithButton';

import { getDictionary } from '../../../../dictionaries/dictionaries';
import { Input } from '@/components/ui/input';
import { ButtonWithTooltip } from '@/components/ui/buttonWithTooltip';
import { Label } from '@/components/ui/label';

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
          <div key={idx} className="flex flex-row gap-2">
            <Input type="number" defaultValue={0} className="w-24" />
            <ButtonWithTooltip tooltip={inputs[key].tooltip}>
              {inputs[key].buttonText}
            </ButtonWithTooltip>
          </div>
        ))}
      </section>
      <section id="import-files" className="grid grid-cols-2 gap-6 my-12 w-fit">
        {Object.keys(importFiles)?.map((key, idx) => (
          <div key={idx} className="flex flex-col justify-around w-fit">
            <Label className="mb-1 w-fit" htmlFor="input">
              {importFiles[key].label}
            </Label>
            <div className="flex flex-row gap-2">
              <Input
                id="input"
                type="file"
                className="w-80 placeholder:background text-inherit"
                accept=".csv"
              />
              <ButtonWithTooltip>
                {importFiles[key].buttonText}
              </ButtonWithTooltip>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
