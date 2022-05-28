import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../utils/axios";
import { LoadingContext } from "../utils/context";
import LimitLengthTextField from "./LimitLengthTextField";

const AddRoomDialog = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const { setIsLoading } = useContext(LoadingContext);

  const onClickCreate = () => {
    setIsLoading(true);

    if (roomName.trim().length === 0) {
      alert("Please set a name.");
    }

    createRoom(roomName).then((id) => {
      setIsLoading(false);
      navigate(id);
    });
  };

  return (
    <Dialog open={open} PaperProps={{ sx: { padding: 1 } }} onClose={onClose}>
      <DialogTitle sx={{ pb: 1 }}>Create New Showroom</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          To create a new showroom, please give it a name.
        </DialogContentText>
        <img
          style={{ aspectRatio: "16/9", objectFit: "cover" }}
          width="100%"
          alt="default"
          src="/DSR-Editor/images/default.png"
        />
        <LimitLengthTextField
          sx={{ mt: 2 }}
          variant="standard"
          fullWidth
          placeholder="Showroom name"
          value={roomName}
          onChange={useCallback((e) => {
            setRoomName(e.target.value);
          }, [])}
        />
      </DialogContent>
      <DialogActions sx={{ pr: 2 }}>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={onClickCreate} disabled={!roomName}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRoomDialog;
