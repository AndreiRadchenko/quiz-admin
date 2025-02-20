'use client';

import React from 'react';

import { useAppStore } from '@/context/appStoreProvider';
import { config } from '@/config';
import { usePageContext } from '../../_context/pageContext';
import { ShowImages } from '../../_components/ShowImages';

export function QuestionImages() {
  const questionImages = useAppStore(state => state.questionImages);
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
