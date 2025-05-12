import "react-multi-carousel/lib/styles.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import { carouselResponsive } from "@/data/data";
import { CarouselComponentProps } from "@/data/types";

interface CustomArrowProps {
  onClick?: () => void;
  [key: string]: any;
}

const CustomLeftArrow: React.FC<CustomArrowProps> = ({ onClick, ...rest }) => {
  const { carouselState, ...buttonProps } = rest;

  return (
    <Button
      onClick={() => onClick && onClick()}
      sx={{
        position: "absolute",
        top: "50%",
        left: { xs: "5px", sm: "10px", md: "20px" },
        zIndex: 2,
        color: "white",
        minWidth: "50px",
        height: "50px",
      }}
      {...buttonProps}
    >
      <ArrowBackIosIcon sx={{ fontSize: "30px" }} />
    </Button>
  );
};

const CustomRightArrow: React.FC<CustomArrowProps> = ({ onClick, ...rest }) => {
  const { carouselState, ...buttonProps } = rest;

  return (
    <Button
      onClick={() => onClick && onClick()}
      sx={{
        position: "absolute",
        top: "50%",
        right: { xs: "5px", sm: "10px", md: "20px" },
        zIndex: 2,
        color: "white",
        minWidth: "50px",
        height: "50px",
      }}
      {...buttonProps}
    >
      <ArrowForwardIosIcon sx={{ fontSize: "30px" }} />
    </Button>
  );
};

const CustomDot: React.FC<{ onClick?: () => void; active?: boolean }> = ({
  onClick,
  active,
}) => {
  return (
    <Box
      component="button"
      onClick={() => onClick && onClick()}
      sx={{
        width: "50px",
        height: "10px",
        margin: "0 4px",
        backgroundColor: active ? "white" : "rgba(255, 255, 255, 0.5)",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s",
        position: "relative",
        bottom: "20px",
        display: "inline-block",
      }}
    />
  );
};

const CarouselComponent: React.FC<CarouselComponentProps> = ({
  carouselData = [],
}) => {
  const [isSwipeable, setIsSwipeable] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSwipeable(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Carousel
      responsive={carouselResponsive}
      autoPlay
      infinite
      showDots
      arrows
      swipeable={isSwipeable}
      draggable={isSwipeable}
      customLeftArrow={<CustomLeftArrow />}
      customRightArrow={<CustomRightArrow />}
      customDot={<CustomDot />}
      rtl={false}
    >
      {carouselData.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "100%",
            height: "92vh",
            backgroundImage: `url(${item.imageUrls[3]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            px: { xs: 2, sm: 4, md: 8 },
            mt: { xs: "65px", md: 0 },
          }}
        >
          <Stack
            sx={{
              color: "#ffffff",
              maxWidth: "600px",
              ml: { xs: 5, md: 10, lg: 15 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "28px", sm: "48px", md: "58px" },
                letterSpacing: "0.2px",
                py: "15px",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                maxWidth: "400px",
                mx: { xs: "auto", md: "0" },
              }}
            >
              {item.short_description}
            </Typography>
            {item.sale_price && (
              <Typography
                variant="h5"
                fontWeight={700}
                fontSize={{ xs: "20px", sm: "22px", md: "24px" }}
                my="15px"
              >
                ₹ {item.sale_price}
              </Typography>
            )}
            <Link href={`/product/${item.id}`} passHref>
              <Button
                sx={{
                  backgroundColor: "#2dc071",
                  mt: "20px",
                  fontWeight: 700,
                  fontSize: { xs: "14px", sm: "16px", md: "18px" },
                  boxShadow: "none",
                  width: { xs: "150px", sm: "170px", md: "200px" },
                  height: { xs: "40px", sm: "45px", md: "50px" },
                  "&:hover": {
                    backgroundColor: "#28a961",
                  },
                }}
                size="large"
                variant="contained"
              >
                SHOP NOW
              </Button>
            </Link>
          </Stack>
        </Box>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
