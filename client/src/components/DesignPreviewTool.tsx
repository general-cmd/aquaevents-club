import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, RotateCcw, Palette } from "lucide-react";
import { toast } from "sonner";

interface DesignPreviewToolProps {
  capType: string;
}

const CAP_TEMPLATES = {
  silicona: {
    name: "Silicona",
    colors: [
      { name: "Azul", hex: "#0066CC", image: "/gorro-silicona-azul.webp" },
      { name: "Rojo", hex: "#CC0000", image: "/gorro-silicona-rojo.webp" },
      { name: "Negro", hex: "#000000", image: "/gorro-silicona-negro.webp" },
      { name: "Blanco", hex: "#FFFFFF", image: "/gorro-silicona-blanco.webp" },
    ],
  },
  latex: {
    name: "Látex",
    colors: [
      { name: "Verde", hex: "#00AA00", image: "/gorro-latex-verde.webp" },
      { name: "Azul", hex: "#0066CC", image: "/gorro-latex-azul.webp" },
    ],
  },
  gamuza: {
    name: "Gamuza",
    colors: [
      { name: "Azul", hex: "#0066CC", image: "/gorro-gamuza-azul.webp" },
      { name: "Negro", hex: "#000000", image: "/gorro-gamuza-negro.webp" },
    ],
  },
  "pelo-largo": {
    name: "Pelo Largo",
    colors: [
      { name: "Azul", hex: "#0066CC", image: "/gorro-pelo-largo-azul-hero.webp" },
    ],
  },
  "tela-polyester": {
    name: "Tela Poliéster",
    colors: [
      { name: "Azul", hex: "#0066CC", image: "/gorro-lycra-hero.jpg" },
    ],
  },
};

export default function DesignPreviewTool({ capType }: DesignPreviewToolProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const [capImage, setCapImage] = useState<HTMLImageElement | null>(null);
  const [logoScale, setLogoScale] = useState([50]);
  const [logoX, setLogoX] = useState([50]);
  const [logoY, setLogoY] = useState([50]);

  const template = CAP_TEMPLATES[capType as keyof typeof CAP_TEMPLATES];

  // Load cap template image
  useEffect(() => {
    if (!template) return;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = template.colors[selectedColor].image;
    img.onload = () => {
      setCapImage(img);
      drawPreview(img, logoImage);
    };
  }, [selectedColor, template]);

  // Redraw when logo properties change
  useEffect(() => {
    if (capImage) {
      drawPreview(capImage, logoImage);
    }
  }, [logoScale, logoX, logoY, capImage, logoImage]);

  const drawPreview = (cap: HTMLImageElement | null, logo: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cap template
    if (cap) {
      const aspectRatio = cap.width / cap.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.width / aspectRatio;
      
      if (drawHeight > canvas.height) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * aspectRatio;
      }

      const x = (canvas.width - drawWidth) / 2;
      const y = (canvas.height - drawHeight) / 2;
      
      ctx.drawImage(cap, x, y, drawWidth, drawHeight);
    }

    // Draw logo if available
    if (logo) {
      const scale = logoScale[0] / 100;
      const maxLogoSize = canvas.width * 0.4; // Max 40% of canvas width
      const logoWidth = logo.width * scale * (maxLogoSize / logo.width);
      const logoHeight = logo.height * scale * (maxLogoSize / logo.width);

      const logoXPos = (canvas.width * logoX[0]) / 100 - logoWidth / 2;
      const logoYPos = (canvas.height * logoY[0]) / 100 - logoHeight / 2;

      ctx.drawImage(logo, logoXPos, logoYPos, logoWidth, logoHeight);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, sube un archivo de imagen válido");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setLogoImage(img);
        drawPreview(capImage, img);
        toast.success("Logo cargado correctamente");
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `gorro-preview-${Date.now()}.png`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success("Vista previa descargada");
    });
  };

  const handleReset = () => {
    setLogoImage(null);
    setLogoScale([50]);
    setLogoX([50]);
    setLogoY([50]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Diseño reiniciado");
  };

  if (!template) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-purple-600" />
          <CardTitle className="text-2xl">Herramienta de Vista Previa de Diseño</CardTitle>
        </div>
        <CardDescription>
          Sube tu logo y visualiza cómo quedará en el gorro antes de hacer el pedido
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview Canvas */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Vista Previa</Label>
            <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-gray-200">
              <canvas
                ref={canvasRef}
                className="w-full h-auto rounded-lg"
                style={{ maxWidth: "600px", maxHeight: "600px" }}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownload} className="flex-1" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Descargar
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Color Selection */}
            <div className="space-y-2">
              <Label htmlFor="capColor" className="text-base font-semibold">
                Color del Gorro
              </Label>
              <Select
                value={selectedColor.toString()}
                onValueChange={(value) => setSelectedColor(parseInt(value))}
              >
                <SelectTrigger id="capColor" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {template.colors.map((color, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="logoUpload" className="text-base font-semibold">
                Subir Logo
              </Label>
              <input
                ref={fileInputRef}
                id="logoUpload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12"
                variant="outline"
              >
                <Upload className="mr-2 h-4 w-4" />
                Seleccionar Logo
              </Button>
              <p className="text-xs text-gray-500">
                Formatos aceptados: PNG, JPG, SVG. Máximo 5MB.
              </p>
            </div>

            {/* Logo Controls */}
            {logoImage && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Tamaño del Logo: {logoScale[0]}%
                  </Label>
                  <Slider
                    value={logoScale}
                    onValueChange={setLogoScale}
                    min={10}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Posición Horizontal: {logoX[0]}%
                  </Label>
                  <Slider
                    value={logoX}
                    onValueChange={setLogoX}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Posición Vertical: {logoY[0]}%
                  </Label>
                  <Slider
                    value={logoY}
                    onValueChange={setLogoY}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Esta es una vista previa aproximada. El diseño final puede
                variar ligeramente. Te enviaremos una prueba digital para aprobación antes de la
                producción.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
