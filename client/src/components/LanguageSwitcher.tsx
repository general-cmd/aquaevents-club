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
  { code: "es", name: "Español", flag: "🇪🇸", short: "ES" },
  { code: "ca", name: "Català", flag: "🏴󠁥󠁳󠁣󠁴󠁿", fallback: "CAT", short: "CAT" },
  { code: "eu", name: "Euskara", flag: "🏴󠁥󠁳󠁰󠁶󠁿", fallback: "EUS", short: "EUS" },
  { code: "gl", name: "Galego", flag: "🏴󠁥󠁳󠁧󠁡󠁿", fallback: "GAL", short: "GAL" },
  { code: "va", name: "Valencià", flag: "🏴󠁥󠁳󠁶󠁣󠁿", fallback: "VAL", short: "VAL" },
  { code: "en", name: "English", flag: "🇬🇧", short: "EN" },
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
          <span className="text-base">
            {currentLanguage.flag}
          </span>
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
            <span className="mr-2 text-base">
              {lang.flag}
            </span>
            <span className="text-sm">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
