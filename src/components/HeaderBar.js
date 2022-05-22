import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/context";
import { AuthDispatcherAction } from "../utils/AuthReducer";
import useWallet from "../hooks/useWallet";
import { useTheme } from "@mui/material/styles";

const HeaderBarLink = ({ children, to }) => {
  const location = useLocation();
  const isCurrentPage = location.pathname === to;
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Link to={to}>
      <Typography
        color={isCurrentPage ? "text.primary" : "text.secondary"}
        sx={{
          fontSize: isUpSm ? "1rem" : "0.75rem",
          mr: 4,
          fontWeight: "bold",
          position: "relative",
          "&::after": isCurrentPage
            ? {
                position: "absolute",
                content: "''",
                height: 2,
                bottom: -3,
                margin: "0 auto",
                left: 0,
                right: 0,
                width: "100%",
                backgroundColor: "text.primary",
              }
            : {},
        }}
      >
        {children}
      </Typography>
    </Link>
  );
};

const HeaderBar = () => {
  const { authState, authDispatcher } = useContext(AuthContext);
  const { connectWallet } = useWallet();
  const theme = useTheme();
  const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

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
          <img
            style={{ height: isUpSm ? 48 : 40 }}
            src={isUpSm ? "/DSR-Editor/logo_full.svg" : "/DSR-Editor/logo.svg"}
            alt="D SHOWROOM"
          />
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
              {isUpSm
                ? authState?.walletAddr?.slice(0, 5) +
                  "..." +
                  authState?.walletAddr?.slice(-5)
                : "..." + authState?.walletAddr?.slice(-3)}
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
