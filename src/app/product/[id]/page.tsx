import { companies } from "@/data/data";
import BestProducts from "@/sections/BestProducts";
import ProductDetails from "@/sections/ProductDetails";
import ProductHero from "@/sections/ProductHero";
import { Box, Stack } from "@mui/material";

export default async function ProductDetail() {
  return (
    <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh", p: 2 }}>
      <ProductHero />
      <ProductDetails />
      <BestProducts />
      <Stack
        direction="row"
        justifyContent="center"
        py="70px"
        display="flex"
        flexWrap="wrap"
        bgcolor="#fafafa"
      >
        {companies.map((company, idx) => (
          <Box
            component="img"
            key={idx}
            src={company}
            height={50}
            width={150}
            margin={{ xs: "30px", md: "20px" }}
          />
        ))}
      </Stack>
    </Box>
  );
}
