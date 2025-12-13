import { Link } from "wouter";
import { Mail, Phone, Linkedin, ArrowUp } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoImage from "@assets/eduvista-logo.jpg";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Student Development",
  "Parent Guidance",
  "Teacher Mentoring",
  "NEP-Aligned Growth",
];

export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-muted/50 border-t border-border/50 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <img src={logoImage} alt="EduVista Logo" className="h-14 w-auto" />
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                Transforming educational journeys through personalized counseling and 
                holistic development.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/nikita-porwal-802900282"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </a>
                <a
                  href="https://wa.me/919977777082"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon">
                    <SiWhatsapp className="w-4 h-4" />
                  </Button>
                </a>
                <a href="mailto:with.nikita@gmail.com">
                  <Button variant="ghost" size="icon">
                    <Mail className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      href="/services"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:with.nikita@gmail.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    with.nikita@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919977777082"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 99777 77082
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} EduVista. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Educational Counseling by Nikita Porwal
            </p>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        data-testid="button-back-to-top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <a
        href="https://wa.me/919977777082?text=Hi%20Nikita,%20I'm%20interested%20in%20learning%20more%20about%20EduVista's%20counseling%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center animate-pulse-glow"
        data-testid="button-whatsapp-float"
      >
        <SiWhatsapp className="w-7 h-7" />
      </a>
    </>
  );
}
