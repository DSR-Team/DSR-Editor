import axios from "axios";
import { SERVER_URL } from "./config";
import storage from "./storage";

const instance = axios.create({ baseURL: SERVER_URL });

instance.interceptors.request.use((config) => {
  const token = storage.authToken;
  config.headers["Authorization"] = token ? `Bearer ${token}` : "";

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

export const renewJwt = async () => {
  return await instance.get("/renew_token").then((res) => {
    return res.data.access_token;
  });
};

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

export const getCollections = async ({ offset }) => {
  return await instance
    .get("/collections", { params: { offset } })
    .then((res) => {
      return res.data;
    });
};

export const getRooms = async () => {
  return await instance.get("/rooms").then((res) => {
    return res.data;
  });
};

export const createRoom = async (name, image) => {
  return await instance
    .post(
      "/rooms/create",
      new SimpleFormData({
        name,
        image: image ?? "",
      })
    )
    .then((res) => {
      return res.data.id;
    });
};

export const deleteRoom = async (id) => {
  await instance.delete(`/rooms/${id}/delete`);
};
