import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import RoomListItem from "../components/RoomListItem";

const testRoomList = [
  {
    img: "/images/test.jpg",
    name: "Room 1",
    id: "HomHom",
  },
  {
    img: "/images/test.jpg",
    name: "Room 2",
    id: "HomHom",
  },
  {
    img: "/images/test.jpg",
    name: "Room 3",
    id: "HomHom",
  },
  {
    img: "/images/test.jpg",
    name: "Room 4",
    id: "HomHom",
  },
  {
    img: "/images/test.jpg",
    name: "Room 5",
    id: "HomHom",
  },
];

const Rooms = () => {
  const [roomList, setRoomList] = useState(testRoomList);
  const gridProps = {
    item: true,
    container: true,
    direction: "row",
    justifyContent: "center",
    xs: 12,
    md: 6,
    lg: 4,
    xl: 3,
  };

  return (
    <Box
      sx={{
        padding: "48px 30px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <Grid container direction="row" sx={{ margin: "auto" }}>
        {roomList?.map((room) => (
          <Grid key={room.id} {...gridProps}>
            <RoomListItem room={room} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Rooms;
