import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import { useCallback, useState } from "react";

const RoomListItem = ({ room }) => {
  const { image, name, id } = room ?? {};
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const skeleton = !name;
  const [isLoaded, setIsLoaded] = useState(false);

  const onClickCopy = () => {
    navigator.clipboard.writeText(id).then(() => {
      setIsSnackbarOpen(true);
    });
  };

  return (
    <>
      <Card sx={{ width: 360, margin: 2 }} raised>
        <Box
          sx={{
            width: "100%",
            height: 210,
            position: "relative",
            aspectRatio: "1",
            backgroundColor: "background.paper",
          }}
        >
          {!skeleton && (
            <CardMedia
              component="img"
              loading="lazy"
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                zIndex: 1,
                position: "absolute",
                top: 0,
              }}
              onLoad={() => {
                setIsLoaded(true);
              }}
              image={
                (image?.length ?? 0) > 0
                  ? image
                  : "/DSR-Editor/images/default.png"
              }
            />
          )}
          {!isLoaded && (
            <Skeleton
              sx={{
                zIndex: 0,
                position: "absolute",
                top: 0,
              }}
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          )}
        </Box>
        <CardContent
          sx={{
            pt: 1,
            "&:last-child": {
              paddingBottom: 1.5,
            },
            position: "relative",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 0.5,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {skeleton ? <Skeleton /> : name}
          </Typography>
          {skeleton ? (
            <Skeleton width="40%" />
          ) : (
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
          )}
          {!skeleton && (
            <>
              <Tooltip
                title="Delete"
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
                  color="error"
                  size="small"
                  sx={{ position: "absolute", right: 48, bottom: 8 }}
                >
                  <DeleteIcon />
                </IconButton>
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
                  size="small"
                  sx={{ position: "absolute", right: 8, bottom: 8 }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
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
