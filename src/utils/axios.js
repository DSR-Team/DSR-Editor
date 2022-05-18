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
  return await instance.get(`/login/${walletAddr}/payload`).then((res) => {
    return res.data.payload;
  });
};

export const login = async (walletAddr, signature) => {
  return await instance
    .post(
      "/login",
      new SimpleFormData({
        address: walletAddr,
        signature,
      })
    )
    .then((res) => {
      return res.data.access_token;
    });
};
