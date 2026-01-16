import { createFileRoute } from "@tanstack/react-router";
import Demo from "@/components/home/Demo";
import Features from "@/components/home/features";
import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";

import Testimonial from "@/components/home/Testimonial";
import Hero from "@/components/home/hero";
import HowWorks from "@/components/home/howWorks";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      <Hero />
      <Features />
      <Testimonial />
      <Demo />
      <HowWorks />
      <Footer />
    </div>
  );
}
