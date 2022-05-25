import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const EditRoomCollectionListItem = ({ collection }) => {
  const { name, thumbnailUri, displayUri, artifactUri, mimeType } =
    collection ?? {};
  const skeleton = !name;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Card
      sx={{
        width: 270,
        margin: 1.5,
        height: "max-content",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          position: "relative",
          aspectRatio: "1",
          backgroundColor: "background.paper",
        }}
      >
        {!skeleton && (
          <CardMedia
            sx={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              zIndex: 1,
              position: "absolute",
              top: 0,
            }}
            component="img"
            image={
              mimeType.includes("image")
                ? artifactUri
                : displayUri ?? thumbnailUri
            }
            onLoad={() => {
              setIsLoaded(true);
            }}
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

      {/* <CardContent
        sx={{
          width: "100%",
          boxSizing: "border-box",
          padding: 1,
          "&:last-child": {
            paddingBottom: 0.5,
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mb: 0.5,
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.6rem",
          }}
        >
          {skeleton ? <Skeleton /> : name}
        </Typography>
      </CardContent> */}
    </Card>
  );
};

export default EditRoomCollectionListItem;
