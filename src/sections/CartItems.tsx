import {
  Box,
  Button,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clearCartItems, getCartItems } from "../utils/cart";
import { RootState } from "@/components/Providers";
import EmptyCart from "./EmptyCart";
import CartTable from "./CartTable";
const cartHeading = ["Color", "Price", "Quantity", "Total", "Remove"];

export const CartTableSkeleton = () => {
  const skeletonRows = Array(3).fill(null);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: { xs: "100%", md: "90%", lg: "80%" },
        mx: "auto",
        my: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        overflowX: "auto",
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="Cart Table Loading">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f4f4f4" }}>
            <TableCell sx={{ fontWeight: 600 }}>Image</TableCell>
            <TableCell align="left" sx={{ fontWeight: 600 }}>
              Description
            </TableCell>
            {cartHeading.map((heading, index) => (
              <TableCell key={index} align="center" sx={{ fontWeight: 600 }}>
                {heading}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {skeletonRows.map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton
                  variant="rectangular"
                  width={80}
                  height={80}
                  sx={{ borderRadius: 1 }}
                />
              </TableCell>
              <TableCell align="left">
                <Skeleton variant="text" width="80%" height={30} />
              </TableCell>
              <TableCell align="center">
                <Box display="flex" justifyContent="center">
                  <Skeleton variant="circular" width={20} height={20} />
                </Box>
              </TableCell>
              <TableCell align="center">
                <Skeleton
                  variant="text"
                  width={60}
                  height={24}
                  sx={{ mx: "auto" }}
                />
              </TableCell>
              <TableCell align="center">
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={32}
                  sx={{ mx: "auto", borderRadius: 1 }}
                />
              </TableCell>
              <TableCell align="center">
                <Skeleton
                  variant="text"
                  width={60}
                  height={24}
                  sx={{ mx: "auto" }}
                />
              </TableCell>
              <TableCell align="center">
                <Skeleton
                  variant="rectangular"
                  width={40}
                  height={40}
                  sx={{ mx: "auto" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CartItems = () => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down("sm"));
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: getCartItems,
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
  });

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems={{ xs: "center", sm: "center" }}
        spacing={{ xs: 2, sm: 0 }}
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: "90%", lg: "80%" },
          mx: "auto",
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: "#252b42",
            fontSize: { xs: "1.3rem", sm: "2rem" },
          }}
        >
          Shopping Cart
        </Typography>
        {!isLoading && cart && cart?.data[0].items.length > 0 && (
          <Button
            variant="contained"
            color="error"
            onClick={() => clearCartMutation.mutate()}
            sx={{
              fontWeight: 700,
              width: { xs: "50px", sm: "200px" },
              minHeight: "40px",
              padding: { xs: "10px", sm: "10px 20px" },
              borderRadius: "25px",
              background: "linear-gradient(90deg, #ff4d4f 0%, #ff7875 100%)",
              boxShadow: "0 4px 12px rgba(255, 77, 79, 0.3)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontSize: { xs: "0.8rem", sm: "1rem" },
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                background: "linear-gradient(90deg, #ff7875 0%, #ff4d4f 100%)",
                transform: "translateY(-3px)",
                boxShadow: "0 6px 16px rgba(255, 77, 79, 0.5)",
              },
              "&:active": {
                transform: "translateY(0)",
                boxShadow: "0 2px 8px rgba(255, 77, 79, 0.2)",
              },
            }}
          >
            {!isMobile ? "Clear Cart" : <DeleteIcon />}{" "}
          </Button>
        )}
      </Stack>

      {isLoading ? (
        <CartTableSkeleton />
      ) : cart && cart.data[0].items.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartTable cart={cart?.data} />
      )}
    </>
  );
};

export default CartItems;
