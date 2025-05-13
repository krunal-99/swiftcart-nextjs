import { companies } from "@/data/data";
import ProductsListing from "@/sections/ProductsListing";
import ShopHeader from "@/sections/ShopHeader";
import { Box, Stack } from "@mui/material";

const Shop = () => {
  return (
    <>
      <ShopHeader />
      <ProductsListing />
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
    </>
  );
};

export default Shop;
