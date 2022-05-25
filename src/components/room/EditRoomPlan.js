import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { EditRoomContext } from "../../utils/context";

export const PLACE_NAME = ["A", "B", "C", "D", "E", "F"];

const EditRoomPlan = () => {
  const { currentEditPlace, setCurrentEditPlace } = useContext(EditRoomContext);

  const onSelectPlace = (e) => {
    setCurrentEditPlace(parseInt(e.target.id));
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {PLACE_NAME.map((name, i) => (
        <Button
          key={name}
          id={i}
          onClick={onSelectPlace}
          variant={i === currentEditPlace ? "contained" : "outlined"}
        >
          {name}
        </Button>
      ))}
    </Box>
  );
};

export default EditRoomPlan;
