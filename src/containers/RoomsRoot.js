import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getRooms } from "../utils/axios";

const RoomsRoot = () => {
  const [roomList, setRoomList] = useState();
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

  return <Outlet context={{ roomList, fetchRooms }} />;
};

export default RoomsRoot;
