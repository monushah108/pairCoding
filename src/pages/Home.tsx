import Demo from "@/components/Demo";
import Features from "@/components/features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowitWorks from "@/components/HowitWorks";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <Hero />
      <Features />
      <Testimonial />
      <Demo />
      <HowitWorks />
      <Footer />
    </div>
  );
}
