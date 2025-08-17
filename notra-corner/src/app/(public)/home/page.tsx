import { Footer } from "@/components/footer/footer-app";
import { Header } from "@/components/header/header-LP/header";
import { motion } from "framer-motion";
import { HeroSectionHome } from "./(sections)/hero";
import { FirstSectionHome } from "./(sections)/first-section";
import { SecondSectionHome } from "./(sections)/second-section";
import { ThirdSection } from "./(sections)/third-section";

export default function Home() {
  return (
    <div className="relative overflow-hidden dark:bg-neutral-950">
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundSize: "200% 200%" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <Header />
      <main className="relative z-10 min-h-screen flex flex-col items-center px-6 pt-10">
        <HeroSectionHome />
        <FirstSectionHome />
        <SecondSectionHome />
        <ThirdSection />
      </main>

      <Footer />
    </div>
  );
}
