import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { SigningType } from "@airgap/beacon-sdk";
import { useContext, useEffect, useState } from "react";
import { login } from "../utils/axios";
import { AuthContext } from "../utils/context";
import { AuthDispatcherAction } from "../utils/AuthReducer";

const tezos = new TezosToolkit("https://mainnet-tezos.giganode.io");
const wallet = new BeaconWallet({
  name: "D Showroom",
});

tezos.setWalletProvider(wallet);

/**
 *
 * @returns {{walletAddr: string, connectWallet: Promise, checkWalletConnection: Promise}}
 */
const useWallet = () => {
  const { authState, authDispatcher } = useContext(AuthContext);
  const [walletAddr, setWalletAddr] = useState("");

  const checkWalletConnection = async () => {
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      let addr = activeAccount.address;
      if (walletAddr === addr) {
        console.log("Already connected: ", addr);
      } else {
        console.log("Another wallet connected: ", addr);
      }
    } else {
      console.log("No wallet connnection!");
    }
  };

  const connectWallet = async () => {
    try {
      console.log("Requesting permissions...");
      wallet.client.requestPermissions().then((permissions) => {
        let addr = permissions.address;
        setWalletAddr(addr);
        wallet.client
          .requestSignPayload({
            signingType: SigningType.RAW,
            payload: addr,
          })
          .then((res) => {
            console.log("Get signature. Try login...");
            login(addr, res.signature).then((authToken) => {
              console.log("Login suceed!");
              authDispatcher({
                type: AuthDispatcherAction.LOGIN,
                payload: {
                  walletAddr: addr,
                  token: authToken,
                },
              });
            });
          });
      });
    } catch (error) {
      setWalletAddr("");
      console.log("Got error:", error);
    }
  };

  return { walletAddr, connectWallet, checkWalletConnection };
};

export default useWallet;
