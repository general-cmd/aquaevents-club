import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  { code: "es", name: "Español", flag: "/flags/spain.svg", short: "ES" },
  { code: "ca", name: "Català", flag: "/flags/catalonia.svg", short: "CAT" },
  { code: "eu", name: "Euskara", flag: "/flags/basque.svg", short: "EUS" },
  { code: "gl", name: "Galego", flag: "/flags/galicia.svg", short: "GAL" },
  { code: "va", name: "Valencià", flag: "/flags/valencia.svg", short: "VAL" },
  { code: "en", name: "English", flag: "/flags/uk.svg", short: "EN" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    // Persist language choice
    localStorage.setItem("preferredLanguage", langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2 md:px-3">
          <Globe className="h-4 w-4" />
          <img 
            src={currentLanguage.flag} 
            alt={currentLanguage.name}
            className="h-4 w-6 object-cover rounded-sm"
          />
          <span className="hidden md:inline text-sm">
            {currentLanguage.name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={i18n.language === lang.code ? "bg-accent" : ""}
          >
            <img 
              src={lang.flag} 
              alt={lang.name}
              className="mr-2 h-4 w-6 object-cover rounded-sm"
            />
            <span className="text-sm">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
