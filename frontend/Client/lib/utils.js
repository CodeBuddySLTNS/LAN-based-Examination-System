import * as SecureStore from "expo-secure-store";
import axios from "axios";
import config from "@/system.config.json";

export const AxiosInstance = axios.create({
  baseURL: config.isProduction
    ? config.productionServer
    : config.developmentServer,
});

export const Axios2 = (endpoint, method) => async (data) => {
  const token = SecureStore.getItem("token");
  let response;

  switch (method?.toUpperCase()) {
    case "POST":
      response = await AxiosInstance.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;

    case "PATCH":
      response = await AxiosInstance.patch(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;

    case "DELETE":
      response = await AxiosInstance.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
      return response.data;

    default:
      // GET request
      response = await AxiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
  }
};
