import { Paper, styled } from "@mui/material";
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

export const CategoryItem = styled(Paper)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "& .label": {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(3),
    backgroundColor: "white",
    padding: theme.spacing(1.5, 4),
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#252b42",
  },
}));
