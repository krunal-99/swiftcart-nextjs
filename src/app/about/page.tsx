import AboutHero from "@/sections/AboutHero";
import Companies from "@/sections/Companies";
import Contact from "@/sections/Contact";
import StoreVideo from "@/sections/StoreVideo";
import Team from "@/sections/Team";
import UsersInfo from "@/sections/UsersInfo";
import { Box } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box mt={{ xs: "50px", md: 0 }}>
      <AboutHero />
      <UsersInfo />
      <StoreVideo />
      <Team />
      <Companies />
      <Contact />
    </Box>
  );
};

export default About;
