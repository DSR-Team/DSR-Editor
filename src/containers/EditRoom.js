import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const EditRoom = () => {
  const { roomId } = useParams();
  return <Box>{roomId}</Box>;
};

export default EditRoom;
