import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsCounter } from "@/components/StatsCounter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactForm } from "@/components/ContactForm";
import { PoweredBySection } from "@/components/PoweredBySection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsCounter />
      <TestimonialsSection />
      <ContactForm />
      <PoweredBySection />
    </main>
  );
}
