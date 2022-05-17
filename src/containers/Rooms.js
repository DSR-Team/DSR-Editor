import { Button, Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import RoomListItem from "../components/RoomListItem";
import AddIcon from "@mui/icons-material/Add";

const testRoomList = [
  {
    img: "/DSR-Editor/images/test.jpg",
    name: "Room 1",
    id: "HomHom",
  },
  {
    img: "/DSR-Editor/images/test.jpg",
    name: "Room 2",
    id: "HomMim",
  },
  {
    img: "/DSR-Editor/images/test.jpg",
    name: "Room 3",
    id: "RedRed",
  },
  {
    img: "/DSR-Editor/images/test.jpg",
    name: "Room 4",
    id: "Doctor",
  },
  {
    img: "/DSR-Editor/images/test.jpg",
    name: "Room 5",
    id: "SongBo",
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
        padding: "36px 24px",
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
        <Grid {...gridProps} color="divider">
          <Button
            variant="outlined"
            color="inherit"
            sx={{
              width: 360,
              height: 286,
              margin: 2,
              borderWidth: 3,
            }}
          >
            <AddIcon sx={{ fontSize: 80 }} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Rooms;
