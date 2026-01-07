import { useLanguage } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "#about-us" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.gallery, href: "#gallery" },
    { label: t.nav.hours, href: "#hours" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl mb-3">Hoby Rail</h3>
            <p className="text-sm text-primary-foreground/70">{t.footer.description}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.navigation}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.contact.label}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="tel:+41791918511"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  +41 79 191 85 11
                </a>
              </li>
              <li>
                <a
                  href="mailto:admin@hobyrail.ch"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  admin@hobyrail.ch
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Hoby Rail. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
