import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Copy, Check, Eye } from "lucide-react";
import { toast } from "sonner";

interface WidgetConfig {
  federationId: string;
  federationName: string;
  mode: 'all' | 'own';
  discipline: string;
  region: string;
  style: 'list' | 'calendar' | 'cards';
  primaryColor: string;
}

interface WidgetBuilderProps {
  federationId: string;
  federationName: string;
}

const DISCIPLINES = [
  'Todos',
  'Natación',
  'Aguas Abiertas',
  'Waterpolo',
  'Natación Artística',
  'Salvamento y Socorrismo',
  'Saltos',
  'Triatlón'
];

const REGIONS = [
  'Todas',
  'Andalucía',
  'Aragón',
  'Asturias',
  'Baleares',
  'Canarias',
  'Cantabria',
  'Castilla y León',
  'Castilla-La Mancha',
  'Cataluña',
  'Comunidad Valenciana',
  'Extremadura',
  'Galicia',
  'La Rioja',
  'Madrid',
  'Murcia',
  'Navarra',
  'País Vasco'
];

export default function WidgetBuilder({ federationId, federationName }: WidgetBuilderProps) {
  const [config, setConfig] = useState<WidgetConfig>({
    federationId,
    federationName,
    mode: 'all',
    discipline: 'Todos',
    region: 'Todas',
    style: 'list',
    primaryColor: '#0ea5e9'
  });

  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    const params = new URLSearchParams({
      fed: config.federationId,
      mode: config.mode,
      ...(config.discipline !== 'Todos' && { discipline: config.discipline }),
      ...(config.region !== 'Todas' && { region: config.region }),
      style: config.style,
      color: config.primaryColor.replace('#', '')
    });

    const widgetUrl = `${window.location.origin}/widget/calendar?${params.toString()}`;
    
    return `<iframe src="${widgetUrl}" width="100%" height="600" frameborder="0" style="border: none; border-radius: 8px;"></iframe>`;
  };

  const copyEmbedCode = () => {
    const code = generateEmbedCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Código copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const openPreview = () => {
    const params = new URLSearchParams({
      fed: config.federationId,
      mode: config.mode,
      ...(config.discipline !== 'Todos' && { discipline: config.discipline }),
      ...(config.region !== 'Todas' && { region: config.region }),
      style: config.style,
      color: config.primaryColor.replace('#', '')
    });

    window.open(`/widget/calendar?${params.toString()}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurador de Widget</CardTitle>
          <CardDescription>
            Personaliza tu calendario embebible y copia el código para tu sitio web
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Display Mode */}
          <div className="space-y-2">
            <Label htmlFor="mode">Modo de Visualización</Label>
            <Select
              value={config.mode}
              onValueChange={(value: 'all' | 'own') => setConfig({ ...config, mode: value })}
            >
              <SelectTrigger id="mode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  Todos los eventos (destacar los nuestros)
                </SelectItem>
                <SelectItem value="own">
                  Solo nuestros eventos
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {config.mode === 'all' 
                ? '✅ Recomendado: Muestra todos los eventos y destaca los tuyos. Ideal si tienes pocos eventos.'
                : 'Muestra únicamente tus eventos. Ideal si tienes 20+ eventos.'}
            </p>
          </div>

          {/* Discipline Filter */}
          <div className="space-y-2">
            <Label htmlFor="discipline">Disciplina</Label>
            <Select
              value={config.discipline}
              onValueChange={(value) => setConfig({ ...config, discipline: value })}
            >
              <SelectTrigger id="discipline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DISCIPLINES.map((discipline) => (
                  <SelectItem key={discipline} value={discipline}>
                    {discipline}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Filtra eventos por disciplina específica
            </p>
          </div>

          {/* Region Filter */}
          <div className="space-y-2">
            <Label htmlFor="region">Región</Label>
            <Select
              value={config.region}
              onValueChange={(value) => setConfig({ ...config, region: value })}
            >
              <SelectTrigger id="region">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Filtra eventos por comunidad autónoma
            </p>
          </div>

          {/* Visual Style */}
          <div className="space-y-2">
            <Label htmlFor="style">Estilo Visual</Label>
            <Select
              value={config.style}
              onValueChange={(value: 'list' | 'calendar' | 'cards') => setConfig({ ...config, style: value })}
            >
              <SelectTrigger id="style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">Lista</SelectItem>
                <SelectItem value="calendar">Calendario</SelectItem>
                <SelectItem value="cards">Tarjetas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Primary Color */}
          <div className="space-y-2">
            <Label htmlFor="color">Color Principal</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                className="flex-1"
                placeholder="#0ea5e9"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Personaliza el color para que coincida con tu marca
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button onClick={openPreview} variant="outline" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
            </Button>
            <Button onClick={copyEmbedCode} className="flex-1">
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Código
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Embed Code Display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Código para Incrustar</CardTitle>
          <CardDescription>
            Copia este código y pégalo en tu sitio web donde quieras mostrar el calendario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-x-auto text-sm">
            <code>{generateEmbedCode()}</code>
          </pre>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 font-medium mb-2">
              📋 Instrucciones de Instalación:
            </p>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Copia el código de arriba</li>
              <li>Pégalo en el HTML de tu sitio web</li>
              <li>¡El calendario aparecerá automáticamente!</li>
              <li>Puedes cambiar la configuración en cualquier momento</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
