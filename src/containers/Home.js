import { Box, Button, Icon, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useWallet from "../hooks/useWallet";
import { AuthContext } from "../utils/context";
import AnimateArrow from "../components/animate_arrow/AnimateArrow";

const Home = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const { connectWallet } = useWallet();

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
      <Typography
        variant="h1"
        color="text.primary"
        sx={{ textAlign: "center" }}
      >
        Welcome to DSR.
      </Typography>
      <AnimateArrow
        arrowNum={2}
        size={20}
        color="secondary.main"
        sx={{ mt: 2 }}
      />
      <Button
        sx={{ textAlign: "center", padding: 2, mt: 2.5 }}
        size="large"
        onClick={authState?.isLoggedIn ? onClickStart : connectWallet}
        href="/rooms"
      >
        <Typography variant="h5">
          {authState?.isLoggedIn ? "Get Started" : "Connect to Start"}
        </Typography>
      </Button>
    </Box>
  );
};

export default Home;
