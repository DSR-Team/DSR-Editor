import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import { useCallback, useState } from "react";

const RoomListItem = ({ room }) => {
  const { img, name, id } = room ?? {};
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const onClickCopy = () => {
    navigator.clipboard.writeText(id).then(() => {
      setIsSnackbarOpen(true);
    });
  };

  return (
    <>
      <Card sx={{ width: 360, margin: 2 }} raised>
        <CardMedia
          component="img"
          image={img}
          sx={{ height: 210, objectFit: "cover" }}
        />
        <CardContent
          sx={{
            pt: 1,
            "&:last-child": {
              paddingBottom: 1.5,
            },
            position: "relative",
          }}
        >
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            {name}
          </Typography>
          <Tooltip title="Click to copy" arrow followCursor>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                width: "fit-content",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  color: "text.primary",
                  textDecoration: "underline dotted 2px",
                },
              }}
              onClick={onClickCopy}
            >
              <CopyIcon fontSize="small" sx={{ mr: 0.5 }} />
              {id}
            </Typography>
          </Tooltip>
          <Tooltip
            title="Edit"
            placement="top"
            arrow
            componentsProps={{
              tooltip: {
                style: {
                  marginBottom: 8,
                },
              },
            }}
          >
            <IconButton
              color="primary"
              sx={{ position: "absolute", right: 8, bottom: 8 }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
      </Card>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={useCallback(() => {
          setIsSnackbarOpen(false);
        }, [])}
        message="Room ID copied"
        sx={{
          "& .MuiPaper-root": {
            minWidth: "min-content",
            pl: 3,
            pr: 3,
          },
        }}
      />
    </>
  );
};

export default RoomListItem;
