import axios from "axios";
import { SERVER_URL } from "./config";
import storage from "./storage";

const instance = axios.create({ baseURL: SERVER_URL });

instance.interceptors.request.use((config) => {
  const token = storage.authToken;
  config.headers["auth-token"] = token ? `Bearer ${token}` : "";

  return config;
});

export const login = async (walletAddr, signature) => {
  const formData = new FormData();

  formData.append("address", walletAddr);
  formData.append("signed_address", signature);

  const accessToken = await instance.post("/login", formData).then((res) => {
    return res.data.access_token;
  });

  // const accessToken = await instance
  //   .post("/login", {
  //     address: walletAddr,
  //     signed_address: signature,
  //   })
  //   .then((res) => {
  //     return res.data.access_token;
  //   });

  return accessToken;
};
