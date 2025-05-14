"use client";
import PrivateRoute from "@/components/PrivateRoute";
import CartBoxes from "@/sections/CartBoxes";
import CartItems from "@/sections/CartItems";
import { Box } from "@mui/material";

const Cart = () => {
  return (
    <PrivateRoute>
      <Box mb={5} mt="100px" px={2}>
        <CartItems />
        <CartBoxes />
      </Box>
    </PrivateRoute>
  );
};

export default Cart;
