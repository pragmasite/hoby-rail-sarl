import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const Header = () => {
  const { t, otherLanguages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.about, href: "#about-us" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.hours, href: "#hours" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Hoby Rail" className="h-12 w-auto" />
          <div className="hidden sm:flex flex-col">
            <span
              className={`font-serif text-lg font-bold transition-colors ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              Hoby Rail
            </span>
            <span
              className={`text-xs tracking-widest transition-colors ${
                isScrolled ? "text-muted-foreground" : "text-white/70"
              }`}
            >
              {t.nav.profession}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {otherLanguages.map((item) => (
              <Link
                key={item.lang}
                to={item.path}
                className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
                  isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.lang.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Call Button - Desktop */}
          <Button
            asChild
            size="sm"
            className="hidden md:flex"
          >
            <a href="tel:+41791918511">
              <Phone className="h-4 w-4 mr-2" />
              {t.nav.call}
            </a>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden bg-background border-t shadow-soft"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded"
              >
                {link.label}
              </a>
            ))}

            {/* Language Switcher - Mobile */}
            <div className="px-4 py-2 border-t mt-4 pt-4">
              <p className="text-xs text-muted-foreground mb-2 font-medium">Language</p>
              <div className="flex gap-2">
                {otherLanguages.map((item) => (
                  <Link
                    key={item.lang}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm px-3 py-1 rounded bg-muted hover:bg-muted/80"
                  >
                    {item.lang.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>

            {/* Call Button - Mobile */}
            <Button asChild size="sm" className="w-full mt-4">
              <a href="tel:+41791918511">
                <Phone className="h-4 w-4 mr-2" />
                {t.nav.call}
              </a>
            </Button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
