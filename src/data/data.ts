export const navLinks = ["HOME", "SHOP", "ABOUT", "CONTACT"];

export const footerLinks = [
  {
    title: "Company Info",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Legal",
    links: ["About Us", "Carrier", "We are hiring", "Blog"],
  },
  {
    title: "Features",
    links: [
      "Business Marketing",
      "User Analytic",
      "Live Chat",
      "Unlimited Support",
    ],
  },
  {
    title: "Resources",
    links: ["IOS & Android", "Watch a Demo", "Customers", "API"],
  },
];

export const carouselResponsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 1 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

export const posts = [
  {
    id: 1,
    image: "/images/post1.jpeg",
    tag: "Google",
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    id: 2,
    image: "/images/post2.jpeg",
    tag: "Google",
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
  {
    id: 3,
    image: "/images/post3.jpeg",
    tag: "Google",
    title: "Loudest à la Madison #1 (L'integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
  },
];

export const usersInfo = [
  { number: "15K", tag: "Happy Customers" },
  { number: "150K", tag: "Monthly Visitors" },
  { number: "15", tag: "Countries Worldwide" },
  { number: "100+", tag: "Top Partners" },
];

export const team = [
  {
    imageUrl: "/images/team1.jpg",
    username: "John Doe",
    profession: "Project Manager",
  },
  {
    imageUrl: "/images/team2.jpg",
    username: "Karen Page",
    profession: "Senior Software Developer",
  },
  {
    imageUrl: "/images/team3.jpg",
    username: "Jessica Jones",
    profession: "Software Developer",
  },
];

export const companies = [
  "/images/company1.png",
  "/images/company2.png",
  "/images/company3.png",
  "/images/company4.png",
  "/images/company5.png",
  "/images/company6.png",
];

export const contactFormData = [
  { label: "Your Name", field: "name" },
  { label: "Email Address", field: "email" },
];

export const shopCarouselResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 5,
    slidesToSlide: 1,
  },
  laptop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
