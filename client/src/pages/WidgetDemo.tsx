import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2 } from "lucide-react";

export default function WidgetDemo() {
  const baseUrl = window.location.origin;

  const examples = [
    {
      title: "Widget en Español - Vista Lista",
      description: "Calendario completo en español con vista de lista vertical",
      url: `${baseUrl}/widget/calendar?mode=all&style=list&color=0ea5e9&lang=es`,
      height: 600,
    },
    {
      title: "Widget en Català - Vista Tarjetas",
      description: "Calendario en catalán con diseño de tarjetas en grid",
      url: `${baseUrl}/widget/calendar?mode=all&style=cards&color=10b981&lang=ca`,
      height: 700,
    },
    {
      title: "Widget en Euskara - Vista Calendario",
      description: "Calendario en euskera agrupado por meses",
      url: `${baseUrl}/widget/calendar?mode=all&style=calendar&color=f97316&lang=eu`,
      height: 600,
    },
    {
      title: "Widget Filtrado - Solo Natación",
      description: "Muestra únicamente eventos de natación en Galicia",
      url: `${baseUrl}/widget/calendar?mode=all&style=list&color=8b5cf6&lang=gl&discipline=natacion&region=Galicia`,
      height: 500,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Ejemplos de Widget Embebible
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Explora diferentes configuraciones del calendario de eventos acuáticos
          </p>
          <Button asChild size="lg">
            <a href="/widget/builder">
              <Code2 className="w-5 h-5 mr-2" />
              Crear Tu Propio Widget
            </a>
          </Button>
        </div>

        {/* Examples Grid */}
        <div className="space-y-12">
          {examples.map((example, index) => (
            <Card key={index} className="p-6 shadow-lg">
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900 mb-1">
                      {example.title}
                    </h2>
                    <p className="text-slate-600">{example.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir
                    </a>
                  </Button>
                </div>
                <div className="mt-3 p-3 bg-slate-100 rounded text-xs font-mono text-slate-700 overflow-x-auto">
                  {example.url}
                </div>
              </div>

              {/* Embedded Widget */}
              <div className="bg-slate-50 rounded-lg p-4">
                <iframe
                  src={example.url}
                  className="w-full rounded-lg bg-white shadow-sm"
                  style={{ height: `${example.height}px` }}
                  title={example.title}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Integration Guide */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            🚀 Cómo Integrar el Widget en Tu Web
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                1. Configura tu widget
              </h3>
              <p className="text-slate-700 mb-2">
                Usa el <a href="/widget/builder" className="text-blue-600 hover:underline font-medium">Constructor de Widget</a> para personalizar:
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-1 ml-4">
                <li>Estilo visual (Lista, Tarjetas, Calendario)</li>
                <li>Color principal de tu marca</li>
                <li>Idioma (Español, Català, Euskara, Galego, Valencià, English)</li>
                <li>Filtros de disciplina y región</li>
                <li>Modo de visualización (todos los eventos o solo tuyos)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                2. Copia el código HTML
              </h3>
              <p className="text-slate-700 mb-2">
                El constructor genera automáticamente el código iframe:
              </p>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<iframe
  src="https://aquaevents.club/widget/calendar?..."
  width="100%"
  height="600"
  frameborder="0"
  style="border: none; border-radius: 8px;"
  title="AquaEvents Calendar Widget"
></iframe>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                3. Pégalo en tu página web
              </h3>
              <p className="text-slate-700">
                Inserta el código donde quieras mostrar el calendario. El widget es 100% responsive y se adapta automáticamente al ancho de su contenedor.
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                💡 Ventajas del Widget
              </h3>
              <ul className="text-blue-800 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Actualización automática:</strong> Los eventos se sincronizan en tiempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Multi-idioma:</strong> Conecta con federaciones regionales en su lengua</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Personalizable:</strong> Adapta colores y filtros a tu marca</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Responsive:</strong> Funciona perfectamente en móvil, tablet y desktop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Sin mantenimiento:</strong> No necesitas actualizar nada manualmente</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <a href="/widget/builder">
              <Code2 className="w-5 h-5 mr-2" />
              Crear Mi Widget Ahora
            </a>
          </Button>
          <p className="text-slate-600 mt-4">
            Gratis • Sin registro • Listo en 2 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
