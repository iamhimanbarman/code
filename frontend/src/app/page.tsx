import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Journey from "@/components/sections/Journey";
import Architecture from "@/components/sections/Architecture";
import AIEngine from "@/components/sections/AIEngine";
import Roadmap from "@/components/sections/Roadmap";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-grid" />
      <div className="bg-mesh" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Journey />
        <Architecture />
        <AIEngine />
        <Roadmap />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
