import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import BackIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import RoomId from "../components/room/RoomId";
import { useTheme } from "@emotion/react";
import { useCallback } from "react";

const EditRoom = () => {
  const { roomList, fetchRooms } = useOutletContext();
  const { roomId } = useParams();
  const { name } = roomList?.find((v) => v.id === roomId) ?? {};
  const navigate = useNavigate();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
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
      <Grid
        container
        item
        direction="column"
        xs={12}
        md={7}
        lg={6}
        xl={4}
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
            <Typography
              variant="h3"
              color="text.primary"
              sx={{
                height: "max-content",
                width: "100%",
                overflow: "hidden",
                overflowWrap: "break-word",
              }}
            >
              {name}
            </Typography>
          </Box>
          <RoomId
            sx={{
              fontSize: { sm: "1.2rem", xs: "0.875rem" },
              ml: { xs: "44px", sm: 7 },
              mt: { xs: 1, sm: 1.5 },
              mb: { xs: 3, sm: 5 },
            }}
            id={roomId}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "red",
            ml: { xs: 0, md: 7 },
          }}
        ></Box>
        <Box
          sx={{
            mt: 4,
            mb: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined">Save</Button>
        </Box>
      </Grid>
      {isUpMd && (
        <Divider
          sx={{ ml: 4 }}
          orientation="vertical"
          variant="middle"
          flexItem
        />
      )}
    </Grid>
  );
};

export default EditRoom;
