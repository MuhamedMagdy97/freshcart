import { createContext, useCallback, useMemo, useState } from "react";
import { AUTH_TOKEN_KEY } from "../api/client";

export const UserContext = createContext(null);

function readStoredToken() {
  try {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

function getUserIdFromToken(token) {
  if (!token) return null;

  try {
    const encodedPayload = token.split(".")[1];
    const normalizedPayload = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (normalizedPayload.length % 4)) % 4);
    const payload = JSON.parse(window.atob(`${normalizedPayload}${padding}`));
    return payload.id || payload._id || payload.userId || null;
  } catch {
    return null;
  }
}

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(readStoredToken);

  const login = useCallback((token) => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    setUserToken(token);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    setUserToken(null);
  }, []);

  const userId = useMemo(() => getUserIdFromToken(userToken), [userToken]);
  const value = useMemo(
    () => ({ userToken, userId, login, logout }),
    [login, logout, userId, userToken]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}