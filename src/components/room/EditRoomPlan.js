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
  const positions = [
    { top: "20%", right: "27%" },
    { bottom: "35%", right: "12%" },
    { top: "20%", left: "27%" },
    { bottom: "35%", left: "12%" },
    { top: "30%", right: "calc(50% - 18px)" },
    { bottom: "15%", right: "calc(50% - 18px)" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          aspectRatio: "16/9",
          position: "relative",
        }}
      >
        <img src="/DSR-Editor/images/plan.png" alt="plan" width="100%" />
        {PLACE_NAME.map((name, i) => (
          <Button
            key={name}
            id={i}
            onClick={onSelectPlace}
            variant="contained"
            color={i === currentEditPlace ? "primary" : "secondary"}
            sx={{
              aspectRatio: "1",
              padding: "6px 6px",
              position: "absolute",
              ...positions[i],
              minWidth: 0,
              width: "auto",
              height: 36,
              borderRadius: 999,
              boxShadow: `2px 2px 10px 2px rgba(0, 0, 0, 0.7)`,
            }}
          >
            {name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default EditRoomPlan;
