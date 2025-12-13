import { HeroSection } from "../HeroSection";
import { ThemeProvider } from "@/lib/theme-context";

export default function HeroSectionExample() {
  return (
    <ThemeProvider>
      <HeroSection />
    </ThemeProvider>
  );
}
