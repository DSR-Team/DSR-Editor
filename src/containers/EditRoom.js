import { Divider, Grid, useMediaQuery } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import EditRoomMainArea from "../components/room/EditRoomMainArea";
import { EditRoomContext } from "../utils/context";
import EditRoomCollectionsList from "../components/room/EditRoomCollectionsList";

const EditRoom = () => {
  const { roomList, fetchRooms } = useOutletContext();
  const { roomId } = useParams();
  const room = roomList?.find((v) => v.id === roomId) ?? {};
  const { name: currentName } = room;

  const [name, setName] = useState();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  const isModified = name && name !== currentName;

  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (!isModified) return;
      e.preventDefault();
      e.returnValue = "Changes haven't been saved. Are you sure to leave?";
      return e;
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [isModified]);

  return (
    <EditRoomContext.Provider
      value={{ name, setName, roomId, room, isModified }}
    >
      <Grid
        container
        direction="row"
        sx={{
          height: "100%",
          width: "100%",
          padding: { xs: "24px 8px", sm: 4 },
          boxSizing: "border-box",
        }}
      >
        <EditRoomMainArea />
        {isUpMd && (
          <Grid
            container
            item
            direction="row"
            md={5.75}
            lg={6.75}
            xl={7.75}
            sx={{
              height: "100%",
              ml: { md: 2, lg: 3 },
              pl: { md: 3, lg: 5 },
              padding: 2,
              borderLeft: 1,
              borderColor: "divider",
              boxSizing: "border-box",
            }}
          >
            <EditRoomCollectionsList />
          </Grid>
        )}
      </Grid>
    </EditRoomContext.Provider>
  );
};

export default EditRoom;
