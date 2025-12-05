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
  { code: "ca", name: "Català", flag: "CAT", short: "CAT" },
  { code: "eu", name: "Euskara", flag: "EUS", short: "EUS" },
  { code: "gl", name: "Galego", flag: "GAL", short: "GAL" },
  { code: "va", name: "Valencià", flag: "VAL", short: "VAL" },
  { code: "en", name: "English", flag: "🇬🇧", short: "EN" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {typeof currentLanguage.flag === 'string' && currentLanguage.flag.length <= 3 ? (
              <span className="font-semibold text-xs">{currentLanguage.flag}</span>
            ) : (
              currentLanguage.flag
            )} {currentLanguage.name}
          </span>
          <span className="sm:hidden">
            {typeof currentLanguage.flag === 'string' && currentLanguage.flag.length <= 3 ? (
              <span className="font-semibold text-xs">{currentLanguage.flag}</span>
            ) : (
              currentLanguage.flag
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={i18n.language === lang.code ? "bg-accent" : ""}
          >
            <span className="mr-2 font-semibold text-xs min-w-[32px]">
              {typeof lang.flag === 'string' && lang.flag.length <= 3 ? lang.flag : lang.flag}
            </span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
