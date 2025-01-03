'use client';

import React from 'react';

import { useSystemState } from '@/context/SystemStateProvider';
import { config } from '@/config';
import { usePageContext } from '../../_context/pageContext';
import { ShowImages } from '../../_components/ShowImages';

export function PlayerImages() {
  const {
    state: { playerImages },
  } = useSystemState();
  const {
    state: { selectedPlayerImages },
    selectPlayer,
    deselectPlayer,
  } = usePageContext();
  const imgBasePath =
    'http://' + config.S3_END_POINT + ':' + config.S3_PORT + '/players/';

  return (
    <ShowImages
      images={playerImages}
      imgBasePath={imgBasePath}
      selectedImages={selectedPlayerImages}
      selectImage={selectPlayer}
      deselectImage={deselectPlayer}
    />
  );
}
