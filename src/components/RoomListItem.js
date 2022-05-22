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
  useMediaQuery,
} from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopyRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import { useCallback, useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { deleteRoom } from "../utils/axios";
import { LoadingContext } from "../utils/context";

const RoomListItem = ({ room, refetch }) => {
  const { image, name, id } = room ?? {};
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);
  const [isShowingConfirmDelete, setIsShowingConfirmDelete] = useState(true);
  const navigate = useNavigate();
  const skeleton = !name;
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  const onClickCopy = () => {
    navigator.clipboard.writeText(id).then(() => {
      setIsSnackbarOpen(true);
    });
  };

  const onClickEdit = () => {
    navigate(id);
  };

  const onClickDelete = () => {
    setIsLoading(true);
    deleteRoom(id).then(() => {
      refetch?.().then(() => {
        setIsLoading(false);
      });
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
              paddingBottom: isUpSm ? 1.5 : 1,
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
                  fontSize: isUpSm ? "0.875rem" : "0.75rem",
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
                <CopyIcon
                  fontSize="small"
                  sx={{ mr: 0.5, fontSize: isUpSm ? "1.25rem" : "1rem" }}
                />
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
                  sx={{
                    position: "absolute",
                    right: isUpSm ? 48 : 40,
                    bottom: isUpSm ? 8 : 4,
                  }}
                  onClick={onClickDelete}
                >
                  <DeleteIcon
                    sx={{ fontSize: isUpSm ? "1.5rem" : "1.25rem" }}
                  />
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
                  sx={{
                    position: "absolute",
                    right: 8,
                    bottom: isUpSm ? 8 : 4,
                  }}
                  onClick={onClickEdit}
                >
                  <EditIcon sx={{ fontSize: isUpSm ? "1.5rem" : "1.25rem" }} />
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
        message="Room ID copied."
        sx={{
          "& .MuiPaper-root": {
            maxWidth: "max-content",
            minWidth: "max-content",
            pl: 3,
            pr: 3,
          },
        }}
      />
    </>
  );
};

export default RoomListItem;
