import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useCollections, { COLLECTION_TYPES } from "../hooks/useCollections";
import { getCollections, getRooms } from "../utils/axios";

const NUM_PER_PAGE = 24;

const RoomsRoot = () => {
  const [roomList, setRoomList] = useState();
  const [collections, setCollections, counts] = useCollections();
  const [collectionTabIndex, setCollectionTabIndex] = useState(0);
  const [collectionPage, setCollectionPage] = useState(1);
  const location = useLocation();

  const fetchRooms = () =>
    getRooms()
      .then((rooms) => {
        setRoomList(rooms);
      })
      .catch((e) => {
        alert(e);
      });

  useEffect(() => {
    console.log("(Re)fetch rooms...");
    fetchRooms();
  }, [location.pathname]);

  useEffect(() => {
    const fetchCollections = (page, mimeType) =>
      getCollections({
        offset: (page - 1) * 24,
        mimeTypes: mimeType,
      }).then((data) => {
        setCollections(mimeType, data, page);
      });

    fetchCollections(collectionPage, COLLECTION_TYPES[collectionTabIndex]);
  }, [collectionTabIndex, collectionPage]);

  const shownCollections =
    collections?.[collectionTabIndex]?.[collectionPage] ??
    Array.from({ length: NUM_PER_PAGE }, () => ({}));

  return (
    <Outlet
      context={{
        roomList,
        setRoomList,
        fetchRooms,
        collections,
        collectionTabIndex,
        setCollectionTabIndex,
        collectionPage,
        setCollectionPage,
        shownCollections,
        counts,
      }}
    />
  );
};

export default RoomsRoot;
