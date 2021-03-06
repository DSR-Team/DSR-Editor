import { Backdrop, Box, Portal, Typography } from "@mui/material";
import { useContext, useReducer, useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { authStatusReducer, AuthDispatcherAction } from "../utils/AuthReducer";
import { AuthContext, LoadingContext } from "../utils/context";
import storage, { LS_AUTH_TOKEN } from "../utils/storage";
import Home from "./Home";
import NotFound from "./NotFound";
import Rooms from "./Rooms";
import jwt from "jsonwebtoken";
import Collections from "./Collections";
import { renewJwt } from "../utils/axios";
import EditRoom from "./EditRoom";
import RoomsRoot from "./RoomsRoot";
import useScrollbar from "../hooks/useScrollbar";

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  return authState?.isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

const App = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useScrollbar();

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

  const checkJwt = () => {
    renewJwt()
      .then((token) => {
        if (jwt.decode(token)?.addr !== storage.walletAddr) {
          throw new Error("Inconsistent address.");
        }
        authDispatcher({
          type: AuthDispatcherAction.AUTO_SYNC,
          payload: {
            token,
          },
        });
      })
      .catch((e) => {
        authDispatcher({ type: AuthDispatcherAction.LOGOUT });
        window.location.reload();
      });
  };

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
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <AuthContext.Provider value={{ authState, authDispatcher }}>
        <Portal container={document.body}>
          <Backdrop
            sx={{ zIndex: 999999, backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            open={isLoading}
          >
            <img
              width="100"
              alt="loading"
              src="/DSR-Editor/images/spinner.svg"
            />
          </Backdrop>
        </Portal>
        <HeaderBar />
        <Box
          sx={{
            width: "100%",
            height: { xs: "calc(100% - 56px)", sm: "calc(100% - 64px)" },
            mt: { xs: 7, sm: 8 },
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "overlay",
            scrollBehavior: "smooth",
          }}
          ref={scrollRef}
        >
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Home />} />
              <Route path="rooms" element={<PrivateRoute />}>
                <Route path="" element={<RoomsRoot />}>
                  <Route index element={<Rooms />} />
                  <Route path=":roomId" element={<EditRoom />} />
                </Route>
              </Route>
              <Route path="collections" element={<PrivateRoute />}>
                <Route path="" element={<Collections />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
};

export default App;
