import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Eye, Code2, Palette, Globe, Filter } from "lucide-react";
import { toast } from "sonner";

export default function WidgetBuilder() {
  const { user, isAuthenticated } = useAuth();
  
  // Widget configuration state
  const [config, setConfig] = useState({
    mode: 'all' as 'all' | 'own',
    style: 'list' as 'list' | 'calendar' | 'cards',
    color: '0ea5e9',
    lang: 'es' as 'es' | 'ca' | 'eu' | 'gl' | 'va' | 'en',
    discipline: '',
    region: '',
    federationId: '',
  });

  const baseUrl = window.location.origin;
  const widgetUrl = `${baseUrl}/widget/calendar?mode=${config.mode}&style=${config.style}&color=${config.color}&lang=${config.lang}${
    config.discipline ? `&discipline=${encodeURIComponent(config.discipline)}` : ''
  }${config.region ? `&region=${encodeURIComponent(config.region)}` : ''}${
    config.federationId ? `&fed=${encodeURIComponent(config.federationId)}` : ''
  }`;

  const embedCode = `<iframe
  src="${widgetUrl}"
  width="100%"
  height="600"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="AquaEvents Calendar Widget"
></iframe>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('¡Copiado al portapapeles!');
  };

  const presetColors = [
    { name: 'Azul Cielo', value: '0ea5e9' },
    { name: 'Azul Marino', value: '1e40af' },
    { name: 'Verde', value: '10b981' },
    { name: 'Naranja', value: 'f97316' },
    { name: 'Rojo', value: 'ef4444' },
    { name: 'Morado', value: '8b5cf6' },
    { name: 'Rosa', value: 'ec4899' },
    { name: 'Gris', value: '64748b' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Constructor de Widget
          </h1>
          <p className="text-slate-600">
            Personaliza y genera el código de tu calendario embebible
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Configuración Visual
              </h2>

              <div className="space-y-4">
                {/* Display Style */}
                <div>
                  <Label htmlFor="style">Estilo de Visualización</Label>
                  <Select
                    value={config.style}
                    onValueChange={(value) => setConfig({ ...config, style: value as any })}
                  >
                    <SelectTrigger id="style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list">Lista (Vertical)</SelectItem>
                      <SelectItem value="cards">Tarjetas (Grid)</SelectItem>
                      <SelectItem value="calendar">Calendario (Por Mes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Color Picker */}
                <div>
                  <Label>Color Principal</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {presetColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setConfig({ ...config, color: color.value })}
                        className={`h-10 rounded-lg border-2 transition-all ${
                          config.color === color.value
                            ? 'border-slate-900 scale-105'
                            : 'border-slate-200 hover:border-slate-400'
                        }`}
                        style={{ backgroundColor: `#${color.value}` }}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Input
                      type="text"
                      value={config.color}
                      onChange={(e) => setConfig({ ...config, color: e.target.value.replace('#', '') })}
                      placeholder="Código hex (sin #)"
                      className="flex-1"
                    />
                    <div
                      className="w-12 h-10 rounded border-2 border-slate-200"
                      style={{ backgroundColor: `#${config.color}` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Idioma
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="lang">Idioma del Widget</Label>
                  <Select
                    value={config.lang}
                    onValueChange={(value) => setConfig({ ...config, lang: value as any })}
                  >
                    <SelectTrigger id="lang">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">🇪🇸 Español</SelectItem>
                      <SelectItem value="ca">🇨🇦 Català</SelectItem>
                      <SelectItem value="eu">🇪🇺 Euskara</SelectItem>
                      <SelectItem value="gl">🇬🇱 Galego</SelectItem>
                      <SelectItem value="va">🇻🇦 Valencià</SelectItem>
                      <SelectItem value="en">🇬🇧 English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros de Contenido
              </h2>

              <div className="space-y-4">
                {/* Display Mode */}
                <div>
                  <Label htmlFor="mode">Modo de Visualización</Label>
                  <Select
                    value={config.mode}
                    onValueChange={(value) => setConfig({ ...config, mode: value as any })}
                  >
                    <SelectTrigger id="mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los eventos</SelectItem>
                      <SelectItem value="own">Solo eventos propios</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-slate-500 mt-1">
                    En modo "propios", se resaltarán los eventos de tu federación
                  </p>
                </div>

                {/* Federation ID */}
                {config.mode === 'own' && (
                  <div>
                    <Label htmlFor="federationId">ID de Federación</Label>
                    <Input
                      id="federationId"
                      type="text"
                      value={config.federationId}
                      onChange={(e) => setConfig({ ...config, federationId: e.target.value })}
                      placeholder="Ej: RFEN, Federación Catalana"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Nombre de tu federación para filtrar eventos
                    </p>
                  </div>
                )}

                {/* Discipline Filter */}
                <div>
                  <Label htmlFor="discipline">Disciplina (opcional)</Label>
                  <Input
                    id="discipline"
                    type="text"
                    value={config.discipline}
                    onChange={(e) => setConfig({ ...config, discipline: e.target.value })}
                    placeholder="Ej: natacion, triatlón, waterpolo"
                  />
                </div>

                {/* Region Filter */}
                <div>
                  <Label htmlFor="region">Región (opcional)</Label>
                  <Input
                    id="region"
                    type="text"
                    value={config.region}
                    onChange={(e) => setConfig({ ...config, region: e.target.value })}
                    placeholder="Ej: Cataluña, Madrid, Galicia"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Preview & Code Panel */}
          <div className="space-y-6">
            <Card className="p-6">
              <Tabs defaultValue="preview">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Vista Previa
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Código
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-4">
                  <div className="bg-slate-100 rounded-lg p-4">
                    <iframe
                      src={widgetUrl}
                      className="w-full h-[500px] rounded-lg bg-white"
                      title="Widget Preview"
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => window.open(widgetUrl, '_blank')}
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Abrir en Nueva Pestaña
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Código HTML para Embed</Label>
                      <div className="relative mt-2">
                        <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
                          {embedCode}
                        </pre>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(embedCode)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label>URL Directa del Widget</Label>
                      <div className="relative mt-2">
                        <Input
                          value={widgetUrl}
                          readOnly
                          className="pr-20 font-mono text-xs"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-1 right-1"
                          onClick={() => copyToClipboard(widgetUrl)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-2">
                        📋 Instrucciones de Uso
                      </h3>
                      <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                        <li>Copia el código HTML de arriba</li>
                        <li>Pégalo en tu página web donde quieras mostrar el calendario</li>
                        <li>Ajusta el height (altura) según tus necesidades</li>
                        <li>¡El widget se actualizará automáticamente con nuevos eventos!</li>
                      </ol>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
              <h3 className="font-semibold text-slate-900 mb-3">
                💡 Consejos Rápidos
              </h3>
              <ul className="text-sm text-slate-700 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    <strong>Modo "Propios":</strong> Resalta tus eventos con un borde de color
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    <strong>Idiomas:</strong> Elige el idioma de tu región para mayor conexión
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    <strong>Estilo Cards:</strong> Ideal para páginas anchas con mucho espacio
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-600 font-bold">•</span>
                  <span>
                    <strong>Estilo Lista:</strong> Perfecto para sidebars y páginas estrechas
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
