import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { SigningType } from "@airgap/beacon-sdk";
import { useContext, useEffect, useState } from "react";
import { getPayload, login } from "../utils/axios";
import { AuthContext, LoadingContext } from "../utils/context";
import { AuthDispatcherAction } from "../utils/AuthReducer";
import Utility from "../utils/utility";

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
  const { setIsLoading } = useContext(LoadingContext);
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
    setIsLoading(true);
    try {
      // Request Permission
      console.log("Requesting permissions...");
      const permissions = await wallet.client.requestPermissions();

      let addr = permissions.address;
      setWalletAddr(addr);

      // Get payload to sign
      console.log("Get permission. Get payload...");
      const payload = await getPayload(addr);

      // Signing
      console.log("Get payload. Request signature...");
      const signResult = await wallet.client.requestSignPayload({
        signingType: SigningType.MICHELINE,
        payload,
      });

      // Login
      console.log("Get signature. Try login...");
      await login(addr, signResult.signature).then((authToken) => {
        console.log("Login suceed!");
        authDispatcher({
          type: AuthDispatcherAction.LOGIN,
          payload: {
            walletAddr: addr,
            token: authToken,
          },
        });
      });
    } catch (error) {
      setWalletAddr("");
      console.log("Got error:", error);
    }
    setIsLoading(false);
  };

  return { walletAddr, connectWallet, checkWalletConnection };
};

export default useWallet;
