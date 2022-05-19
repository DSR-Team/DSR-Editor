import { Box, Typography } from "@mui/material";
import { useContext, useReducer, useEffect } from "react";
import {
  HashRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { authStatusReducer, AuthDispatcherAction } from "../utils/AuthReducer";
import { AuthContext } from "../utils/context";
import storage, { LS_AUTH_TOKEN } from "../utils/storage";
import Home from "./Home";
import NotFound from "./NotFound";
import Rooms from "./Rooms";
import jwt from "jsonwebtoken";
import Collections from "./Collections";

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  return authState?.isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

const App = () => {
  const location = useLocation();

  const initAuthState = () => {
    const authToken = storage.authToken;
    if (authToken && storage.walletAddr) {
      const { addr } = jwt.decode(authToken) ?? {};
      if (addr === storage.walletAddr) {
        return {
          isLoggedIn: true,
          walletAddr: addr,
        };
      }
    }

    storage.clearAccountData();
    return {
      isLoggedIn: false,
      walletAddr: "",
    };
  };

  const [authState, authDispatcher] = useReducer(
    authStatusReducer,
    {},
    initAuthState
  );

  const checkJwt = () => {};

  /**
   * Check Auth On Load
   */
  useEffect(() => {
    console.log("Check local account at:", location.pathname);
    if (storage.authToken && storage.walletAddr) {
      checkJwt();
    } else {
      authDispatcher({
        type: AuthDispatcherAction.LOGOUT,
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  useEffect(() => {
    function checkLocalStorage(e) {
      switch (e.key) {
        case LS_AUTH_TOKEN:
          onJwtChanged(e.newValue);
          break;
        default:
          break;
      }
    }

    const onJwtChanged = (authToken) => {
      if (authToken && storage.walletAddr) {
        const { addr } = jwt.decode(authToken);

        if (addr === storage.walletAddr) {
          authDispatcher({
            type: AuthDispatcherAction.AUTO_SYNC,
            payload: {
              walletAddr: addr,
              token: authToken,
            },
          });
          return;
        }
      }

      authDispatcher({
        type: AuthDispatcherAction.LOGOUT,
      });
    };

    window.addEventListener("storage", checkLocalStorage);

    return () => {
      window.removeEventListener("storage", checkLocalStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatcher }}>
      <HeaderBar />
      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 56px)",
          mt: "56px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<PrivateRoute />}>
            <Route path="/rooms" element={<Rooms />} />
          </Route>
          <Route path="/collections" element={<PrivateRoute />}>
            <Route path="/collections" element={<Collections />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </AuthContext.Provider>
  );
};

export default App;
