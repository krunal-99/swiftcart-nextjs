import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
  Grid,
  Avatar,
  Fade,
  styled,
} from "@mui/material";
import {
  Error as ErrorIcon,
  ShoppingBag,
  ArrowForward,
} from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/components/Providers";
import { getOrderBySessionId } from "@/utils/order";
import { clearCartItems } from "@/utils/cart";
import Link from "next/link";
import { ContactPath, ShopPath } from "@/constants/constants";
import { useSearchParams } from "next/navigation";

const RedAvatar = styled(Avatar)(() => ({
  backgroundColor: red[100],
  color: red[600],
  width: 96,
  height: 96,
  marginBottom: 24,
  "& .MuiSvgIcon-root": {
    fontSize: 48,
  },
}));

const InfoBox = styled(Box)(() => ({
  backgroundColor: red[50],
  padding: "16px 20px",
  borderRadius: 8,
  marginBottom: 24,
  width: "100%",
}));

const PaymentError = () => {
  const searchParams = useSearchParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const sessionId = searchParams.get("session_id");
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", sessionId],
    queryFn: () => getOrderBySessionId(sessionId!),
    enabled: !!sessionId,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    const clearUserCart = async () => {
      if (user?.id) {
        try {
          await clearCartItems();
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      }
    };
    clearUserCart();
  }, [user?.id]);

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
          padding: 2,
          mt: 7,
        }}
      >
        <Fade in={true} timeout={500}>
          <Paper
            elevation={3}
            sx={{
              maxWidth: 480,
              width: "100%",
              p: { xs: 3, md: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <RedAvatar>
                <ErrorIcon fontSize="large" />
              </RedAvatar>

              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                gutterBottom
              >
                Payment Failed
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We couldn't process your payment. Please try again or contact
                support.
              </Typography>

              <InfoBox>
                <Typography variant="body1" color="error" gutterBottom>
                  Error Details:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {error instanceof Error
                    ? error.message
                    : "An unknown error occurred"}
                </Typography>
              </InfoBox>

              <Grid container spacing={2} sx={{ width: "100%", mt: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    component={Link}
                    href={ShopPath}
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: red[600],
                      "&:hover": { bgcolor: red[700] },
                    }}
                    startIcon={<ShoppingBag />}
                  >
                    Return to Shop
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    component={Link}
                    href={ContactPath}
                    variant="outlined"
                    fullWidth
                    endIcon={<ArrowForward />}
                  >
                    Contact Support
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary" align="center">
              If you believe this is an error, please contact our support team
              for assistance.
            </Typography>
          </Paper>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
        padding: 2,
        mt: 7,
      }}
    >
      <Fade in={true} timeout={500}>
        <Paper
          elevation={3}
          sx={{
            maxWidth: 480,
            width: "100%",
            p: { xs: 3, md: 4 },
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <RedAvatar>
              <ErrorIcon fontSize="large" />
            </RedAvatar>

            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              Payment Failed
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We couldn't process your payment. Please try again or contact
              support.
            </Typography>

            <InfoBox>
              <Typography variant="body1" color="error" gutterBottom>
                Order Details:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {isLoading
                  ? "Loading order information..."
                  : order
                  ? `Order ID: ${order.id}`
                  : "No order information available"}
              </Typography>
            </InfoBox>

            <Grid container spacing={2} sx={{ width: "100%", mt: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  component={Link}
                  href={ShopPath}
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: red[600],
                    "&:hover": { bgcolor: red[700] },
                  }}
                  startIcon={<ShoppingBag />}
                >
                  Return to Shop
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  component={Link}
                  href={ContactPath}
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForward />}
                >
                  Contact Support
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="text.secondary" align="center">
            If you believe this is an error, please contact our support team for
            assistance.
          </Typography>
        </Paper>
      </Fade>
    </Box>
  );
};

export default PaymentError;
