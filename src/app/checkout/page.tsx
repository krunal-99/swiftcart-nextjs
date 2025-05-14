"use client";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { RootState } from "@/components/Providers";
import { getCartItems } from "@/utils/cart";
import { useRouter } from "next/navigation";
import { handleInfo, handleSuccess } from "@/utils/utils";
import { HomePath, ShopPath } from "@/constants/constants";
import { saveAddress } from "@/utils/address";
import axiosInstance from "@/utils/instance";
import { CartItems } from "@/data/types";
import Link from "next/link";
import CheckoutForm from "@/forms/Checkout";
import OrderSummary from "@/sections/OrderSummary";
import PrivateRoute from "@/components/PrivateRoute";

const Checkout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: getCartItems,
    enabled: !!user?.id,
  });
  const router = useRouter();
  const items = cartItems?.data[0].items || [];
  const cartId = cartItems?.data[0]?.id;
  const [resetFormCallback] = useState<() => void>(() => () => {});

  useEffect(() => {
    if (!isLoading && (!items || items.length === 0)) {
      handleInfo(
        "Your cart is empty. Please add items to proceed to checkout."
      );
      router.push(ShopPath);
    }
  }, [isLoading, items]);

  const addressMutation = useMutation({
    mutationFn: saveAddress,
    onSuccess: () => {
      handleSuccess("Address successfully saved");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      resetFormCallback();
    },
    onError: (error) => {
      console.error("Error saving address:", error);
    },
  });

  const handlePlaceOrder = async (formData: Record<string, any>) => {
    if (formData.saveAddressOnly) {
      addressMutation.mutate(formData);
    } else if (formData.addressId) {
      const stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_KEY as string
      );
      const body = {
        products: items,
        email: user?.email,
        userId: user?.id,
        addressId: formData.addressId,
        cartId,
      };
      const response = await axiosInstance.post(
        "/payment/create-checkout-session",
        JSON.stringify(body)
      );
      const session = await response.data;
      await stripePromise?.redirectToCheckout({
        sessionId: session.id,
      });
    }
  };
  const subtotal = items.reduce(
    (sum: number, item: CartItems) =>
      sum + Number(item.product.sale_price) * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const orderSummary = { subtotal, shipping, total, items };

  if (isLoading || (!isLoading && (!items || items.length === 0))) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "grey.100",
        }}
      >
        <Fade in={true} timeout={500}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: "primary.main", mb: 2 }}
            />
            <Typography
              variant="h6"
              sx={{ color: "text.secondary", fontWeight: "medium" }}
            >
              Loading your cart...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <PrivateRoute>
      <Container
        maxWidth="lg"
        sx={{ py: 6, minHeight: "100vh", bgcolor: "grey.100" }}
      >
        <Box
          component={Link}
          href={HomePath}
          sx={{
            display: "flex",
            alignItems: "center",
            color: "primary.main",
            mb: 3,
            textDecoration: "none",
            "&:hover": { color: "primary.dark", textDecoration: "underline" },
            fontWeight: "medium",
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: 22, mr: 0.8 }} />
          <Typography variant="body1">Continue Shopping</Typography>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: "primary.main",
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Checkout
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
            gap: 4,
          }}
        >
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 3, bgcolor: "background.paper" }}
          >
            <CheckoutForm
              onSubmit={handlePlaceOrder}
              loading={addressMutation.isPending}
            />
          </Paper>
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 3, bgcolor: "background.paper" }}
          >
            <OrderSummary summary={orderSummary} loading={isLoading} />
          </Paper>
        </Box>
      </Container>
    </PrivateRoute>
  );
};

export default Checkout;
