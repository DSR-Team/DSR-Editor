import { useContext, useState } from "react";
import { EditRoomContext } from "../../utils/context";
import LimitLengthTextField from "../LimitLengthTextField";

const EditRoomNameTextField = () => {
  const {
    name,
    setName,
    room: { name: currentName },
  } = useContext(EditRoomContext);
  const [showCount, setShowCount] = useState(false);

  return (
    <LimitLengthTextField
      value={name}
      onChange={(e) => {
        setName(e.target.value);
      }}
      multiline
      fullWidth
      onFocus={() => {
        setShowCount(true);
      }}
      onBlur={(e) => {
        setShowCount(false);
        if (!name.trim()) {
          setTimeout(() => {
            setName(currentName);
          }, 100);
        }
      }}
      showCount={showCount}
      sx={(theme) => ({
        mt: -0.5,
        mb: -0.5,
        ml: "-14px",
        border: "none",
        "& > div": { pt: 0.5, pb: 0.5 },
        "& textarea": { ...theme.typography.h3 },
        "& fieldset": { borderColor: "transparent" },
        "& .MuiFormHelperText-root": {
          position: "absolute",
          right: 0,
          bottom: -24,
        },
      })}
    />
  );
};

export default EditRoomNameTextField;
