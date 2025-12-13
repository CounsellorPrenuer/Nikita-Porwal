import { ContactForm } from "../ContactForm";
import { ThemeProvider } from "@/lib/theme-context";

export default function ContactFormExample() {
  return (
    <ThemeProvider>
      <ContactForm />
    </ThemeProvider>
  );
}
