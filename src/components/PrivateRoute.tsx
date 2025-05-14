"use client";

import { ReactNode, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Providers";
import { useRouter } from "next/navigation";
import { LoginPath } from "@/constants/constants";
import useLazyRipple from "@mui/material/useLazyRipple";
import { Box, CircularProgress } from "@mui/material";
import { handleError } from "@/utils/utils";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    if ((!isAuthenticated || !user) && !toastShown.current) {
      toastShown.current = true;
      handleError("Please login to access this page");
      router.push(LoginPath);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
