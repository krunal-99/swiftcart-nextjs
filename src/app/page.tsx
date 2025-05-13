import HeroSection from "@/sections/HeroSection";
import Categories from "@/sections/Categories";
import Products from "@/sections/Products";
import Advertisement from "@/sections/Advertisement";
import Featured from "@/sections/Featured";
import BestPosts from "@/sections/BestPosts";
export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <Products />
      <Advertisement />
      <Featured />
      <BestPosts />
    </>
  );
}
