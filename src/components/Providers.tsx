"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default function Providers({ children }: { children: React.ReactNode }) {
  const client = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}
