import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Edit, Trash2, Calendar, ExternalLink } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function AdminBulkEdit() {
  const { user, loading, isAuthenticated } = useAuth();
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [bulkEditDialog, setBulkEditDialog] = useState(false);
  const [bulkEditField, setBulkEditField] = useState<string>("");
  const [bulkEditValue, setBulkEditValue] = useState("");

  const isAdmin = user?.role === "admin";

  const { data: eventsData, isLoading, refetch } = trpc.events.list.useQuery(
    { limit: 500 },
    { enabled: isAdmin }
  );

  const bulkUpdateMutation = trpc.events.bulkUpdate.useMutation({
    onSuccess: () => {
      toast.success(`${selectedEvents.size} eventos actualizados`);
      setSelectedEvents(new Set());
      setBulkEditDialog(false);
      setBulkEditField("");
      setBulkEditValue("");
      refetch();
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  const bulkDeleteMutation = trpc.events.bulkDelete.useMutation({
    onSuccess: () => {
      toast.success(`${selectedEvents.size} eventos eliminados`);
      setSelectedEvents(new Set());
      refetch();
    },
    onError: (error: any) => {
      toast.error("Error: " + error.message);
    },
  });

  if (loading) return <div className="container py-8">Cargando...</div>;

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="pt-6">
            <p>No tienes permisos para acceder a esta página.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const events = eventsData?.events || [];
  const allSelected = events.length > 0 && selectedEvents.size === events.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedEvents(new Set());
    } else {
      setSelectedEvents(new Set(events.map((e: any) => e._id?.toString() || e._id)));
    }
  };

  const toggleEvent = (id: string) => {
    const newSelected = new Set(selectedEvents);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEvents(newSelected);
  };

  const handleBulkUpdate = () => {
    if (!bulkEditField || !bulkEditValue) {
      toast.error("Selecciona un campo y valor");
      return;
    }

    bulkUpdateMutation.mutate({
      eventIds: Array.from(selectedEvents),
      field: bulkEditField as any,
      value: bulkEditValue,
    });
  };

  const handleBulkDelete = () => {
    if (selectedEvents.size === 0) {
      toast.error("Selecciona al menos un evento");
      return;
    }

    if (!confirm(`¿Eliminar ${selectedEvents.size} eventos? Esta acción no se puede deshacer.`)) {
      return;
    }

    bulkDeleteMutation.mutate({
      eventIds: Array.from(selectedEvents),
    });
  };

  const getEventName = (event: any) => {
    if (typeof event.name === 'string') return event.name;
    return event.name?.es || event.name?.en || 'Sin nombre';
  };

  const getEventLocation = (event: any) => {
    if (typeof event.location === 'string') return event.location;
    return event.location?.city || event.location?.region || 'N/A';
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Edición Masiva de Eventos</CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={() => setBulkEditDialog(true)}
                disabled={selectedEvents.size === 0}
                variant="default"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar ({selectedEvents.size})
              </Button>
              <Button
                onClick={handleBulkDelete}
                disabled={selectedEvents.size === 0}
                variant="destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar ({selectedEvents.size})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando eventos...</p>
          ) : events.length === 0 ? (
            <p>No hay eventos publicados</p>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-4 p-3 border-b font-medium">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                />
                <div className="flex-1 grid grid-cols-5 gap-4">
                  <div>Nombre</div>
                  <div>Fecha</div>
                  <div>Ubicación</div>
                  <div>Tipo</div>
                  <div>Deporte</div>
                </div>
              </div>
              {events.map((event: any) => {
                const eventId = event._id?.toString() || event._id;
                return (
                  <div
                    key={eventId}
                    className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Checkbox
                      checked={selectedEvents.has(eventId)}
                      onCheckedChange={() => toggleEvent(eventId)}
                    />
                    <div className="flex-1 grid grid-cols-5 gap-4">
                      <div>
                        <p className="font-medium text-sm">{getEventName(event)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {event.date ? new Date(event.date).toLocaleDateString("es-ES") : 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">{getEventLocation(event)}</span>
                      </div>
                      <div>
                        <span className="text-sm capitalize">{event.organizerType || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-sm">{event.sport || event.discipline || "N/A"}</span>
                      </div>
                    </div>
                    <a href={`/admin/events/${eventId}`} target="_blank" rel="noopener">
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={bulkEditDialog} onOpenChange={setBulkEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar {selectedEvents.size} eventos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Campo a editar</Label>
              <Select value={bulkEditField} onValueChange={setBulkEditField}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organizerType">Tipo de Organizador</SelectItem>
                  <SelectItem value="status">Estado</SelectItem>
                  <SelectItem value="discipline">Disciplina</SelectItem>
                  <SelectItem value="sport">Deporte</SelectItem>
                  <SelectItem value="category">Categoría</SelectItem>
                  <SelectItem value="date">Fecha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {bulkEditField === "organizerType" && (
              <div>
                <Label>Nuevo valor</Label>
                <Select value={bulkEditValue} onValueChange={setBulkEditValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="federación">Federación</SelectItem>
                    <SelectItem value="privado">Privado</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {bulkEditField === "status" && (
              <div>
                <Label>Nuevo estado</Label>
                <Select value={bulkEditValue} onValueChange={setBulkEditValue}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Próximo</SelectItem>
                    <SelectItem value="ongoing">En curso</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {bulkEditField === "discipline" && (
              <div>
                <Label>Nueva disciplina</Label>
                <Input
                  value={bulkEditValue}
                  onChange={(e) => setBulkEditValue(e.target.value)}
                  placeholder="Ej: Natación, Triatlón, Waterpolo"
                />
              </div>
            )}

            {bulkEditField === "sport" && (
              <div>
                <Label>Nuevo deporte</Label>
                <Input
                  value={bulkEditValue}
                  onChange={(e) => setBulkEditValue(e.target.value)}
                  placeholder="Ej: Natación, Triatlón"
                />
              </div>
            )}

            {bulkEditField === "category" && (
              <div>
                <Label>Nueva categoría</Label>
                <Input
                  value={bulkEditValue}
                  onChange={(e) => setBulkEditValue(e.target.value)}
                  placeholder="Ej: Nacional, Regional, Local"
                />
              </div>
            )}

            {bulkEditField === "date" && (
              <div>
                <Label>Nueva fecha</Label>
                <Input
                  type="date"
                  value={bulkEditValue}
                  onChange={(e) => setBulkEditValue(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleBulkUpdate} disabled={!bulkEditField || !bulkEditValue}>
              Actualizar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
