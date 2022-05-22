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
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{ minWidth: 200, width: "25%", marginBottom: 24 }}
        src="/DSR-Editor/images/welcome.svg"
        alt="Welcome to DSR."
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
