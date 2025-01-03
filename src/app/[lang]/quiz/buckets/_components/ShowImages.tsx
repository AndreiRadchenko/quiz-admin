'use client';

import React from 'react';
import Image from 'next/image';

import { Checkbox } from '@/components/ui/checkbox';
import { BucketItem } from 'minio';

type Props = {
  images: BucketItem[];
  imgBasePath: string;
  selectedImages: string[];
  selectImage: (data: string) => void;
  deselectImage: (data: string) => void;
};

export function ShowImages({
  images,
  imgBasePath,
  selectedImages,
  selectImage,
  deselectImage,
}: Props) {
  return (
    <div className="overflow-y-auto border max-h-[80vh] scrollbar rounded-md p-2">
      <div className="grid grid-cols-2 gap-2">
        {images.map(({ name: img }, idx) => (
          <div
            key={idx}
            className="w-full h-full aspect-video relative cursor-auto group"
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
              className="absolute bottom-0 left-0 w-full h-1/10 bg-primary z-10 group-hover:bg-primary
                group-active:bg-primary transform transition blur-md duration-300 ease-in-out"
            ></div>
            <Checkbox
              className="w-7 h-7 absolute top-2 left-2"
              checked={selectedImages.some(e => e === img)}
              onCheckedChange={checked => {
                checked ? selectImage(img!) : deselectImage(img!);
              }}
            />
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
