import { useState } from "react";

export const COLLECTION_TYPES = [
  "image",
  // "image,gif,video,audio,3dmodel,interactive",
  "gif",
  "video",
  "audio",
  "3dmodel",
];

const useCollections = () => {
  const [imageCollections, setImageCollections] = useState({});
  const [imageCollectionCounts, setImageCollectionCounts] = useState();
  const [gifCollections, setGifCollections] = useState({});
  const [gifCollectionCounts, setGifCollectionCounts] = useState();
  const [videoCollections, setVideoCollections] = useState({});
  const [videoCollectionCounts, setVideoCollectionCounts] = useState();
  const [audioCollections, setAudioCollections] = useState({});
  const [audioCollectionCounts, setAudioCollectionCounts] = useState();
  const [modelCollections, setModelCollections] = useState({});
  const [modelCollectionCounts, setModelCollectionCounts] = useState();

  const collections = [
    imageCollections,
    gifCollections,
    videoCollections,
    audioCollections,
    modelCollections,
  ];

  const setCollections = (type, data, page) => {
    const { tokens, count } = data;
    if (typeof type === "string") {
      type = COLLECTION_TYPES.indexOf(type);
    }

    switch (type) {
      case 0:
        setImageCollections({ [page]: tokens, ...imageCollections });
        setImageCollectionCounts(count);
        return;
      case 1:
        setGifCollections({ [page]: tokens, ...gifCollections });
        setGifCollectionCounts(count);
        return;
      case 2:
        setVideoCollections({ [page]: tokens, ...videoCollections });
        setVideoCollectionCounts(count);
        return;
      case 3:
        setAudioCollections({ [page]: tokens, ...audioCollections });
        setAudioCollectionCounts(count);
        return;
      case 4:
        setModelCollections({ [page]: tokens, ...modelCollections });
        setModelCollectionCounts(count);
        return;
      default:
        return;
    }
  };

  const counts = [
    imageCollectionCounts,
    gifCollectionCounts,
    videoCollectionCounts,
    audioCollectionCounts,
    modelCollectionCounts,
  ];

  return [collections, setCollections, counts];
};

export default useCollections;
