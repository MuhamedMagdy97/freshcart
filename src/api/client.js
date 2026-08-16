import axios from "axios";

export const AUTH_TOKEN_KEY = "userToken";

export const apiClient = axios.create({
  baseURL:
    process.env.REACT_APP_API_BASE_URL ||
    "https://ecommerce.routemisr.com/api/v1",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem(AUTH_TOKEN_KEY);

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.token = token;
  }

  return config;
});

export function getApiErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  return error?.response?.data?.message || error?.message || fallback;
}

export function getAppUrl(path = "/") {
  const publicUrl = process.env.PUBLIC_URL || "";
  const basePath = publicUrl.endsWith("/")
    ? publicUrl.slice(0, -1)
    : publicUrl;
  const routePath = path.startsWith("/") ? path : `/${path}`;

  return `${window.location.origin}${basePath}${routePath}`;
}