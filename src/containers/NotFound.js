import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        component="img"
        src="/images/test.jpg"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          zIndex: -1,
        }}
      ></Box>
      <Typography
        variant="h2"
        color="text.primary"
        sx={{ textAlign: "center", mt: "5%", fontWeight: "bold" }}
      >
        Nothing here!!!
      </Typography>
    </Box>
  );
};

export default NotFound;
