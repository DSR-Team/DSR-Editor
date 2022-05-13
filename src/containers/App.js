import { Box, Typography } from "@mui/material";
import { useContext, useReducer } from "react";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { authStatusReducer } from "../utils/AuthReducer";
import { AuthContext } from "../utils/context";
import Home from "./Home";
import NotFound from "./NotFound";
import Rooms from "./Rooms";

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  return authState?.isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

const App = () => {
  const initAuthState = () => {
    // const authToken = storage.authToken;
    // if (authToken && storage.accountId) {
    //   const { accountId, confirmed } = jwt.decode(authToken) ?? {};
    //   if (accountId === storage.accountId) {
    //     return {
    //       isLoggedIn: true,
    //       accountId: accountId,
    //       isEmailConfirmed: confirmed,
    //       nickname: storage.nickname ?? "Anonymous",
    //     };
    //   }
    // }

    // storage.clearAccountData();
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

  return (
    <AuthContext.Provider value={{ authState, authDispatcher }}>
      <HashRouter>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </HashRouter>
    </AuthContext.Provider>
  );
};

export default App;
