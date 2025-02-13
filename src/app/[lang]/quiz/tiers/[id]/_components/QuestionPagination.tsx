'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { QuestionsDataType } from '../page';

type Props = {
  questions: QuestionsDataType[];
  id: string;
};

export default function QuestionPagination({ questions, id }: Props) {
  const pathname = usePathname();

  const index = questions.findIndex((e: QuestionsDataType) => e.idx === id);
  const lastIndex = questions.length - 1;

  const prevPage = index <= 0 ? questions[0] : questions[index - 1];
  const nextPage =
    index >= lastIndex ? questions[lastIndex] : questions[index + 1];

  // if (questions.length < 8) {
  //   return (
  //     <Pagination>
  //       <PaginationContent>
  //         <PaginationItem>
  //           <PaginationPrevious
  //             href={`${prevPage.id}`}
  //             className={
  //               index === 0
  //                 ? 'bg-transparent text-muted-foreground pointer-events-none'
  //                 : ''
  //             }
  //           />
  //         </PaginationItem>
  //         {questions.map((q, idx) => (
  //           <PaginationItem key={idx}>
  //             <PaginationLink isActive={index === idx} href={`${q.id}`}>
  //               {idx + 1}
  //             </PaginationLink>
  //           </PaginationItem>
  //         ))}
  //         <PaginationItem>
  //           <PaginationNext
  //             href={`${nextPage.id}`}
  //             className={
  //               index === questions.length - 1
  //                 ? 'bg-transparent text-muted-foreground pointer-events-none'
  //                 : ''
  //             }
  //           />
  //         </PaginationItem>
  //       </PaginationContent>
  //     </Pagination>
  //   );
  // } else if (questions.length > 8 && index < 8) {
  //   return (
  //     <Pagination>
  //       <PaginationContent>
  //         <PaginationItem>
  //           <PaginationPrevious
  //             href={`${prevPage.id}`}
  //             className={
  //               index === 0
  //                 ? 'bg-transparent text-muted-foreground pointer-events-none'
  //                 : ''
  //             }
  //           />
  //         </PaginationItem>
  //         {questions.slice(0, 5).map((q, idx) => (
  //           <PaginationItem key={idx}>
  //             <PaginationLink isActive={index === idx} href={`${q.id}`}>
  //               {idx + 1}
  //             </PaginationLink>
  //           </PaginationItem>
  //         ))}
  //         <PaginationItem>
  //           <PaginationEllipsis />
  //         </PaginationItem>
  //         <PaginationItem>
  //           <PaginationLink
  //             isActive={index === questions.length - 1}
  //             href={`${questions[questions.length - 1].id}`}
  //           >
  //             {questions.length}
  //           </PaginationLink>
  //         </PaginationItem>
  //         <PaginationItem>
  //           <PaginationNext
  //             href={`${nextPage.id}`}
  //             className={
  //               index === questions.length - 1
  //                 ? 'bg-transparent text-muted-foreground pointer-events-none'
  //                 : ''
  //             }
  //           />
  //         </PaginationItem>
  //       </PaginationContent>
  //     </Pagination>
  //   );
  // }
  return (
    <PaginationWrapper
      prevPageId={prevPage.idx}
      nextPageId={nextPage.idx}
      index={index}
      lastIndex={lastIndex}
    >
      <PaginationNumbers
        questions={questions}
        index={index}
        lastIndex={lastIndex}
      />
    </PaginationWrapper>
  );
}

type PaginationWrapperProps = {
  children: React.ReactNode;
  prevPageId: string;
  nextPageId: string;
  index: number;
  lastIndex: number;
};

export function PaginationWrapper({
  children,
  prevPageId,
  nextPageId,
  index,
  lastIndex,
}: PaginationWrapperProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevPageId}
            className={
              index === 0
                ? 'bg-transparent text-muted-foreground pointer-events-none'
                : ''
            }
          />
        </PaginationItem>
        {children}
        <PaginationItem>
          <PaginationNext
            href={nextPageId}
            className={
              index === lastIndex
                ? 'bg-transparent text-muted-foreground pointer-events-none'
                : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

type PaginationNumbersProps = {
  questions: QuestionsDataType[];
  index: number;
  lastIndex: number;
};

export function PaginationNumbers({
  questions,
  index,
  lastIndex,
}: PaginationNumbersProps) {
  if (questions.length <= 8) {
    return (
      <>
        {questions.map((q, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink isActive={index === idx} href={`${q.idx}`}>
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </>
    );
  } else if (questions.length > 8 && index <= 5) {
    return (
      <>
        {questions.slice(0, 7).map((q, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink isActive={index === idx} href={`${q.idx}`}>
              {idx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={index === lastIndex}
            href={`${questions[lastIndex].idx}`}
          >
            {questions.length}
          </PaginationLink>
        </PaginationItem>
      </>
    );
  } else if (questions.length > 8 && index >= 6 && index > lastIndex - 5) {
    return (
      <>
        <PaginationItem>
          <PaginationLink isActive={index === 0} href={`${questions[0].idx}`}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {questions.slice(lastIndex - 6, lastIndex + 1).map((q, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink
              isActive={index === lastIndex - 6 + idx}
              href={`${q.idx}`}
            >
              {lastIndex - 5 + idx}
            </PaginationLink>
          </PaginationItem>
        ))}
      </>
    );
  } else {
    return (
      <>
        <PaginationItem>
          <PaginationLink isActive={index === 0} href={`${questions[0].idx}`}>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        {questions.slice(index - 2, index + 3).map((q, idx) => (
          <PaginationItem key={idx}>
            <PaginationLink isActive={idx === 2} href={`${q.idx}`}>
              {index - 1 + idx}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            isActive={index === lastIndex}
            href={`${questions[lastIndex].idx}`}
          >
            {questions.length}
          </PaginationLink>
        </PaginationItem>
      </>
    );
  }
}
