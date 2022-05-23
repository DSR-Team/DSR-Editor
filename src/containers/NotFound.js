import { Box, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/DSR-Editor/logo.svg"
        alt="logo"
        style={{
          maxWidth: 200,
          width: "30%",
        }}
      />
      <Typography
        variant="h3"
        color="text.primary"
        sx={{ textAlign: "center", mt: 8, fontWeight: "bold" }}
      >
        Nothing = =
      </Typography>
    </Box>
  );
};

export default NotFound;
