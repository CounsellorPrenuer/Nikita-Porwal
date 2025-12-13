import { ServicesSection } from "../ServicesSection";
import { ThemeProvider } from "@/lib/theme-context";

export default function ServicesSectionExample() {
  return (
    <ThemeProvider>
      <ServicesSection />
    </ThemeProvider>
  );
}
