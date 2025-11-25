import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface CreateEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function CreateEventDialog({ open, onOpenChange, onSuccess }: CreateEventDialogProps) {
  const [formData, setFormData] = useState({
    nameEs: "",
    nameEn: "",
    descriptionEs: "",
    descriptionEn: "",
    date: "",
    endDate: "",
    time: "09:00",
    endTime: "",
    city: "",
    region: "",
    venue: "",
    address: "",
    discipline: "natacion",
    category: "regional",
    organizerType: "federation" as "federation" | "club" | "other",
    organizerName: "",
    contactEmail: "",
    contactPhone: "",
    contactWebsite: "",
    registrationUrl: "",
    maxCapacity: "",
    currentRegistrations: "",
  });

  const createMutation = trpc.events.create.useMutation({
    onSuccess: () => {
      toast.success("Evento creado correctamente");
      onSuccess();
      onOpenChange(false);
      // Reset form
      setFormData({
        nameEs: "",
        nameEn: "",
        descriptionEs: "",
        descriptionEn: "",
        date: "",
        endDate: "",
        time: "09:00",
        endTime: "",
        city: "",
        region: "",
        venue: "",
        address: "",
        discipline: "natacion",
        category: "regional",
        organizerType: "federation",
        organizerName: "",
        contactEmail: "",
        contactPhone: "",
        contactWebsite: "",
        registrationUrl: "",
        maxCapacity: "",
        currentRegistrations: "",
      });
    },
    onError: (error) => {
      toast.error("Error al crear evento: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nameEs || !formData.date || !formData.city || !formData.region || !formData.organizerName) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    createMutation.mutate({
      nameEs: formData.nameEs,
      nameEn: formData.nameEn || formData.nameEs,
      descriptionEs: formData.descriptionEs,
      descriptionEn: formData.descriptionEn,
      date: formData.date,
      endDate: formData.endDate || undefined,
      time: formData.time,
      endTime: formData.endTime || undefined,
      city: formData.city,
      region: formData.region,
      venue: formData.venue,
      address: formData.address,
      discipline: formData.discipline,
      category: formData.category,
      organizerType: formData.organizerType,
      organizerName: formData.organizerName,
      contactEmail: formData.contactEmail || undefined,
      contactPhone: formData.contactPhone || undefined,
      contactWebsite: formData.contactWebsite || undefined,
      registrationUrl: formData.registrationUrl || undefined,
      maxCapacity: formData.maxCapacity ? parseInt(formData.maxCapacity) : undefined,
      currentRegistrations: formData.currentRegistrations ? parseInt(formData.currentRegistrations) : undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear Nuevo Evento</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Información Básica</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nameEs">Nombre del Evento (Español) *</Label>
                <Input
                  id="nameEs"
                  value={formData.nameEs}
                  onChange={(e) => setFormData({ ...formData, nameEs: e.target.value })}
                  placeholder="Ej: Campeonato Nacional de Natación"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nameEn">Nombre del Evento (Inglés)</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  placeholder="Ej: National Swimming Championship"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="descriptionEs">Descripción (Español)</Label>
                <Textarea
                  id="descriptionEs"
                  value={formData.descriptionEs}
                  onChange={(e) => setFormData({ ...formData, descriptionEs: e.target.value })}
                  placeholder="Descripción del evento..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="descriptionEn">Descripción (Inglés)</Label>
                <Textarea
                  id="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  placeholder="Event description..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Fecha y Hora</h3>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="date">Fecha Inicio *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time">Hora Inicio</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Fecha Fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endTime">Hora Fin</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Ubicación</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ej: Madrid"
                  required
                />
              </div>
              <div>
                <Label htmlFor="region">Comunidad Autónoma *</Label>
                <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona región" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Andalucía">Andalucía</SelectItem>
                    <SelectItem value="Aragón">Aragón</SelectItem>
                    <SelectItem value="Asturias">Asturias</SelectItem>
                    <SelectItem value="Baleares">Baleares</SelectItem>
                    <SelectItem value="Canarias">Canarias</SelectItem>
                    <SelectItem value="Cantabria">Cantabria</SelectItem>
                    <SelectItem value="Castilla-La Mancha">Castilla-La Mancha</SelectItem>
                    <SelectItem value="Castilla y León">Castilla y León</SelectItem>
                    <SelectItem value="Cataluña">Cataluña</SelectItem>
                    <SelectItem value="Comunidad Valenciana">Comunidad Valenciana</SelectItem>
                    <SelectItem value="Extremadura">Extremadura</SelectItem>
                    <SelectItem value="Galicia">Galicia</SelectItem>
                    <SelectItem value="La Rioja">La Rioja</SelectItem>
                    <SelectItem value="Madrid">Madrid</SelectItem>
                    <SelectItem value="Murcia">Murcia</SelectItem>
                    <SelectItem value="Navarra">Navarra</SelectItem>
                    <SelectItem value="País Vasco">País Vasco</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="venue">Instalación/Recinto</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="Ej: Piscina Municipal"
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ej: Calle Principal 123"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Detalles del Evento</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discipline">Disciplina *</Label>
                <Select value={formData.discipline} onValueChange={(value) => setFormData({ ...formData, discipline: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natacion">Natación</SelectItem>
                    <SelectItem value="triatlon">Triatlón</SelectItem>
                    <SelectItem value="waterpolo">Waterpolo</SelectItem>
                    <SelectItem value="aguas-abiertas">Aguas Abiertas</SelectItem>
                    <SelectItem value="natacion-sincronizada">Natación Sincronizada</SelectItem>
                    <SelectItem value="saltos">Saltos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Organizer */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Organizador</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organizerType">Tipo de Organizador *</Label>
                <Select value={formData.organizerType} onValueChange={(value: any) => setFormData({ ...formData, organizerType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="federation">Federación</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="organizerName">Nombre del Organizador *</Label>
                <Input
                  id="organizerName"
                  value={formData.organizerName}
                  onChange={(e) => setFormData({ ...formData, organizerName: e.target.value })}
                  placeholder={formData.organizerType === 'federation' ? 'Ej: RFEN' : 'Ej: Club Natación Madrid'}
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Información de Contacto</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  placeholder="info@evento.com"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Teléfono</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <Label htmlFor="contactWebsite">Sitio Web</Label>
                <Input
                  id="contactWebsite"
                  type="url"
                  value={formData.contactWebsite}
                  onChange={(e) => setFormData({ ...formData, contactWebsite: e.target.value })}
                  placeholder="https://www.ejemplo.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="registrationUrl">URL de Inscripción</Label>
              <Input
                id="registrationUrl"
                type="url"
                value={formData.registrationUrl}
                onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                placeholder="https://inscripcion.ejemplo.com"
              />
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Capacidad (Opcional)</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxCapacity">Capacidad Máxima</Label>
                <Input
                  id="maxCapacity"
                  type="number"
                  value={formData.maxCapacity}
                  onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                  placeholder="Ej: 500"
                />
              </div>
              <div>
                <Label htmlFor="currentRegistrations">Inscritos Actuales</Label>
                <Input
                  id="currentRegistrations"
                  type="number"
                  value={formData.currentRegistrations}
                  onChange={(e) => setFormData({ ...formData, currentRegistrations: e.target.value })}
                  placeholder="Ej: 150"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? "Creando..." : "Crear Evento"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

