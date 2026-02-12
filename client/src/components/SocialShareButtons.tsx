import { Facebook, Twitter, Linkedin, Link2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
}

export default function SocialShareButtons({
  url,
  title,
  description = "",
  hashtags = []
}: SocialShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.join(",");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Enlace copiado al portapapeles");
    } catch (err) {
      toast.error("Error al copiar el enlace");
    }
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtagString ? `&hashtags=${hashtagString}` : ""}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "share-dialog",
      "width=600,height=450,location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1"
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gray-300"></div>
        <span className="text-sm font-medium text-gray-600">Compartir este artículo</span>
        <div className="h-px flex-1 bg-gray-300"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.facebook)}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors"
        >
          <Facebook className="w-4 h-4" />
          <span className="hidden sm:inline">Facebook</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.twitter)}
          className="flex items-center gap-2 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600 transition-colors"
        >
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.linkedin)}
          className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareWindow(shareLinks.whatsapp)}
          className="flex items-center gap-2 hover:bg-green-50 hover:text-green-600 hover:border-green-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="flex items-center gap-2 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-700 transition-colors"
        >
          <Link2 className="w-4 h-4" />
          <span className="hidden sm:inline">Copiar enlace</span>
        </Button>
      </div>

      <p className="text-xs text-center text-gray-500">
        Ayúdanos a llegar a más nadadores compartiendo este contenido
      </p>
    </div>
  );
}
