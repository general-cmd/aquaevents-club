import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Mail, Phone, Globe, CheckCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const DISCIPLINES = [
  "Natación",
  "Waterpolo",
  "Natación Sincronizada",
  "Saltos",
  "Aguas Abiertas",
  "Triatlón",
  "Salvamento y Socorrismo",
  "Otros"
];

const CATEGORIES = [
  "Absoluto",
  "Master",
  "Infantil",
  "Juvenil",
  "Junior",
  "Senior",
  "Veterano",
  "Todos"
];

const REGIONS = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Baleares",
  "Canarias",
  "Cantabria",
  "Castilla y León",
  "Castilla-La Mancha",
  "Cataluña",
  "Comunidad Valenciana",
  "Extremadura",
  "Galicia",
  "La Rioja",
  "Madrid",
  "Murcia",
  "Navarra",
  "País Vasco",
  "Nacional"
];

export default function SubmitEvent() {
  const [, setLocation] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    discipline: "",
    category: "",
    region: "",
    city: "",
    startDate: "",
    endDate: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    description: "",
  });

  const submitMutation = trpc.eventSubmissions.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("¡Evento enviado correctamente! Será revisado por nuestro equipo.");
    },
    onError: (error) => {
      toast.error("Error al enviar el evento: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.discipline || !formData.region || !formData.city || !formData.startDate || !formData.contactEmail) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    submitMutation.mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <img 
                    src="/logo.png" 
                    alt="AquaEvents.club" 
                    className="w-12 h-12 object-contain"
                  />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    AquaEvents.club
                  </span>
                </a>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/eventos">
                  <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Eventos
                  </a>
                </Link>
                <Link href="/federaciones">
                  <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Federaciones
                  </a>
                </Link>
                <Link href="/blog">
                  <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    Blog
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <section className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                ¡Evento Enviado Correctamente!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Gracias por enviar tu evento. Nuestro equipo lo revisará pronto y lo publicará en el calendario si cumple con nuestros criterios.
              </p>
              <p className="text-gray-600 mb-8">
                Recibirás una notificación por email cuando tu evento sea aprobado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/eventos">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                    Ver Eventos
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      title: "",
                      discipline: "",
                      category: "",
                      region: "",
                      city: "",
                      startDate: "",
                      endDate: "",
                      contactName: "",
                      contactEmail: "",
                      contactPhone: "",
                      website: "",
                      description: "",
                    });
                  }}
                >
                  Enviar Otro Evento
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.png" 
                  alt="AquaEvents.club" 
                  className="w-12 h-12 object-contain"
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/eventos">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Eventos
                </a>
              </Link>
              <Link href="/federaciones">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Federaciones
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Blog
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Enviar Evento Acuático
            </h1>
            <p className="text-lg text-gray-600">
              Comparte tu evento con la comunidad acuática española. Todos los eventos son revisados antes de publicarse.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información del Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Evento <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Ej: Campeonato de España de Natación 2026"
                    required
                  />
                </div>

                {/* Discipline & Category */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Disciplina <span className="text-red-500">*</span>
                    </label>
                    <Select value={formData.discipline} onValueChange={(value) => handleChange("discipline", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona disciplina" />
                      </SelectTrigger>
                      <SelectContent>
                        {DISCIPLINES.map(d => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Region & City */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Región <span className="text-red-500">*</span>
                    </label>
                    <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona región" />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONS.map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Ej: Barcelona"
                      required
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Fecha de Inicio <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleChange("startDate", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Fecha de Fin
                    </label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleChange("endDate", e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del Evento
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Describe el evento, requisitos de participación, premios, etc."
                    rows={4}
                  />
                </div>

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de Contacto
                      </label>
                      <Input
                        value={formData.contactName}
                        onChange={(e) => handleChange("contactName", e.target.value)}
                        placeholder="Nombre del organizador"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email de Contacto <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleChange("contactEmail", e.target.value)}
                        placeholder="contacto@ejemplo.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Teléfono de Contacto
                      </label>
                      <Input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleChange("contactPhone", e.target.value)}
                        placeholder="+34 600 000 000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        Sitio Web del Evento
                      </label>
                      <Input
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://ejemplo.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? "Enviando..." : "Enviar Evento"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setLocation("/eventos")}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                ℹ️ Proceso de Revisión
              </h3>
              <p className="text-sm text-blue-800">
                Todos los eventos enviados son revisados por nuestro equipo antes de publicarse. 
                Este proceso suele tardar entre 24-48 horas. Recibirás un email de confirmación 
                cuando tu evento sea aprobado y publicado en el calendario.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

