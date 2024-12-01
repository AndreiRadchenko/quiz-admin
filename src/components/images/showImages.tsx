import React from 'react';
import Image from 'next/image';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useSystemState } from '@/context/SystemStateProvider';
import { config } from '@/config';
import { ButtonWithTooltip } from '../ui/buttonWithTooltip';

export function ShowImages() {
  const { state } = useSystemState();
  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/questions/';

  return (
    <ScrollArea className="overflow-y-auto h-[34rem] border rounded-md p-2">
      <div className="grid grid-cols-2 gap-2">
        {state.questionImagesURL.map((img, idx) => (
          <div
            key={idx}
            className="w-full h-full aspect-video relative cursor-pointer group"
          >
            <div
              className="absolute w-full h-full top-0 left-0 border-2 border-primary
                group-hover:border-primary-hover group-active:border-primary-active
                overflow-hidden transform transition duration-300 ease-in-ou"
            >
              <Image
                src={`${imgBasePath + img}`}
                fill
                className="object-contain group-hover:scale-105 transform transition duration-300
                  ease-in-out"
                alt={'question image'}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 w-full h-1/10 bg-primary z-10
                group-hover:bg-primary-hover group-active:bg-primary-active transform transition
                duration-300 ease-in-out"
            ></div>
            <p
              className="absolute bottom-0 -translate-x-1/2 left-1/2 text-center z-20
                text-primary-foreground"
            >
              {img}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

// {state.questionImagesURL.map((img, idx) => (
//   <Image key={idx} src={`${imgBasePath + img}`} alt={'question image'} />
// ))}
