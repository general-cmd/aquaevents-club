import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { toast } from "sonner";
import { Edit, Trash2, Calendar, ExternalLink, Sparkles } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function AdminBulkEdit() {
  const { user, loading, isAuthenticated } = useAuth();
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const generateDescriptionMutation = trpc.events.generateDescription.useMutation();

  const isAdmin = user?.role === "admin";

  const { data: eventsData, isLoading, refetch } = trpc.events.list.useQuery(
    { limit: 500 },
    { enabled: isAdmin }
  );



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
                onClick={() => {
                  if (selectedEvents.size === 1) {
                    const eventId = Array.from(selectedEvents)[0];
                    window.open(`/admin/events/${eventId}`, '_blank');
                  } else {
                    toast.info('Selecciona solo 1 evento para editar individualmente');
                  }
                }}
                disabled={selectedEvents.size === 0}
                variant="default"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Individual ({selectedEvents.size})
              </Button>
              <Button
                onClick={() => {
                  if (selectedEvents.size === 0) {
                    toast.error('Selecciona al menos un evento');
                    return;
                  }
                  if (!confirm(`¿Generar descripciones IA para ${selectedEvents.size} eventos?`)) return;
                  
                  let completed = 0;
                  selectedEvents.forEach(eventId => {
                    generateDescriptionMutation.mutate({ eventId }, {
                      onSuccess: () => {
                        completed++;
                        if (completed === selectedEvents.size) {
                          toast.success(`${completed} descripciones generadas`);
                          setSelectedEvents(new Set());
                          refetch();
                        }
                      }
                    });
                  });
                }}
                disabled={selectedEvents.size === 0}
                variant="outline"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generar IA ({selectedEvents.size})
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


    </div>
  );
}
