import { Footer } from "../Footer";
import { ThemeProvider } from "@/lib/theme-context";

export default function FooterExample() {
  return (
    <ThemeProvider>
      <Footer />
    </ThemeProvider>
  );
}
