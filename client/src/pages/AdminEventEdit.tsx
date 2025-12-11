import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function AdminEventEdit() {
  const [, params] = useRoute("/admin/events/:id");
  const [, setLocation] = useLocation();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState<any>({});
  const [generating, setGenerating] = useState(false);

  const isAdmin = user?.role === "admin";
  const eventId = params?.id || "";

  const { data: eventData, isLoading, error } = trpc.events.getById.useQuery(
    { id: eventId },
    { enabled: isAdmin && !!eventId }
  );

  const updateMutation = trpc.events.updateEvent.useMutation({
    onSuccess: () => {
      toast.success("Evento actualizado");
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const generateDescriptionMutation = trpc.events.generateDescription.useMutation({
    onSuccess: (data) => {
      toast.success("Descripción generada con IA");
      setFormData((prev: any) => ({
        ...prev,
        "description.es": data.description.es,
        "description.en": data.description.en,
      }));
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  useEffect(() => {
    // Handle both response structures: direct event or wrapped in success object
    const event = eventData?.event;
    if (event && event._id) {
      setFormData({
        "name.es": event.name?.es || "",
        "name.en": event.name?.en || "",
        "description.es": event.description?.es || "",
        "description.en": event.description?.en || "",
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : "",
        endDate: event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : "",
        "location.city": event.location?.city || "",
        "location.region": event.location?.region || "",
        "location.country": event.location?.country || "España",
        discipline: event.discipline || "",
        sport: event.sport || "",
        category: event.category || "",
        organizerType: event.organizerType || "",
        registrationUrl: event.registrationUrl || "",
        websiteUrl: event.websiteUrl || "",
      });
    }
  }, [eventData]);

  if (authLoading || isLoading) return <div className="container py-8">Cargando...</div>;

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (!isAdmin) {
    return <div className="container py-8">No tienes permisos.</div>;
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updates: any = {};
    
    // Build nested objects
    if (formData["name.es"] || formData["name.en"]) {
      updates.name = {
        es: formData["name.es"] || "",
        en: formData["name.en"] || "",
      };
    }
    
    if (formData["description.es"] || formData["description.en"]) {
      updates.description = {
        es: formData["description.es"] || "",
        en: formData["description.en"] || "",
      };
    }
    
    if (formData["location.city"] || formData["location.region"]) {
      updates.location = {
        city: formData["location.city"] || "",
        region: formData["location.region"] || "",
        country: formData["location.country"] || "España",
      };
    }
    
    // Simple fields
    ["date", "endDate", "discipline", "sport", "category", "organizerType", "registrationUrl", "websiteUrl"].forEach(field => {
      if (formData[field]) {
        updates[field] = formData[field];
      }
    });

    updateMutation.mutate({ eventId, updates });
  };

  const handleGenerateDescription = () => {
    setGenerating(true);
    generateDescriptionMutation.mutate({ eventId }, {
      onSettled: () => setGenerating(false),
    });
  };

  const isFieldMissing = (field: string) => !formData[field] || formData[field].trim() === "";

  return (
    <div className="container py-8">
      <Button variant="ghost" onClick={() => setLocation("/admin")} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Editar Evento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className={isFieldMissing("name.es") ? "text-red-500" : ""}>
                Nombre (Español) {isFieldMissing("name.es") && "*"}
              </Label>
              <Input
                value={formData["name.es"] || ""}
                onChange={(e) => handleChange("name.es", e.target.value)}
                className={isFieldMissing("name.es") ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label>Nombre (Inglés)</Label>
              <Input
                value={formData["name.en"] || ""}
                onChange={(e) => handleChange("name.en", e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Descripción</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGenerateDescription}
                disabled={generating}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {generating ? "Generando..." : "Generar con IA"}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Textarea
                placeholder="Descripción en español..."
                value={formData["description.es"] || ""}
                onChange={(e) => handleChange("description.es", e.target.value)}
                rows={6}
              />
              <Textarea
                placeholder="English description..."
                value={formData["description.en"] || ""}
                onChange={(e) => handleChange("description.en", e.target.value)}
                rows={6}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className={isFieldMissing("date") ? "text-red-500" : ""}>
                Fecha Inicio {isFieldMissing("date") && "*"}
              </Label>
              <Input
                type="date"
                value={formData.date || ""}
                onChange={(e) => handleChange("date", e.target.value)}
                className={isFieldMissing("date") ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label>Fecha Fin</Label>
              <Input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className={isFieldMissing("location.city") ? "text-red-500" : ""}>
                Ciudad {isFieldMissing("location.city") && "*"}
              </Label>
              <Input
                value={formData["location.city"] || ""}
                onChange={(e) => handleChange("location.city", e.target.value)}
                className={isFieldMissing("location.city") ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label className={isFieldMissing("location.region") ? "text-red-500" : ""}>
                Región {isFieldMissing("location.region") && "*"}
              </Label>
              <Input
                value={formData["location.region"] || ""}
                onChange={(e) => handleChange("location.region", e.target.value)}
                className={isFieldMissing("location.region") ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label>País</Label>
              <Input
                value={formData["location.country"] || "España"}
                onChange={(e) => handleChange("location.country", e.target.value)}
              />
            </div>
          </div>

          {/* Sport Info */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <Label>Disciplina</Label>
              <Input
                value={formData.discipline || ""}
                onChange={(e) => handleChange("discipline", e.target.value)}
                placeholder="Natación"
              />
            </div>
            <div>
              <Label>Deporte</Label>
              <Input
                value={formData.sport || ""}
                onChange={(e) => handleChange("sport", e.target.value)}
                placeholder="Natación"
              />
            </div>
            <div>
              <Label>Categoría</Label>
              <Input
                value={formData.category || ""}
                onChange={(e) => handleChange("category", e.target.value)}
                placeholder="Nacional"
              />
            </div>
            <div>
              <Label>Tipo Organizador</Label>
              <Select
                value={formData.organizerType || ""}
                onValueChange={(v) => handleChange("organizerType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="club">Club</SelectItem>
                  <SelectItem value="federación">Federación</SelectItem>
                  <SelectItem value="privado">Privado</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* URLs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>URL Inscripción</Label>
              <Input
                type="url"
                value={formData.registrationUrl || ""}
                onChange={(e) => handleChange("registrationUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>URL Sitio Web</Label>
              <Input
                type="url"
                value={formData.websiteUrl || ""}
                onChange={(e) => handleChange("websiteUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLocation("/admin")}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {updateMutation.isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
