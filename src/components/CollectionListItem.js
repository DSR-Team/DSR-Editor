import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CollectionListItem = ({
  collection: { name, thumbnailUri, displayUri },
}) => {
  return (
    <Card sx={{ width: 270, margin: 2 }}>
      <CardMedia
        component="img"
        image={displayUri ?? thumbnailUri}
        sx={{
          aspectRatio: "1",
          objectFit: "contain",
          // padding: 1,
          // boxSizing: "border-box",
          backgroundColor: "background.paper",
        }}
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
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CollectionListItem;
