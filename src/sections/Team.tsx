import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { team } from "../data/data";
import Link from "next/link";

const Team = () => {
  return (
    <Container sx={{ my: "75px" }}>
      <Stack textAlign="center">
        <Typography color="#252b42" fontWeight={700} variant="h4" mb="10px">
          Meet Our Team
        </Typography>
        <Typography
          color="#737373"
          fontWeight={500}
          variant="body2"
          width={{ xs: "80%", md: "600px" }}
          margin="auto"
        >
          We are constantly working in order to make your experience better and
          provide the best service which could not be found elsewhere with the
          help of the best talents.
        </Typography>
      </Stack>
      <Grid container my="75px" gap={3} justifyContent="center">
        {team.map((member, idx) => (
          <Card sx={{ maxWidth: 325 }} key={idx}>
            <CardMedia component="img" height="230px" image={member.imageUrl} />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="body1"
                mt="30px"
                color="#252b42"
                fontWeight={700}
              >
                {member.username}
              </Typography>
              <Typography
                variant="body2"
                py="10px"
                color="#737373"
                fontWeight={700}
              >
                {member.profession}
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                pb="30px"
                pt="10px"
                sx={{ cursor: "pointer" }}
              >
                <Link href="https://www.instagram.com/" target="_blank">
                  <FacebookIcon sx={{ color: "#335bf5" }} />
                </Link>
                <Link href="https://www.instagram.com/" target="_blank">
                  <InstagramIcon sx={{ color: "#e51f5a" }} />
                </Link>
                <Link href="https://www.x.com/" target="_blank" color="primary">
                  <XIcon />
                </Link>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Team;
