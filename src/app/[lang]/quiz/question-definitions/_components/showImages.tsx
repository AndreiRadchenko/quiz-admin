'use client';

import React from 'react';
import Image from 'next/image';

import { useSystemState } from '@/context/SystemStateProvider';
import { config } from '@/config';
import { usePageContext } from '../_context/pageContext';

type Props = {
  onSelect: () => void;
};

export function ShowImages({ onSelect }: Props) {
  const { state } = useSystemState();
  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/questions/';
  const { pagePreferences, setPagePreferences } = usePageContext();

  const onImageClick = (img: string | undefined) => {
    setPagePreferences({
      ...pagePreferences,
      selectedQuestionImage: img ? img : '',
    });
    onSelect();
  };

  return (
    <div className="overflow-y-auto border max-h-[80vh] scrollbar rounded-md p-2">
      <div className="grid grid-cols-2 gap-2">
        {state.questionImagesURL.map((img, idx) => (
          <div
            key={idx}
            className="w-full h-full aspect-video relative cursor-pointer group"
            onClick={() => onImageClick(img)}
          >
            <div
              className="absolute w-full h-full top-0 left-0 border-2 border-primary
                group-hover:border-primary-hover group-active:border-primary-active
                overflow-hidden transform transition duration-300 ease-in-ou"
            >
              <Image
                src={`${imgBasePath + img}`}
                fill
                className="object-contain group-hover:scale-100 transform transition duration-300
                  ease-in-out"
                alt={'question image'}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 w-full h-1/10 bg-primary z-10
                group-hover:bg-primary-hover group-active:bg-primary-active transform transition
                blur-md duration-300 ease-in-out"
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
    </div>
  );
}

// {state.questionImagesURL.map((img, idx) => (
//   <Image key={idx} src={`${imgBasePath + img}`} alt={'question image'} />
// ))}
