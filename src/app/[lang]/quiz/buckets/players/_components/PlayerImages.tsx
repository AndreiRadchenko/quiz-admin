'use client';

import React from 'react';

import { useAppStore } from '@/context/appStoreProvider';
import { config } from '@/config';
import { usePageContext } from '../../_context/pageContext';
import { ShowImages } from '../../_components/ShowImages';

export function PlayerImages() {

  const playerImages = useAppStore(stor => stor.playerImages);

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
