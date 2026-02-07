import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import TrendingNow from "@/components/TrendingNow";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Categories />
        <FeaturedProducts />
        <TrendingNow />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
