"use client";
import {
  CartPath,
  HomePath,
  LoginPath,
  WishlistPath,
} from "@/constants/constants";
import { navLinks } from "@/data/data";
import {
  DrawerHeader,
  StyledDrawerNavLink,
  StyledNavLink,
} from "@/themes/ComponentThemes";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Person2Icon from "@mui/icons-material/Person2";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "@/store/authSlice";
import { RootState } from "@/components/Providers";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isActiveLink = (path: string): boolean => {
    if (path === HomePath && pathname === HomePath) return true;
    if (path !== HomePath && pathname.includes(path)) return true;
    return false;
  };

  const handleCloseUserMenu = (setting?: string) => {
    if (setting === "LOGOUT") {
      dispatch(logout());
      router.push(LoginPath);
    }
    setAnchorElUser(null);
  };

  const settings = isAuthenticated
    ? ["PROFILE", "LOGOUT"]
    : ["REGISTER", "LOGIN"];

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "white",
          top: { xs: 0, md: isFixed ? "0px" : "65px" },
          position: isFixed ? "fixed" : "absolute",
          width: "100%",
          boxShadow: isFixed ? "0px 2px 10px rgba(0,0,0,0.1)" : "none",
          zIndex: 1000,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href={HomePath} style={{ listStyle: "none", color: "white" }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#252b42",
                  fontWeight: 800,
                  letterSpacing: "0.5px",
                  fontSize: { xs: "18px", sm: "24px" },
                  cursor: "pointer",
                }}
              >
                Swiftcart
              </Typography>
            </Link>
            <Box
              sx={{ ml: 10, flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              {navLinks.map((navLink) => (
                <StyledNavLink
                  key={navLink}
                  style={{ textDecoration: "none" }}
                  href={
                    navLink === "HOME" ? HomePath : `/${navLink.toLowerCase()}`
                  }
                >
                  <Button
                    sx={{
                      my: 2,
                      color: isActiveLink(
                        navLink === "HOME"
                          ? HomePath
                          : `/${navLink.toLowerCase()}`
                      )
                        ? "#23a6f0"
                        : "#737373",
                      display: "block",
                      fontWeight: isActiveLink(
                        navLink === "HOME"
                          ? HomePath
                          : `/${navLink.toLowerCase()}`
                      )
                        ? 800
                        : 700,
                      position: "relative",
                      transition: "all 0.3s ease",
                      transform: isActiveLink(
                        navLink === "HOME"
                          ? HomePath
                          : `/${navLink.toLowerCase()}`
                      )
                        ? "scale(1.05)"
                        : "scale(1)",
                      "&:hover": {
                        color: "#23a6f0",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {navLink}
                  </Button>
                </StyledNavLink>
              ))}
            </Box>
            <Stack spacing={1} direction="row" sx={{ ml: "auto" }}>
              <SearchBar />
              <IconButton sx={{ display: { xs: "none", md: "flex" } }}>
                {/* <Badge badgeContent={wishlist?.length} color="error"> */}
                <Badge color="error">
                  <Link style={{ color: "#23a6f0" }} href={WishlistPath}>
                    <FavoriteBorderIcon />
                  </Link>
                </Badge>
              </IconButton>
              <Link href={CartPath} style={{ textDecoration: "none" }}>
                <IconButton
                  sx={{
                    color: "#23a6f0",
                    transition: "color 0.3s ease",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  {/* <Badge badgeContent={totalQuantity} color="error"> */}
                  <Badge color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Link>
              {mounted && (
                <Tooltip title="User Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#23a6f0",
                      }}
                    >
                      {isAuthenticated && user?.imageUrl ? (
                        <Box
                          component="img"
                          src={user.imageUrl}
                          alt="User avatar"
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <Person2Icon />
                      )}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                    sx={{
                      backgroundColor: isActiveLink(`/${setting.toLowerCase()}`)
                        ? "rgba(35, 166, 240, 0.08)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(35, 166, 240, 0.12)",
                      },
                    }}
                  >
                    <Link
                      key={setting}
                      style={{ textDecoration: "none", textAlign: "center" }}
                      href={`${setting.toLowerCase()}`}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          color: isActiveLink(`/${setting.toLowerCase()}`)
                            ? "#23a6f0"
                            : "#737373",
                          fontWeight: 700,
                        }}
                      >
                        {setting}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ position: "relative" }}>
            <ChevronRightIcon
              sx={{
                width: "40px",
                height: "40px",
                position: "absolute",
                right: "230px",
              }}
            />
          </IconButton>
        </DrawerHeader>

        <Box
          sx={{ width: 300, p: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((navLink) => (
              <ListItem key={navLink} disablePadding>
                <StyledDrawerNavLink
                  key={navLink}
                  href={
                    navLink === "HOME" ? HomePath : `${navLink.toLowerCase()}`
                  }
                >
                  <ListItemButton
                    sx={{
                      backgroundColor: isActiveLink(
                        navLink === "HOME"
                          ? HomePath
                          : `/${navLink.toLowerCase()}`
                      )
                        ? "rgba(35, 166, 240, 0.08)"
                        : "transparent",
                      "&:hover": {
                        backgroundColor: "rgba(35, 166, 240, 0.12)",
                      },
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <ListItemText
                      primary={navLink}
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: isActiveLink(
                          navLink === "HOME"
                            ? HomePath
                            : `/${navLink.toLowerCase()}`
                        )
                          ? "#23a6f0"
                          : "#737373",
                        transition: "color 0.3s ease",
                      }}
                    />
                  </ListItemButton>
                </StyledDrawerNavLink>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Link href={CartPath} style={{ textDecoration: "none" }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Badge
                      style={{ color: "#23a6f0" }}
                      // badgeContent={totalQuantity}
                      badgeContent="0"
                      color="error"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </Stack>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  {/* <Badge badgeContent={wishlist?.length} color="error"> */}
                  <Badge color="error">
                    <Link style={{ color: "#23a6f0" }} href={WishlistPath}>
                      <FavoriteBorderIcon />
                    </Link>
                  </Badge>
                </Stack>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
