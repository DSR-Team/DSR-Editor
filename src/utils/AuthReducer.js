import storage from "./storage";

const authStatusReducer = (state, { type, payload }) => {
  console.log("dispatcher got state: ", type);
  let walletAddr = payload?.walletAddr ?? "";
  let token = payload?.token;

  switch (type) {
    case AuthDispatcherAction.AUTO_SYNC:
      if (token) {
        storage.authToken = token;
        return state;
      } else {
        return state;
      }

    case AuthDispatcherAction.LOGIN:
      storage.authToken = token;
      storage.walletAddr = walletAddr;
      return {
        isLoggedIn: true,
        walletAddr,
      };

    case AuthDispatcherAction.LOGOUT:
      storage.clearAccountData();
      return {
        isLoggedIn: false,
        walletAddr: "",
      };

    default:
      return state;
  }
};

const AuthDispatcherAction = {
  AUTO_SYNC: 0,
  LOGIN: 1,
  LOGOUT: 2,
};

export { authStatusReducer, AuthDispatcherAction };
