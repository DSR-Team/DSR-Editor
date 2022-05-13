import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../utils/context";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { AuthDispatcherAction } from "../utils/AuthReducer";

const tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
const wallet = new BeaconWallet({
  name: "D Showroom",
});

tezos.setWalletProvider(wallet);

// const dAppClient = new DAppClient({ name: "D Showroom" });

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

  const onClickConnect = async () => {
    try {
      console.log("Requesting permissions...");
      const permissions = await wallet.client.requestPermissions();

      authDispatcher({
        type: AuthDispatcherAction.LOGIN,
        payload: {
          walletAddr: permissions.address,
        },
      });
    } catch (error) {
      console.log("Got error:", error);
    }
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
