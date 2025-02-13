'use client';
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import noImage from '../../../../../../../public/images/no-image-available-alfa.webp';
import noImage2 from '../../../../../../../public/images/no-pictures-lauren-francesca.png';

type Props = {
  img: string;
  imgBasePath: string;
};

export default function QuestionImage({ img, imgBasePath }: Props) {
  const [imageSrc, setImageSrc] = useState<string | StaticImageData>(
    imgBasePath + img
  );

  return (
    <div className="w-[90%] mx-auto h-auto aspect-video relative cursor-auto group overflow-hidden">
      <div
        className="absolute w-full h-full top-0 left-0 border-2 border-primary
          group-hover:border-primary-hover group-active:border-primary-active
          overflow-hidden transform transition duration-300 ease-in-ou"
      >
        <Image
          src={imageSrc}
          onError={() => setImageSrc(noImage)}
          fill
          className="object-contain group-hover:scale-100 transform transition duration-300
            ease-in-out"
          alt={'question image'}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-8 bg-primary z-10 blur-md
          group-hover:bg-primary group-active:bg-primary transform transition duration-300
          ease-in-out"
      ></div>
      <p
        className="absolute bottom-1 -translate-x-1/2 left-1/2 text-center z-20
          text-primary-foreground"
      >
        {img}
      </p>
    </div>
  );
}
