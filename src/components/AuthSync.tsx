"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Providers";

export default function AuthSync() {
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (token) {
      document.cookie = `access_token=${token}; path=/; SameSite=Strict`;
    } else {
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, [token]);

  return null;
}
