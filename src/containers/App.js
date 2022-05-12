import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useReducer } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import { authStatusReducer } from "../utils/AuthReducer";
import { AuthContext } from "../utils/context";
import Home from "./Home";
import Rooms from "./Rooms";

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
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="rooms" element={<Rooms />} />
          </Routes>
        </HashRouter>
      </Box>
    </AuthContext.Provider>
  );
};

export default App;
