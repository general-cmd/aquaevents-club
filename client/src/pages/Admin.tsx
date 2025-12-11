import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle, XCircle, Clock, User, FileText, Building2, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";
import CreateEventDialog from "@/components/CreateEventDialog";

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"submissions" | "blog" | "federations" | "published-events">("submissions");
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [selectedSubmissions, setSelectedSubmissions] = useState<Set<string>>(new Set());
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [blogEditForm, setBlogEditForm] = useState({ title: "", excerpt: "", content: "", category: "", coverImage: "", featuredImage: "" });
  const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Fetch pending event submissions
  const { data: submissionsData, isLoading: submissionsLoading, refetch: refetchSubmissions } = trpc.eventSubmissions.pending.useQuery(undefined, {
    enabled: isAuthenticated && isAdmin,
  });

  // Fetch all blog posts for admin
  const { data: blogData, isLoading: blogLoading } = trpc.blog.adminList.useQuery(
    undefined,
    { enabled: isAdmin }
  );

  const { data: publishedEventsData, isLoading: publishedEventsLoading, refetch: refetchPublishedEvents } = trpc.events.list.useQuery(
    { limit: 100 },
    { enabled: isAdmin }
  );

  const deleteEventMutation = trpc.events.delete.useMutation({
    onSuccess: () => {
      toast.success("Evento eliminado correctamente");
      refetchPublishedEvents();
    },
    onError: (error) => {
      toast.error("Error al eliminar evento: " + error.message);
    },
  });

  // Mutations
  const approveMutation = trpc.eventSubmissions.approve.useMutation({
    onSuccess: () => {
      toast.success("Evento aprobado correctamente");
      refetchSubmissions();
    },
    onError: (error) => {
      toast.error("Error al aprobar evento: " + error.message);
    },
  });

  const rejectMutation = trpc.eventSubmissions.reject.useMutation({
    onSuccess: () => {
      toast.success("Evento rechazado");
      refetchSubmissions();
    },
    onError: (error) => {
      toast.error("Error al rechazar evento: " + error.message);
    },
  });

  const publishMutation = trpc.eventSubmissions.publish.useMutation({
    onSuccess: () => {
      toast.success("¡Evento publicado en el calendario!");
      refetchSubmissions();
    },
    onError: (error) => {
      toast.error("Error al publicar evento: " + error.message);
    },
  });

  const deleteMutation = trpc.eventSubmissions.delete.useMutation({
    onSuccess: () => {
      toast.success("Evento eliminado correctamente");
      refetchSubmissions();
    },
    onError: (error) => {
      toast.error("Error al eliminar evento: " + error.message);
    },
  });

  // Bulk operations handlers
  const handleBulkApprove = async () => {
    if (selectedSubmissions.size === 0) {
      toast.error("Selecciona al menos un evento");
      return;
    }
    for (const id of Array.from(selectedSubmissions)) {
      await approveMutation.mutateAsync({ id });
    }
    setSelectedSubmissions(new Set());
    toast.success(`${selectedSubmissions.size} eventos aprobados`);
  };

  const handleBulkReject = async () => {
    if (selectedSubmissions.size === 0) {
      toast.error("Selecciona al menos un evento");
      return;
    }
    for (const id of Array.from(selectedSubmissions)) {
      await rejectMutation.mutateAsync({ id, adminNotes: "Rechazado en lote" });
    }
    setSelectedSubmissions(new Set());
    toast.success(`${selectedSubmissions.size} eventos rechazados`);
  };

  const handleBulkPublish = async () => {
    if (selectedSubmissions.size === 0) {
      toast.error("Selecciona al menos un evento");
      return;
    }
    for (const id of Array.from(selectedSubmissions)) {
      await publishMutation.mutateAsync({ id });
    }
    setSelectedSubmissions(new Set());
    toast.success(`${selectedSubmissions.size} eventos publicados`);
  };

  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedSubmissions);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedSubmissions(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedSubmissions.size === submissionsData?.submissions.length) {
      setSelectedSubmissions(new Set());
    } else {
      setSelectedSubmissions(new Set(submissionsData?.submissions.map((s: any) => s.id) || []));
    }
  };

  const updateBlogStatusMutation = trpc.blog.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Estado del artículo actualizado");
      trpc.useUtils().blog.adminList.invalidate();
    },
    onError: (error) => {
      toast.error("Error: " + error.message);
    },
  });

  const updateBlogMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      toast.success("Artículo actualizado correctamente");
      setEditingBlog(null);
      trpc.useUtils().blog.adminList.invalidate();
    },
    onError: (error) => {
      toast.error("Error: " + error.message);
    },
  });

  if (loading || (isAuthenticated && isAdmin && (submissionsLoading || blogLoading || publishedEventsLoading))) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img src="/logo.png" alt="AquaEvents.club" className="w-12 h-12 object-contain" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <User className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                Acceso Restringido
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Necesitas iniciar sesión como administrador para acceder al panel de administración.
              </p>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                  Iniciar Sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img src="/logo.png" alt="AquaEvents.club" className="w-12 h-12 object-contain" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <XCircle className="w-20 h-20 mx-auto mb-6 text-red-500" />
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                Acceso Denegado
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                No tienes permisos de administrador para acceder a esta página.
              </p>
              <Link href="/">
                <Button>Volver al Inicio</Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    );
  }

  const pendingSubmissions = submissionsData?.submissions || [];
  const blogPosts = blogData?.posts || [];
  const publishedEvents = publishedEventsData?.events || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src="/logo.png" alt="AquaEvents.club" className="w-12 h-12 object-contain" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/eventos">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Eventos</a>
              </Link>
              <Link href="/federaciones">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Federaciones</a>
              </Link>
              <Link href="/blog">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Blog</a>
              </Link>
              <Link href="/admin">
                <a className="text-blue-600 font-medium">Admin</a>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Dashboard */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Panel de Administración
              </h1>
              <p className="text-lg text-gray-600">
                Gestiona eventos, artículos y contenido del sitio
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/admin/bulk-edit">
                <Button variant="outline" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Edición Masiva
                </Button>
              </Link>
              <Link href="/admin/bulk-import">
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Importar CSV
                </Button>
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            <Button
              variant={activeTab === "submissions" ? "default" : "ghost"}
              onClick={() => setActiveTab("submissions")}
              className="rounded-b-none"
            >
              <Clock className="w-4 h-4 mr-2" />
              Eventos Pendientes ({pendingSubmissions.length})
            </Button>
            <Button
              variant={activeTab === "blog" ? "default" : "ghost"}
              onClick={() => setActiveTab("blog")}
              className="rounded-b-none"
            >
              <FileText className="w-4 h-4 mr-2" />
              Artículos del Blog ({blogPosts.length})
            </Button>
            <Button
              variant={activeTab === "federations" ? "default" : "ghost"}
              onClick={() => setActiveTab("federations")}
              className="rounded-b-none"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Federaciones
            </Button>
            <Button
              variant={activeTab === "published-events" ? "default" : "ghost"}
              onClick={() => setActiveTab("published-events")}
              className="rounded-b-none"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Eventos Publicados ({publishedEvents.length})
            </Button>
            <Link href="/admin/contacts">
              <Button
                variant="ghost"
                className="rounded-b-none"
              >
                <User className="w-4 h-4 mr-2" />
                Contactos
              </Button>
            </Link>
            <Link href="/admin/bulk-import">
              <Button
                variant="ghost"
                className="rounded-b-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Importar CSV
              </Button>
            </Link>
          </div>

          {/* Event Submissions Tab */}
          {activeTab === "submissions" && (
            <>
            {/* Bulk Actions */}
            {pendingSubmissions.length > 0 && (
              <div className="mb-6 p-4 bg-white rounded-lg border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={selectedSubmissions.size === pendingSubmissions.length && pendingSubmissions.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                  <span className="text-sm font-medium">
                    {selectedSubmissions.size} de {pendingSubmissions.length} seleccionados
                  </span>
                </div>
                {selectedSubmissions.size > 0 && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleBulkApprove}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={approveMutation.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprobar ({selectedSubmissions.size})
                    </Button>
                    <Button
                      onClick={handleBulkReject}
                      variant="destructive"
                      disabled={rejectMutation.isPending}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar ({selectedSubmissions.size})
                    </Button>
                    <Button
                      onClick={handleBulkPublish}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={publishMutation.isPending}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Publicar ({selectedSubmissions.size})
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="space-y-6">
              {pendingSubmissions.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      ¡Todo al día!
                    </h3>
                    <p className="text-gray-600">
                      No hay eventos pendientes de revisión
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pendingSubmissions.map((submission: any) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <Checkbox
                          checked={selectedSubmissions.has(submission.id)}
                          onCheckedChange={() => toggleSelection(submission.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">{submission.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge>{submission.discipline}</Badge>
                            {submission.category && <Badge variant="outline">{submission.category}</Badge>}
                            <Badge variant="secondary">{submission.status}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold mb-3">Información del Evento</h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Región:</span> {submission.region}
                            </div>
                            <div>
                              <span className="font-medium">Ciudad:</span> {submission.city}
                            </div>
                            <div>
                              <span className="font-medium">Fecha Inicio:</span>{" "}
                              {new Date(submission.startDate).toLocaleDateString("es-ES")}
                            </div>
                            {submission.endDate && (
                              <div>
                                <span className="font-medium">Fecha Fin:</span>{" "}
                                {new Date(submission.endDate).toLocaleDateString("es-ES")}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Contacto</h4>
                          <div className="space-y-2 text-sm">
                            {submission.contactName && (
                              <div>
                                <span className="font-medium">Nombre:</span> {submission.contactName}
                              </div>
                            )}
                            <div>
                              <span className="font-medium">Email:</span>{" "}
                              <a href={`mailto:${submission.contactEmail}`} className="text-blue-600 hover:underline">
                                {submission.contactEmail}
                              </a>
                            </div>
                            {submission.contactPhone && (
                              <div>
                                <span className="font-medium">Teléfono:</span> {submission.contactPhone}
                              </div>
                            )}
                            {submission.website && (
                              <div>
                                <span className="font-medium">Web:</span>{" "}
                                <a href={submission.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {submission.website}
                                </a>
                              </div>
                            )}
                            {submission.registrationUrl && (
                              <div>
                                <span className="font-medium">Inscripción:</span>{" "}
                                <a href={submission.registrationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {submission.registrationUrl}
                                </a>
                              </div>
                            )}
                            {submission.maxCapacity && (
                              <div>
                                <span className="font-medium">Capacidad:</span> {submission.maxCapacity}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {submission.description && (
                        <div className="mb-6">
                          <h4 className="font-semibold mb-2">Descripción</h4>
                          <p className="text-gray-700 text-sm">{submission.description}</p>
                        </div>
                      )}

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notas del Administrador
                        </label>
                        <Textarea
                          value={adminNotes[submission.id] || ""}
                          onChange={(e) => setAdminNotes({ ...adminNotes, [submission.id]: e.target.value })}
                          placeholder="Añade notas internas sobre esta revisión..."
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        <Button
                          onClick={() => approveMutation.mutate({ id: submission.id, adminNotes: adminNotes[submission.id] })}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={approveMutation.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Aprobar
                        </Button>
                        <Button
                          onClick={() => publishMutation.mutate({ id: submission.id })}
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={publishMutation.isPending || submission.status !== 'approved'}
                          title={submission.status !== 'approved' ? 'Debes aprobar el evento primero' : 'Publicar evento en el calendario público'}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Publicar al Calendario
                        </Button>
                        <Button
                          onClick={() => rejectMutation.mutate({ id: submission.id, adminNotes: adminNotes[submission.id] })}
                          variant="destructive"
                          disabled={rejectMutation.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Rechazar
                        </Button>
                        <Button
                          onClick={() => {
                            if (confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
                              deleteMutation.mutate({ id: submission.id });
                            }
                          }}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          disabled={deleteMutation.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            </>
          )}

          {/* Blog Tab */}
          {activeTab === "blog" && (
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      No hay artículos
                    </h3>
                    <p className="text-gray-600">
                      Aún no se han creado artículos del blog
                    </p>
                  </CardContent>
                </Card>
              ) : (
                blogPosts.map((post: any) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{post.excerpt}</p>
                          <div className="flex gap-2 mb-3">
                            <Badge>{post.category || "Sin categoría"}</Badge>
                            <Badge variant={post.status === "published" ? "default" : "secondary"}>
                              {post.status}
                            </Badge>
                          </div>
                          {post.publishedAt && (
                            <p className="text-xs text-gray-500">
                              Publicado: {new Date(post.publishedAt).toLocaleDateString("es-ES")}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {post.status !== "published" && (
                            <Button
                              size="sm"
                              onClick={() => updateBlogStatusMutation.mutate({ id: post.id, status: "published" })}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Publicar
                            </Button>
                          )}
                          {post.status === "published" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBlogStatusMutation.mutate({ id: post.id, status: "draft" })}
                            >
                              Despublicar
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingBlog(post);
                              setBlogEditForm({
                                title: post.title || "",
                                excerpt: post.excerpt || "",
                                content: post.content || "",
                                category: post.category || "",
                                coverImage: post.coverImage || "",
                                featuredImage: post.featuredImage || "",
                              });
                            }}
                          >
                            Editar
                          </Button>
                          <Link href={`/blog/${post.slug}`}>
                            <Button size="sm" variant="outline">Ver</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Published Events Tab */}
          {activeTab === "published-events" && (
            <div className="space-y-4">
              {/* Create Event Button */}
              <div className="flex justify-end mb-4">
                <Button
                  onClick={() => setCreateEventDialogOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Evento Manualmente
                </Button>
              </div>

              {publishedEventsLoading ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-gray-600">Cargando eventos...</p>
                  </CardContent>
                </Card>
              ) : publishedEvents.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">
                      No hay eventos publicados
                    </h3>
                    <p className="text-gray-600">
                      Los eventos aprobados y publicados aparecerán aquí
                    </p>
                  </CardContent>
                </Card>
              ) : (
                publishedEvents.map((event: any) => (
                  <Card key={event._id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{event.name?.es || event.name}</h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p><strong>Fecha:</strong> {event.date ? new Date(event.date).toLocaleDateString("es-ES") : "N/A"} {event.endDate && `- ${new Date(event.endDate).toLocaleDateString("es-ES")}`}</p>
                            <p><strong>Ubicación:</strong> {event.location?.city}, {event.location?.region}</p>
                            <p><strong>Disciplina:</strong> {event.discipline}</p>
                            <p><strong>Categoría:</strong> {event.category}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            if (confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
                              deleteEventMutation.mutate({ id: event._id });
                            }
                          }}
                          variant="destructive"
                          size="sm"
                          disabled={deleteEventMutation.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {/* Federations Tab */}
          {activeTab === "federations" && (
            <Card>
              <CardContent className="p-12 text-center">
                <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  Gestión de Federaciones
                </h3>
                <p className="text-gray-600 mb-6">
                  Las federaciones se gestionan directamente en la base de datos MySQL
                </p>
                <Link href="/federaciones">
                  <Button>Ver Federaciones</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Blog Edit Dialog */}
      <Dialog open={!!editingBlog} onOpenChange={() => setEditingBlog(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Artículo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={blogEditForm.title}
                onChange={(e) => setBlogEditForm({ ...blogEditForm, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                value={blogEditForm.category}
                onChange={(e) => setBlogEditForm({ ...blogEditForm, category: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="excerpt">Extracto</Label>
              <Textarea
                id="excerpt"
                value={blogEditForm.excerpt}
                onChange={(e) => setBlogEditForm({ ...blogEditForm, excerpt: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="coverImage">Imagen de Portada</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const response = await fetch('/api/upload-image', {
                          method: 'POST',
                          body: formData,
                        });
                        const data = await response.json();
                        if (data.url) {
                          setBlogEditForm({ ...blogEditForm, coverImage: data.url });
                          toast.success('Imagen subida correctamente');
                        }
                      } catch (error) {
                        toast.error('Error al subir imagen');
                      }
                    }
                  }}
                />
                {blogEditForm.coverImage && (
                  <div className="text-sm text-gray-600">
                    URL actual: <a href={blogEditForm.coverImage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{blogEditForm.coverImage}</a>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="featuredImage">Imagen Destacada</Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const response = await fetch('/api/upload-image', {
                          method: 'POST',
                          body: formData,
                        });
                        const data = await response.json();
                        if (data.url) {
                          setBlogEditForm({ ...blogEditForm, featuredImage: data.url });
                          toast.success('Imagen subida correctamente');
                        }
                      } catch (error) {
                        toast.error('Error al subir imagen');
                      }
                    }
                  }}
                />
                {blogEditForm.featuredImage && (
                  <div className="text-sm text-gray-600">
                    URL actual: <a href={blogEditForm.featuredImage} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{blogEditForm.featuredImage}</a>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="content">Contenido (Markdown)</Label>
              <Textarea
                id="content"
                value={blogEditForm.content}
                onChange={(e) => setBlogEditForm({ ...blogEditForm, content: e.target.value })}
                rows={15}
                className="font-mono text-sm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBlog(null)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                updateBlogMutation.mutate({
                  id: editingBlog.id,
                  ...blogEditForm,
                });
              }}
              disabled={updateBlogMutation.isPending}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Event Dialog */}
      <CreateEventDialog
        open={createEventDialogOpen}
        onOpenChange={setCreateEventDialogOpen}
        onSuccess={() => refetchPublishedEvents()}
      />
    </div>
  );
}

