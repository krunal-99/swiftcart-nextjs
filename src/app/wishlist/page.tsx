"use client";
import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RootState } from "@/components/Providers";
import { getWishListItems } from "@/utils/wishlist";
import WishListCard from "@/components/WishlistCard";
import { Wishlist } from "@/data/types";

const WishlistPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data: wishlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: getWishListItems,
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isError) return <Typography>Error fetching wishlist items.</Typography>;
  return (
    <Box width="88%" margin="auto" sx={{ mt: "100px" }}>
      <Box>
        <Typography
          textAlign="center"
          mb="50px"
          color="#252b42"
          fontWeight={700}
          variant="h5"
        >
          YOUR WISHLIST
        </Typography>

        {!isLoading && (!wishlist || wishlist.length === 0) ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="50vh"
            textAlign="center"
            p={3}
          >
            <FavoriteIcon sx={{ fontSize: 80, color: "#bdbdbd", mb: 2 }} />
            <Typography
              variant="h5"
              color="#252b42"
              fontWeight={600}
              gutterBottom
            >
              Your wishlist is empty
            </Typography>
            <Typography variant="body1" color="#737373" maxWidth="500px" mb={3}>
              Items added to your wishlist will appear here. Discover products
              and add them to your wishlist!
            </Typography>
          </Box>
        ) : (
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {isLoading
              ? Array.from(new Array(4)).map((_, index) => (
                  <Grid
                    columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={index}
                    display="flex"
                    justifyContent="center"
                  >
                    <WishListCard />
                  </Grid>
                ))
              : wishlist &&
                wishlist.map((item: Wishlist, index: number) => (
                  <Grid
                    columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={index}
                    display="flex"
                    justifyContent="center"
                  >
                    <WishListCard key={index} item={item} />
                  </Grid>
                ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default WishlistPage;
