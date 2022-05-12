import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import { AuthDispatcherAction } from "../utils/AuthReducer";
import { AuthContext } from "../utils/context";

const HeaderBar = () => {
  const { authState, authDispatcher } = useContext(AuthContext);

  const onClickConnect = () => {
    authDispatcher({
      type: AuthDispatcherAction.LOGIN,
      payload: {
        walletAddr: "tz1fGgpKXtxHqTZyY7YdHGCNTs9J2Wen6euq",
      },
    });
  };

  return (
    <AppBar color="default" enableColorOnDark>
      <Toolbar>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          D SHOWROOM
        </Typography>
        <Typography sx={{ flexGrow: 1 }} />
        {authState?.isLoggedIn ? (
          <>
            <Button variant="outlined" sx={{ textTransform: "none" }}>
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
