import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import config from "../../system.config.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Axios = axios.create({
  baseURL: config.isProduction
    ? config.productionServer
    : config.developmentServer,
});

export const Axios2 = (endpoint, method) => async (data) => {
  const token = localStorage.getItem("token");
  let response;

  switch (method?.toUpperCase()) {
    case "POST":
      response = await Axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;

    case "PATCH":
      response = await Axios.patch(endpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;

    case "DELETE":
      response = await Axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
      return response.data;

    default:
      // GET request
      response = await Axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
  }
};
