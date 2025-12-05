import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Search, Filter, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { generateICS } from "@/utils/icsExport";
import { toast } from "sonner";
import { formatDate as formatDateDDMMYYYY } from "@/lib/dateFormat";
import ItemListSchema from "@/components/schema/ItemListSchema";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";
import { useTranslation } from "react-i18next";

interface Event {
  _id: string;
  name: { es: string; en: string };
  date: string;
  location: { city: string; region: string };
  discipline: string;
  federation?: string;
  seo?: { canonical: string };
}

export default function Events() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>("all");
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const [organizers, setOrganizers] = useState<string[]>([]);

  // Use tRPC to fetch ALL upcoming events (no limit)
  const { data: eventsData, isLoading } = trpc.events.list.useQuery({ limit: 500 });

  const handleExportCalendar = () => {
    if (!filteredEvents || filteredEvents.length === 0) {
      toast.error(t("events.empty"));
      return;
    }

    const icsEvents = filteredEvents.map((event: any) => ({
      title: event.name?.es || event.name,
      startDate: event.date,
      endDate: event.endDate || event.date,
      location: `${event.location?.city}, ${event.location?.region}`,
      description: `${event.discipline || ''}`,
      url: event.seo?.canonical || `https://aquaevents.club/evento/${event._id}`
    }));

    generateICS(icsEvents, 'eventos-acuaticos.ics');
    toast.success(`${filteredEvents.length} eventos exportados al calendario`);
  };

  useEffect(() => {
    if (eventsData?.events) {
      setEvents(eventsData.events as any);
      setFilteredEvents(eventsData.events as any);
      
      // Extract unique disciplines, categories, regions, and months
      const disciplineSet = new Set<string>();
      const categorySet = new Set<string>();
      const regionSet = new Set<string>();
      const monthSet = new Set<string>();
      const organizerSet = new Set<string>();
      
      eventsData.events.forEach((e: any) => {
        if (e.discipline) disciplineSet.add(e.discipline);
        if (e.category) categorySet.add(e.category);
        if (e.location?.region) regionSet.add(e.location.region);
        if (e.federation) organizerSet.add(e.federation);
        if (e.date) {
          const month = new Date(e.date).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
          monthSet.add(month);
        }
      });
      
      setDisciplines(Array.from(disciplineSet).filter(Boolean));
      setCategories(Array.from(categorySet).filter(Boolean));
      setRegions(Array.from(regionSet).filter(Boolean));
      setMonths(Array.from(monthSet).filter(Boolean));
      setOrganizers(Array.from(organizerSet).filter(Boolean));
      setLoading(false);
    }
  }, [eventsData]);

  useEffect(() => {
    // Apply filters
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.name.es.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Discipline filter
    if (selectedDiscipline !== "all") {
      filtered = filtered.filter(event => event.discipline === selectedDiscipline);
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((event: any) => event.category === selectedCategory);
    }

    // Region filter
    if (selectedRegion !== "all") {
      filtered = filtered.filter(event => event.location.region === selectedRegion);
    }

    // Month filter
    if (selectedMonth !== "all") {
      filtered = filtered.filter(event => {
        const eventMonth = new Date(event.date).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        return eventMonth === selectedMonth;
      });
    }

    // Organizer filter (federation/club)
    if (selectedOrganizer !== "all") {
      filtered = filtered.filter((event: any) => event.federation === selectedOrganizer);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedDiscipline, selectedCategory, selectedRegion, selectedMonth, selectedOrganizer, events]);

  const getDisciplineIcon = (discipline: string) => {
    const icons: Record<string, string> = {
      swimming: "🏊",
      triathlon: "🏃",
      waterpolo: "🤽",
      "open-water": "🌊",
      duathlon: "🚴",
      synchronized_swimming: "💃",
    };
    return icons[discipline] || "🏆";
  };

  const getDisciplineLabel = (discipline: string) => {
    const labels: Record<string, string> = {
      swimming: "Natación",
      triathlon: "Triatlón",
      waterpolo: "Waterpolo",
      "open-water": "Aguas Abiertas",
      duathlon: "Duatlón",
      synchronized_swimming: "Natación Artística",
    };
    return labels[discipline] || discipline;
  };

  const formatDate = (dateString: string) => {
    return formatDateDDMMYYYY(dateString);
  };

  // Prepare data for ItemList schema
  const schemaItems = filteredEvents.slice(0, 50).map(event => ({
    name: event.name.es,
    url: `/evento/${event.seo?.canonical || event._id}`,
    description: `${event.name.es} en ${event.location.city}, ${event.location.region}`,
    date: event.date,
    location: `${event.location.city}, ${event.location.region}`
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Schema.org Structured Data for AI SEO */}
      <ItemListSchema 
        items={schemaItems}
        listName="Eventos Acuáticos en España 2026"
        listDescription="Calendario completo de competiciones de natación, triatlón, waterpolo y aguas abiertas en España"
      />
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Eventos", url: "/eventos" }
      ]} />
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3">
              <img src="/logo.png" alt="AquaEvents.club" className="h-14 w-14 object-contain" />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                AquaEvents.club
              </span>
            </a>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/eventos">
              <a className="text-blue-600 font-semibold">Eventos</a>
            </Link>
            <Link href="/blog">
              <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Blog</a>
            </Link>
            <Link href="/enviar-evento">
              <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Enviar Evento</a>
            </Link>
            <Link href="/perfil">
              <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Mi Perfil</a>
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
              Suscríbete Gratis
            </Button>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">
            Calendario de Eventos Acuáticos 2026
          </h1>
          <p className="text-lg text-blue-100 text-center max-w-3xl mx-auto">
            Descubre todas las competiciones de natación, triatlón, waterpolo y aguas abiertas en España
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="border-2 border-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">{t("events.filters.all")}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder={t("events.filters.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Discipline Filter */}
              <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las disciplinas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las disciplinas</SelectItem>
                  {disciplines.map(discipline => (
                    <SelectItem key={discipline} value={discipline}>
                      {getDisciplineIcon(discipline)} {getDisciplineLabel(discipline)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Region Filter */}
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las regiones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las regiones</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Month Filter */}
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los meses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los meses</SelectItem>
                  {months.map(month => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Organizer Filter (Federation/Club) */}
              <Select value={selectedOrganizer} onValueChange={setSelectedOrganizer}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los organizadores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los organizadores</SelectItem>
                  {organizers.map(organizer => (
                    <SelectItem key={organizer} value={organizer}>
                      {organizer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count and Export */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Mostrando <span className="font-semibold text-blue-600">{filteredEvents.length}</span> eventos
              </div>
              {filteredEvents.length > 0 && (
                <Button
                  onClick={handleExportCalendar}
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar ({filteredEvents.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Cargando eventos...</div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600 mb-2">No se encontraron eventos</div>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <Card key={event._id} className="border-2 hover:border-blue-500 transition-all hover:shadow-lg group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                      {getDisciplineIcon(event.discipline)} {getDisciplineLabel(event.discipline)}
                    </Badge>
                    <div className="text-sm font-semibold text-gray-700">
                      {formatDate(event.date)}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.name.es}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{event.location.city}, {event.location.region}</span>
                  </div>

                  <Link href={`/eventos/${(() => {
                    // Extract slug from canonical URL or use _id as fallback
                    if (event.seo?.canonical) {
                      const parts = event.seo.canonical.split('/');
                      return encodeURIComponent(parts[parts.length - 1]);
                    }
                    return event._id;
                  })()}`}>
                    <a>
                      <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                      >
                        {t("events.viewDetails")}
                      </Button>
                    </a>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.png" alt="AquaEvents.club" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold">AquaEvents.club</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            El calendario más completo de eventos acuáticos en España
          </p>
          <div className="text-sm text-gray-500">
            © 2025 AquaEvents.club. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

