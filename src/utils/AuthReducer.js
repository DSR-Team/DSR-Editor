const authStatusReducer = (state, { type, payload }) => {
  let walletAddr = payload?.walletAddr ?? "";

  switch (type) {
    case AuthDispatcherAction.AUTO_SYNC:
      return state;

    case AuthDispatcherAction.LOGIN:
      return {
        isLoggedIn: true,
        walletAddr,
      };

    case AuthDispatcherAction.LOGOUT:
      // storage.clearAccountData();
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
