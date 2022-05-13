import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onClickStart = (e) => {
    navigate("/rooms");
    e.preventDefault();
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1" color="primary" sx={{ textAlign: "center" }}>
        Welcome to DSR.
      </Typography>
      <Button
        sx={{ textAlign: "center", padding: 2, mt: 5 }}
        size="large"
        onClick={onClickStart}
        href="/rooms"
      >
        <Typography variant="h5">Get Started</Typography>
      </Button>
    </Box>
  );
};

export default Home;
