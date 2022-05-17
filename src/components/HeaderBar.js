import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useCallback, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/context";
import { AuthDispatcherAction } from "../utils/AuthReducer";
import useWallet from "../hooks/useWallet";

const HeaderBarLink = ({ children, to }) => {
  const location = useLocation();
  const isCurrentPage = location.pathname === to;

  return (
    <Link to={to}>
      <Typography
        color={isCurrentPage ? "text.primary" : "text.secondary"}
        sx={(theme) => ({
          mr: 4,
          fontWeight: "bold",
          position: "relative",
          "&::after": isCurrentPage
            ? {
                position: "absolute",
                content: "''",
                height: 4,
                bottom: -6,
                margin: "0 auto",
                left: 0,
                right: 0,
                width: "80%",
                background: theme.palette.info.main,
              }
            : {},
        })}
      >
        {children}
      </Typography>
    </Link>
  );
};

const HeaderBar = () => {
  const { authState, authDispatcher } = useContext(AuthContext);
  const { connectWallet } = useWallet();

  const onClickConnect = () => {
    connectWallet();
  };

  const onClickLogout = () => {
    authDispatcher({
      type: AuthDispatcherAction.LOGOUT,
    });
  };

  return (
    <AppBar color="default" enableColorOnDark>
      <Toolbar>
        <Link to="/">
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontWeight: "bold", userSelect: "none" }}
          >
            D SHOWROOM
          </Typography>
        </Link>
        <Typography sx={{ flexGrow: 1 }} />
        {authState?.isLoggedIn ? (
          <>
            <HeaderBarLink to="/rooms">Rooms</HeaderBarLink>
            <HeaderBarLink to="/collections">Collections</HeaderBarLink>
            <Button
              variant="outlined"
              sx={{ textTransform: "none" }}
              onDoubleClick={onClickLogout}
            >
              {authState?.walletAddr?.slice(0, 5) +
                "..." +
                authState?.walletAddr?.slice(-5)}
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={onClickConnect}>
            Connect
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
