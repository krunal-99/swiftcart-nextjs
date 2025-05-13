"use client";

import { Box, Grid, Typography } from "@mui/material";
import { getRandomProducts } from "../utils/product";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../data/types";
import CardComponent from "@/components/CardComponent";

const Products = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["randomProducts"],
    queryFn: getRandomProducts,
  });

  if (isError) return <div>Error: {"Something went wrong."}</div>;

  return (
    <Box sx={{ my: 10 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h6" color="#737373">
          Featured Products
        </Typography>
        <Typography
          variant="h6"
          color="#252b42"
          sx={{
            py: 1,
            fontWeight: 700,
            fontSize: "24px",
            letterSpacing: "0.1px",
          }}
        >
          BESTSELLER PRODUCTS
        </Typography>
        <Typography variant="body2" color="#737373" sx={{ fontWeight: 700 }}>
          Here are some of the top quality clothes recommended for you.
        </Typography>
      </Box>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {isLoading
          ? Array.from(new Array(8)).map((_, index) => (
              <Grid
                columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={index}
                display="flex"
                justifyContent="center"
              >
                <CardComponent
                  isLoading={true}
                  product={{ id: index } as Product}
                />
              </Grid>
            ))
          : data?.slice(0, 8).map((data: Product, index: number) => (
              <Grid
                columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={index}
                display="flex"
                justifyContent="center"
              >
                <CardComponent isLoading={isLoading} product={data} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default Products;
