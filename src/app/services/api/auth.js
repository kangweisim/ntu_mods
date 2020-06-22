import axios from "axios";
import { store } from "app/store";
import { get_api_path } from "./api";

export function sessioned_client(token) {
  if (!token) {
    const { localstore } = store.getState();
    const { access_token } = localstore;
    if (!access_token || !access_token.token)
      throw new Error("no access token");
    token = access_token.token;
  }

  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return {
    get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
  };
};

export async function login({ username, password }) {
  const url = get_api_path("auth/login");
  const response = await axios.post(url, { username, password });
  const { access_token, entity } = response.data.result;
  return { access_token, entity };
};

export async function retrieve_profile(token) {
  const url = get_api_path("self/profile");
  const response = await sessioned_client(token).get(url);
  const { entity } = response.data.result;
  return { entity };
};

export async function password_request({ username }) {
  const url = get_api_path("password/request");
  const response = await axios.post(url, { username });
  return response.data.result;
};

export async function password_query({ token }) {
  const url = get_api_path("password/query", { token });
  const response = await axios.get(url);
  return response.data.result;
};

export async function password_reset({ token, password }) {
  const url = get_api_path("password/reset");
  const response = await axios.post(url, { token, password });
  return response.data.result;
};