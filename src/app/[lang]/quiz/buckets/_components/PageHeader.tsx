'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  titles: { [key: string]: string };
};

export default function PageHeader({ titles }: Props) {
  const path = usePathname();
  const page = path.match(/[^/]+$/);

  return <h1 className="mb-2">{titles[page![0]]}</h1>;
}
