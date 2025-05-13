import { companies } from "@/data/data";
import { Box, Container, Stack, Typography } from "@mui/material";

const Companies = () => {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "#fafafa", textAlign: "center", pt: "80px" }}
      >
        <Stack>
          <Typography color="#252b42" fontWeight={700} variant="h4">
            Big Companies Are Here
          </Typography>
          <Typography
            variant="body1"
            color="#737373"
            fontWeight={500}
            width={{ xs: "80%", md: "600px" }}
            margin="auto"
            py="30px"
          >
            Trusted by top companies across industries to create innovative
            solutions. Transforming ideas into reality with expertise, passion,
            and excellence.
          </Typography>
        </Stack>
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
      </Container>
    </div>
  );
};

export default Companies;
