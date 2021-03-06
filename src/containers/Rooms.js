import { Button, Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import RoomListItem from "../components/room/RoomListItem";
import AddIcon from "@mui/icons-material/Add";
import AddRoomDialog from "../components/AddRoomDialog";
import { getRooms } from "../utils/axios";
import { useOutletContext } from "react-router-dom";

const testRoomList = [
  {
    image: "/DSR-Editor/images/default.png",
    name: "Room 1",
    id: "HomHom",
  },
  {
    image: "/DSR-Editor/images/default.png",
    name: "WWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    id: "HomMim",
  },
  {
    image: "/DSR-Editor/images/default.png",
    name: "Room 3",
    id: "RedRed",
  },
  {
    image: "/DSR-Editor/images/default.png",
    name: "Room 4",
    id: "Doctor",
  },
  {
    image: "/DSR-Editor/images/default.png",
    name: "Room 5",
    id: "SongBo",
  },
];

const Rooms = () => {
  const { roomList, fetchRooms } = useOutletContext();
  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false);
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
      <Grid
        container
        direction="row"
        sx={{ margin: "auto", width: "90%", maxWidth: 1600 }}
      >
        {roomList ? (
          <>
            {roomList.map((room) => (
              <Grid key={room.id} {...gridProps}>
                <RoomListItem room={room} refetch={fetchRooms} />
              </Grid>
            ))}
            <Grid
              {...gridProps}
              position="relative"
              color="divider"
              sx={{ width: "max-content" }}
            >
              <RoomListItem />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  width: "calc(100% - 32px)",
                  maxWidth: 360,
                  height: "calc(100% - 32px)",
                  margin: 2,
                  backgroundColor: "background.default",
                }}
              />
              <Button
                variant="outlined"
                color="inherit"
                sx={{
                  position: "absolute",
                  top: 0,
                  width: "calc(100% - 32px)",
                  maxWidth: 360,
                  height: "calc(100% - 32px)",
                  margin: 2,
                  borderWidth: 3,
                }}
                onClick={() => {
                  setIsAddRoomDialogOpen(true);
                }}
              >
                <AddIcon sx={{ fontSize: 80 }} />
              </Button>
            </Grid>
          </>
        ) : (
          Array.from({ length: 4 }, () => ({})).map((v, i) => (
            <Grid key={i} {...gridProps}>
              <RoomListItem />
            </Grid>
          ))
        )}
      </Grid>
      <AddRoomDialog
        open={isAddRoomDialogOpen}
        onClose={useCallback(() => {
          setIsAddRoomDialogOpen(false);
        }, [])}
      />
    </Box>
  );
};

export default Rooms;
