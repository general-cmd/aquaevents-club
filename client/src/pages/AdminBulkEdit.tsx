import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Edit, Trash2, Calendar, ExternalLink, Sparkles, Filter, X } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function AdminBulkEdit() {
  const { user, loading, isAuthenticated } = useAuth();
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState({
    missingDescription: false,
    missingSEO: false,
    createdAfter: "",
    createdBefore: "",
  });
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

  // Move data processing before early returns to satisfy hooks rules
  const allEvents = eventsData?.events || [];
  
  // Apply filters
  const filteredEvents = useMemo(() => {
    let filtered = allEvents;
    
    if (filters.missingDescription) {
      filtered = filtered.filter((e: any) => {
        const desc = e.description;
        if (!desc) return true;
        if (typeof desc === 'string') return desc.trim().length === 0;
        return (!desc.es || desc.es.trim().length === 0) && (!desc.en || desc.en.trim().length === 0);
      });
    }
    
    if (filters.missingSEO) {
      filtered = filtered.filter((e: any) => {
        return !e.seo || !e.seo.metaDescription || !e.seo.canonical;
      });
    }
    
    if (filters.createdAfter) {
      const afterDate = new Date(filters.createdAfter);
      filtered = filtered.filter((e: any) => {
        if (!e.createdAt) return false;
        return new Date(e.createdAt) >= afterDate;
      });
    }
    
    if (filters.createdBefore) {
      const beforeDate = new Date(filters.createdBefore);
      beforeDate.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter((e: any) => {
        if (!e.createdAt) return false;
        return new Date(e.createdAt) <= beforeDate;
      });
    }
    
    return filtered;
  }, [allEvents, filters]);
  
  const events = filteredEvents;
  const allSelected = events.length > 0 && selectedEvents.size === events.length;
  const activeFiltersCount = Object.values(filters).filter(v => v && v !== "").length;

  // Early returns after all hooks
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

  const toggleAll = () => {
    if (allSelected) {
      setSelectedEvents(new Set());
    } else {
      setSelectedEvents(new Set(events.map((e: any) => e._id?.toString() || e._id)));
    }
  };
  
  const selectAllFiltered = () => {
    setSelectedEvents(new Set(events.map((e: any) => e._id?.toString() || e._id)));
    toast.success(`${events.length} eventos seleccionados`);
  };
  
  const clearFilters = () => {
    setFilters({
      missingDescription: false,
      missingSEO: false,
      createdAfter: "",
      createdBefore: "",
    });
    toast.info("Filtros eliminados");
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
    const city = event.location?.city || '';
    const region = event.location?.region;
    // Handle multilingual region object
    const regionStr = typeof region === 'string' ? region : (region?.es || region?.en || '');
    return city || regionStr || 'N/A';
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
          {/* Filters Section */}
          <Card className="mb-6 bg-muted/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <CardTitle className="text-lg">Filtros</CardTitle>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">{activeFiltersCount} activos</Badge>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <Button onClick={clearFilters} variant="ghost" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Limpiar Filtros
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Missing Description Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-missing-desc"
                    checked={filters.missingDescription}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, missingDescription: checked as boolean })
                    }
                  />
                  <Label htmlFor="filter-missing-desc" className="cursor-pointer">
                    Sin Descripción
                  </Label>
                </div>
                
                {/* Missing SEO Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="filter-missing-seo"
                    checked={filters.missingSEO}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, missingSEO: checked as boolean })
                    }
                  />
                  <Label htmlFor="filter-missing-seo" className="cursor-pointer">
                    Sin Datos SEO
                  </Label>
                </div>
                
                {/* Created After Filter */}
                <div className="space-y-1">
                  <Label htmlFor="filter-created-after" className="text-sm">
                    Creado Después De
                  </Label>
                  <Input
                    id="filter-created-after"
                    type="date"
                    value={filters.createdAfter}
                    onChange={(e) =>
                      setFilters({ ...filters, createdAfter: e.target.value })
                    }
                  />
                </div>
                
                {/* Created Before Filter */}
                <div className="space-y-1">
                  <Label htmlFor="filter-created-before" className="text-sm">
                    Creado Antes De
                  </Label>
                  <Input
                    id="filter-created-before"
                    type="date"
                    value={filters.createdBefore}
                    onChange={(e) =>
                      setFilters({ ...filters, createdBefore: e.target.value })
                    }
                  />
                </div>
              </div>
              
              {/* Filter Results Summary */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mostrando <strong>{events.length}</strong> de <strong>{allEvents.length}</strong> eventos
                </p>
                {events.length > 0 && (
                  <Button onClick={selectAllFiltered} variant="outline" size="sm">
                    Seleccionar Todos los Filtrados ({events.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Events List */}
          {isLoading ? (
            <p>Cargando eventos...</p>
          ) : events.length === 0 ? (
            <p>No hay eventos que coincidan con los filtros</p>
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
                        <p className="font-medium text-sm">{String(getEventName(event))}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          {event.date ? new Date(event.date).toLocaleDateString("es-ES") : 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm">{String(getEventLocation(event))}</span>
                      </div>
                      <div>
                        <span className="text-sm capitalize">{String(event.organizerType || "N/A")}</span>
                      </div>
                      <div>
                        <span className="text-sm">{String(event.sport || event.discipline || "N/A")}</span>
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
