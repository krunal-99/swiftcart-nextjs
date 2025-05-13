import { Box } from "@mui/material";

const StoreVideo = () => {
  return (
    <Box width="80%" m="auto">
      <video
        src="/videos/ecommerce.mp4"
        width="100%"
        height="auto"
        muted
        controls
        loop
        autoPlay
        style={{ margin: "50px auto", borderRadius: "10px" }}
      ></video>
    </Box>
  );
};

export default StoreVideo;
