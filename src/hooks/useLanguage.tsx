import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { translations, Language, TranslationStrings } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: TranslationStrings;
  otherLanguages: Array<{ lang: Language; path: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // Determine language from URL path
  let lang: Language = "fr";
  if (location.pathname.startsWith("/de")) {
    lang = "de";
  } else if (location.pathname.startsWith("/en")) {
    lang = "en";
  }

  const t = translations[lang];

  // Generate other language paths
  const otherLanguages: Array<{ lang: Language; path: string }> = [];
  const allLanguages: Language[] = ["fr", "de", "en"];

  allLanguages.forEach((langCode) => {
    if (langCode !== lang) {
      const path = langCode === "fr" ? "/" : `/${langCode}`;
      otherLanguages.push({ lang: langCode, path });
    }
  });

  return (
    <LanguageContext.Provider value={{ lang, t, otherLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
