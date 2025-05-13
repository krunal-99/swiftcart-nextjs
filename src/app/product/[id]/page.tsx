import ProductDetails from "@/sections/ProductDetails";
import ProductHero from "@/sections/ProductHero";
import { Box } from "@mui/material";

export default async function ProductDetail() {
  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", p: 2 }}>
      <ProductHero />
      <ProductDetails />
    </Box>
  );
}
