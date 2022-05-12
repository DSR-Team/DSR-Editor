import { Card, CardActions, CardContent, CardMedia } from "@mui/material";

const RoomListItem = () => {
  return (
    <Card sx={{ width: 300, height: 280, margin: 2 }}>
      <CardMedia
        component="img"
        image="/images/test.jpg"
        sx={{ height: 210, objectFit: "cover" }}
      />
      <CardContent></CardContent>
    </Card>
  );
};

export default RoomListItem;
