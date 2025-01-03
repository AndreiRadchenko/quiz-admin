'use client';

import React from 'react';

import { useSystemState } from '@/context/SystemStateProvider';
import { config } from '@/config';
import { usePageContext } from '../../_context/pageContext';
import { ShowImages } from '../../_components/ShowImages';

export function QuestionImages() {
  const {
    state: { questionImages },
  } = useSystemState();
  const {
    state: { selectedQuestionImages },
    selectQuestion,
    deselectQuestion,
  } = usePageContext();
  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/questions/';

  return (
    <ShowImages
      images={questionImages}
      imgBasePath={imgBasePath}
      selectedImages={selectedQuestionImages}
      selectImage={selectQuestion}
      deselectImage={deselectQuestion}
    />
  );
}
