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
import { Edit, Trash2, Calendar } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function AdminBulkEdit() {
  const { user, loading, isAuthenticated } = useAuth();
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [bulkEditDialog, setBulkEditDialog] = useState(false);
  const [bulkEditField, setBulkEditField] = useState<"status" | "organizerType" | "date" | "">("");
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
      setSelectedEvents(new Set(events.map(e => e._id.toString())));
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
      field: bulkEditField,
      value: bulkEditValue,
    });
  };

  const handleBulkDelete = () => {
    if (!confirm(`¿Eliminar ${selectedEvents.size} eventos? Esta acción no se puede deshacer.`)) {
      return;
    }

    bulkDeleteMutation.mutate({
      eventIds: Array.from(selectedEvents),
    });
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edición Masiva de Eventos</h1>
          <p className="text-muted-foreground mt-1">
            {events.length} eventos totales • {selectedEvents.size} seleccionados
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setBulkEditDialog(true)}
            disabled={selectedEvents.size === 0}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Seleccionados
          </Button>
          <Button
            variant="destructive"
            onClick={handleBulkDelete}
            disabled={selectedEvents.size === 0}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar Seleccionados
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Checkbox
              checked={allSelected}
              onCheckedChange={toggleAll}
            />
            <span className="font-medium">Seleccionar todos</span>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p>Cargando eventos...</p>
          ) : events.length === 0 ? (
            <p className="text-muted-foreground">No hay eventos publicados</p>
          ) : (
            <div className="space-y-2">
              {events.map((event) => (
                <div
                  key={event._id.toString()}
                  className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Checkbox
                    checked={selectedEvents.has(event._id.toString())}
                    onCheckedChange={() => toggleEvent(event._id.toString())}
                  />
                  <div className="flex-1 grid grid-cols-4 gap-4">
                    <div>
                      <p className="font-medium">{event.name?.es || event.name?.en}</p>
                      <p className="text-sm text-muted-foreground">{event.location?.city}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(event.date).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm capitalize">{event.organizerType || "N/A"}</span>
                    </div>
                    <div>
                      <span className="text-sm">{event.sport}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={bulkEditDialog} onOpenChange={setBulkEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar {selectedEvents.size} eventos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Campo a editar</Label>
              <Select value={bulkEditField} onValueChange={(v: any) => setBulkEditField(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un campo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organizerType">Tipo de Organizador</SelectItem>
                  <SelectItem value="status">Estado</SelectItem>
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
                    <SelectItem value="federation">Federación</SelectItem>
                    <SelectItem value="private">Privado</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
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
            <Button onClick={handleBulkUpdate}>
              Actualizar {selectedEvents.size} eventos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
