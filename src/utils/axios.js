import axios from "axios";
import { SERVER_URL } from "./config";
import storage from "./storage";

const instance = axios.create({ baseURL: SERVER_URL });

instance.interceptors.request.use((config) => {
  const token = storage.authToken;
  config.headers["auth-token"] = token ? `Bearer ${token}` : "";

  return config;
});

class SimpleFormData extends FormData {
  constructor(data) {
    super();
    for (let key in data) {
      this.append(key, data[key]);
    }
  }
}

export const getPayload = async (walletAddr) => {
  return await instance
    .post(
      "/get_payload",
      new SimpleFormData({
        address: walletAddr,
      })
    )
    .then((res) => {
      return res.data.result;
    });
};

export const login = async (walletAddr, signature) => {
  return await instance
    .post(
      "/login",
      new SimpleFormData({
        address: walletAddr,
        signed_address: signature,
      })
    )
    .then((res) => {
      return res.data.access_token;
    });
};
