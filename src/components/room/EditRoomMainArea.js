import { Button, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useContext } from "react";
import BackIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import EditRoomNameTextField from "./EditRoomNameTextField";
import RoomId from "./RoomId";
import { useNavigate, useOutletContext } from "react-router-dom";
import { EditRoomContext, LoadingContext } from "../../utils/context";
import { updateRoom } from "../../utils/axios";
import EditRoomPlan from "./EditRoomPlan";

const EditRoomMainArea = () => {
  const { setRoomList } = useOutletContext();
  const { setIsLoading } = useContext(LoadingContext);

  const navigate = useNavigate();
  const { name, setName, roomId, isModified, room, meta } =
    useContext(EditRoomContext);

  const onClickSave = () => {
    setIsLoading(true);
    const newData = {};
    if (name !== room.name) {
      newData.name = name;
    }
    if (
      (meta?.findIndex(
        (v, i) =>
          v.contract !== room.metadata[i].contract ||
          v.tokenId !== room.metadata[i].tokenId
      ) ?? -1) !== -1
    ) {
      newData.metadata = meta;
    }
    updateRoom(roomId, newData).then((room) => {
      setRoomList((oldRoomList) => {
        return oldRoomList.map((r) => (r.id === roomId ? room : r));
      });
      setIsLoading(false);
      navigate("/rooms");
    });
  };

  return (
    <Grid
      container
      item
      direction="column"
      xs={12}
      md={5.875}
      lg={4.875}
      xl={3.875}
      sx={{ padding: 2 }}
    >
      <Box
        sx={{
          height: "max-content",
          width: "100%",
        }}
      >
        <Box
          sx={{
            height: "max-content",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{ mr: { xs: 1, sm: 2 } }}
            onClick={useCallback(() => {
              navigate("/rooms");
            }, [navigate])}
          >
            <BackIcon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }} />
          </IconButton>

          {name !== undefined ? (
            <EditRoomNameTextField name={name} setName={setName} />
          ) : (
            <Typography
              variant="h3"
              color="text.primary"
              sx={{
                width: "100%",
                overflow: "hidden",
                overflowWrap: "break-word",
              }}
            >
              <Skeleton variant="text" />
            </Typography>
          )}
        </Box>
        <RoomId
          sx={{
            fontSize: { sm: "1.2rem", xs: "0.875rem" },
            ml: { xs: "44px", sm: 7 },
            mt: { xs: 2, sm: 2.5 },
            mb: { xs: 3, sm: 5 },
          }}
          id={roomId}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: 7 },
        }}
      >
        <EditRoomPlan />
      </Box>
      <Box
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button variant="outlined" disabled={!isModified} onClick={onClickSave}>
          Save
        </Button>
      </Box>
    </Grid>
  );
};

export default EditRoomMainArea;
