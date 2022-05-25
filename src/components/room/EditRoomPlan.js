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
      <Button id="0" onClick={onSelectPlace}>
        A
      </Button>
      <Button id="1" onClick={onSelectPlace}>
        B
      </Button>
      <Button id="2" onClick={onSelectPlace}>
        C
      </Button>
      <Button id="3" onClick={onSelectPlace}>
        D
      </Button>
      <Button id="4" onClick={onSelectPlace}>
        E
      </Button>
      <Button id="5" onClick={onSelectPlace}>
        F
      </Button>
    </Box>
  );
};

export default EditRoomPlan;
