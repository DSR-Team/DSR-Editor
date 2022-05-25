import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const CollectionListItem = ({ collection }) => {
  const { name, thumbnailUri, displayUri, artifactUri, mimeType } =
    collection ?? {};
  const skeleton = !name;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Card
      sx={{
        width: 270,
        margin: 2,
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
            component={mimeType.includes("video") ? "video" : "img"}
            image={
              mimeType.includes("image") || mimeType.includes("video")
                ? artifactUri
                : displayUri ?? thumbnailUri
            }
            controls
            loop
            loading="lazy"
            onLoad={() => {
              setIsLoaded(true);
            }}
            onLoadStart={() => {
              setIsLoaded(true);
            }}
          />
        )}
        {mimeType?.includes("audio") && (
          <audio
            style={{
              width: "90%",
              height: "15%",
              zIndex: 2,
              position: "absolute",
              bottom: "5%",
              left: "5%",
            }}
            src={artifactUri}
            controls
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
          width: "100%",
          boxSizing: "border-box",
          "&:last-child": {
            paddingBottom: 1.5,
          },
        }}
      >
        <Typography
          variant="body1"
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
      </CardContent>
    </Card>
  );
};

export default CollectionListItem;
