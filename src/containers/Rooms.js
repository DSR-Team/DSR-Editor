import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import RoomListItem from "../components/RoomListItem";

const Rooms = () => {
  return (
    <Box
      sx={{
        // width: "100%",
        height: "100%",
        padding: "50px 30px",
        boxSizing: "border-box",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        sx={{ maxWidth: "100%", margin: "auto" }}
      >
        <RoomListItem />
        <RoomListItem />
        <RoomListItem />
        <RoomListItem />
        <RoomListItem />
        <Box sx={{ flexGrow: 1 }} />
      </Grid>
    </Box>
  );
};

export default Rooms;
