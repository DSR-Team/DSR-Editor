import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import CopyIcon from "@mui/icons-material/ContentCopyRounded";

const RoomListItem = ({ room }) => {
  const { img, name, id } = room ?? {};

  return (
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
        }}
      >
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            width: "fit-content",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <CopyIcon fontSize="small" sx={{ mr: 1 }} />
          {id}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoomListItem;
