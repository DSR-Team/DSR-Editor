import { createContext, Context } from "react";

export const AuthContext = createContext({
  authState: {
    isLoggedIn: false,
    walletAddr: "",
  },
  authDispatcher: () => {},
});

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
});

/**
 * @typedef {{name: String}} Room
 * @type {Context<{name: String, setName: ()=>{}, roomId: String, room: Room, isModified: boolean }>}
 */
export const EditRoomContext = createContext({
  name: undefined,
  setName: undefined,
  roomId: undefined,
  room: undefined,
  isModified: false,
});
