import {
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";

const CollectionListItem = ({ collection }) => {
  const { name, thumbnailUri, displayUri, artifactUri, mimeType } =
    collection ?? {};
  const skeleton = !name;

  return (
    <Card sx={{ width: 270, margin: 2, height: "max-content" }}>
      <CardMedia
        sx={{
          aspectRatio: "1",
          objectFit: "contain",
          backgroundColor: "background.paper",
        }}
        {...(skeleton
          ? {
              component: Skeleton,
              variant: "rectangular",
              width: "100%",
              height: "auto",
              animation: "wave",
            }
          : {
              component: mimeType.includes("video") ? "video" : "img",
              controls: true,
              // autoPlay: true,
              loop: true,
              muted: true,
              image:
                mimeType.includes("image") || mimeType.includes("video")
                  ? artifactUri
                  : displayUri ?? thumbnailUri,
            })}
      />
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
