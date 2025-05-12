import { styled } from "@mui/material";
import Link from "next/link";

export const StyledNavLink = styled(Link)(() => ({
  textDecoration: "none",
  position: "relative",
  "& .MuiButton-root": {
    transition: "all 0.3s ease",
  },
  "&.active .MuiButton-root": {
    color: "#23a6f0",
    fontWeight: 800,
  },
  "@keyframes fadeIn": {
    "0%": {
      width: "0%",
      opacity: 0,
    },
    "100%": {
      width: "60%",
      opacity: 1,
    },
  },
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const StyledDrawerNavLink = styled(Link)(() => ({
  textDecoration: "none",
  width: "90%",
  margin: "auto",
  "&.active .MuiListItemText-root": {
    color: "#23a6f0",
    fontWeight: 800,
  },
  "&.active .MuiListItemButton-root": {
    backgroundColor: "rgba(35, 166, 240, 0.08)",
    borderRadius: "8px",
  },
}));
