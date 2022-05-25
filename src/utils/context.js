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
 * @typedef {{contract: string, tokenId: string}} Token
 * @typedef {{name: String, metadata: Array<Token>}} Room
 * @type {Context<{name: String, setName: ()=>{}, roomId: String, room: Room,
 * isModified: boolean, currentEditPlace: number, setCurrentEditPlace: ()=>{},
 * meta: Array<Token>, setMeta: ()=>{} }>}
 */
export const EditRoomContext = createContext({
  name: undefined,
  setName: undefined,
  roomId: undefined,
  room: undefined,
  isModified: false,
  currentEditPlace: 0,
  setCurrentEditPlace: undefined,
  meta: undefined,
  setMeta: undefined,
});
