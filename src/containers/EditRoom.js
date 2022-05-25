import { Grid, useMediaQuery } from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import EditRoomMainArea from "../components/room/EditRoomMainArea";
import { EditRoomContext } from "../utils/context";
import EditRoomCollectionsList from "../components/room/EditRoomCollectionsList";

const EditRoom = () => {
  const { roomList } = useOutletContext();
  const [currentEditPlace, setCurrentEditPlace] = useState(0);
  const [meta, setMeta] = useState();
  const [name, setName] = useState();
  const { roomId } = useParams();
  const room = roomList?.find((v) => v.id === roomId) ?? {};
  const { name: currentName, metadata: currentMeta } = room;

  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  useEffect(() => {
    setMeta(currentMeta);
  }, [currentMeta]);

  const isModified =
    (name && name !== currentName) ||
    (meta?.findIndex(
      (v, i) =>
        v.contract !== currentMeta[i].contract ||
        v.tokenId !== currentMeta[i].tokenId
    ) ?? -1) !== -1;

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

  useEffect(() => {
    setCurrentEditPlace(0);
  }, [setCurrentEditPlace]);

  return (
    <EditRoomContext.Provider
      value={{
        name,
        setName,
        roomId,
        room,
        isModified,
        currentEditPlace,
        setCurrentEditPlace,
        meta,
        setMeta,
      }}
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
        {
          <Grid
            container
            item
            direction="row"
            md={5.75}
            lg={6.75}
            xl={7.75}
            sx={{
              height: isUpMd ? "100%" : "max-content",
              ml: { md: 2, lg: 3 },
              pl: { md: 3, lg: 5 },
              padding: 2,
              borderLeft: isUpMd ? 1 : "none",
              borderColor: "divider",
              boxSizing: "border-box",
            }}
          >
            <EditRoomCollectionsList />
          </Grid>
        }
      </Grid>
    </EditRoomContext.Provider>
  );
};

export default EditRoom;
