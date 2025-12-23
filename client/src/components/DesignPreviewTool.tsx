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
      { name: "Azul Royal", hex: "#0066CC" },
      { name: "Rojo", hex: "#CC0000" },
      { name: "Negro", hex: "#000000" },
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Amarillo", hex: "#FFD700" },
      { name: "Verde", hex: "#00AA00" },
      { name: "Rosa", hex: "#FF69B4" },
      { name: "Naranja", hex: "#FF8C00" },
      { name: "Morado", hex: "#9370DB" },
      { name: "Azul Claro", hex: "#87CEEB" },
    ],
  },
  latex: {
    name: "Látex",
    colors: [
      { name: "Verde", hex: "#00AA00" },
      { name: "Azul", hex: "#0066CC" },
      { name: "Rojo", hex: "#CC0000" },
      { name: "Amarillo", hex: "#FFD700" },
      { name: "Negro", hex: "#000000" },
      { name: "Blanco", hex: "#FFFFFF" },
    ],
  },
  gamuza: {
    name: "Gamuza",
    colors: [
      { name: "Azul", hex: "#0066CC" },
      { name: "Negro", hex: "#000000" },
      { name: "Rojo", hex: "#CC0000" },
      { name: "Verde", hex: "#00AA00" },
      { name: "Blanco", hex: "#FFFFFF" },
    ],
  },
  "pelo-largo": {
    name: "Pelo Largo",
    colors: [
      { name: "Azul", hex: "#0066CC" },
      { name: "Negro", hex: "#000000" },
      { name: "Rosa", hex: "#FF69B4" },
      { name: "Morado", hex: "#9370DB" },
    ],
  },
  "tela-polyester": {
    name: "Tela Poliéster",
    colors: [
      { name: "Azul", hex: "#0066CC" },
      { name: "Rojo", hex: "#CC0000" },
      { name: "Negro", hex: "#000000" },
      { name: "Verde", hex: "#00AA00" },
    ],
  },
};

export default function DesignPreviewTool({ capType }: DesignPreviewToolProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const [capImage, setCapImage] = useState<HTMLImageElement | null>(null);
  const [logoScale, setLogoScale] = useState([80]);
  const [logoX, setLogoX] = useState([50]);
  const [logoY, setLogoY] = useState([50]);

  const template = CAP_TEMPLATES[capType as keyof typeof CAP_TEMPLATES];

  // Redraw when color changes
  useEffect(() => {
    drawPreview(null, logoImage);
  }, [selectedColor, template]);

  // Redraw when logo properties change
  useEffect(() => {
    drawPreview(null, logoImage);
  }, [logoScale, logoX, logoY, logoImage, selectedColor, template]);

  const drawPreview = (cap: HTMLImageElement | null, logo: HTMLImageElement | null) => {
    const canvas = canvasRef.current;
    if (!canvas || !template) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 600;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw cap shape (rounded dome)
    const capColor = template.colors[selectedColor].hex;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radiusX = 200;
    const radiusY = 120;

    // Draw cap dome
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = capColor;
    ctx.fill();
    
    // Add shadow for depth
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    
    // Add highlight
    const gradient = ctx.createRadialGradient(centerX - 50, centerY - 30, 20, centerX, centerY, radiusX);
    gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw cap rim
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + radiusY - 10, radiusX, 15, 0, 0, Math.PI);
    ctx.fillStyle = capColor;
    ctx.globalAlpha = 0.8;
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Draw logo if available
    if (logo) {
      const scale = logoScale[0] / 100;
      const maxLogoSize = canvas.width * 0.6; // Max 60% of canvas width for better visibility
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
