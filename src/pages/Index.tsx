import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedBooks from "@/components/FeaturedBooks";
import Categories from "@/components/Categories";
import SellBooksSection from "@/components/SellBooksSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedBooks />
        <Categories />
        <SellBooksSection />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
