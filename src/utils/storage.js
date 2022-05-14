import cookie from "react-cookies";
/**
 * keys
 */
export const LS_AUTH_TOKEN = "atk";
export const LS_WALLET_ADDR = "addr";

const storage = {};

Object.defineProperty(storage, "authToken", {
  get: () => localStorage.getItem(LS_AUTH_TOKEN),
  set: (value) => {
    localStorage.setItem(LS_AUTH_TOKEN, value);
  },
});

Object.defineProperty(storage, "walletAddr", {
  get: () => localStorage.getItem(LS_WALLET_ADDR),
  set: (value) => {
    localStorage.setItem(LS_WALLET_ADDR, value);
  },
});

// Object.defineProperty(storage, "theme", {
//   get: () => localStorage.getItem(LS_THEME),
//   set: (value) => {
//     localStorage.setItem(LS_THEME, value);
//   },
// });

// Object.defineProperty(storage, "accountId", {
//   get: () => cookie.load(CK_ACCOUNT_ID),
//   set: (value) => {
//     cookie.save(CK_ACCOUNT_ID, value, { path: "/" });
//   },
// });

// Object.defineProperty(storage, "nickname", {
//   get: () => cookie.load(CK_NICKNAME),
//   set: (value) => {
//     cookie.save(CK_NICKNAME, value, { path: "/" });
//   },
// });

storage.clearAccountData = () => {
  localStorage.removeItem(LS_AUTH_TOKEN);
  localStorage.removeItem(LS_WALLET_ADDR);
};

export default storage;
