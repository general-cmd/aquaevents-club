import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, CheckCircle, Heart, Calendar, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

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

export default function UserProfile() {
  const { user, loading, isAuthenticated, logout, refresh } = useAuth();
  const [, setLocation] = useLocation();
  const [saved, setSaved] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  
  // Fetch user's event submissions
  const { data: submissionsData } = trpc.eventSubmissions.mySubmissions.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const [formData, setFormData] = useState<{
    userType: "club" | "swimmer" | "federation" | "other" | "";
    preferredDisciplines: string[];
    emailConsent: boolean;
  }>({
    userType: "",
    preferredDisciplines: [],
    emailConsent: false,
  });

  // Load user data if available
  useEffect(() => {
    if (user) {
      const userData = user as any;
      const userType = userData.userType || "";
      console.log('[UserProfile] Loading user data:', { userType, raw: userData.userType });
      
      setFormData({
        userType: userType as "club" | "swimmer" | "federation" | "other" | "",
        preferredDisciplines: userData.preferredDisciplines ? JSON.parse(userData.preferredDisciplines) : [],
        emailConsent: !!userData.emailConsent,
      });
    }
  }, [user]);

  const utils = trpc.useUtils();

  const deleteSubmissionMutation = trpc.eventSubmissions.deleteOwn.useMutation({
    onSuccess: () => {
      toast.success("¡Evento eliminado correctamente!");
      utils.eventSubmissions.mySubmissions.invalidate();
    },
    onError: (error) => {
      toast.error("Error al eliminar evento: " + error.message);
    },
  });

  const updateSubmissionMutation = trpc.eventSubmissions.update.useMutation({
    onSuccess: (data) => {
      if (data.requiresReapproval) {
        toast.success("¡Evento actualizado! Será revisado nuevamente por el administrador.");
      } else {
        toast.success("¡Evento actualizado correctamente!");
      }
      setEditingSubmission(null);
      utils.eventSubmissions.mySubmissions.invalidate();
    },
    onError: (error) => {
      toast.error("Error al actualizar evento: " + error.message);
    },
  });

  const updateMutation = trpc.userProfile.update.useMutation({
    onSuccess: async () => {
      setSaved(true);
      toast.success("¡Perfil actualizado correctamente!");
      setTimeout(() => setSaved(false), 3000);
      // Refetch user data to get updated profile fields
      await refresh();
    },
    onError: (error) => {
      toast.error("Error al actualizar perfil: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userType) {
      toast.error("Por favor selecciona tu tipo de usuario");
      return;
    }

    updateMutation.mutate({
      userType: formData.userType || undefined,
      preferredDisciplines: formData.preferredDisciplines,
      emailConsent: formData.emailConsent,
    });
  };

  const toggleDiscipline = (discipline: string) => {
    setFormData(prev => ({
      ...prev,
      preferredDisciplines: prev.preferredDisciplines.includes(discipline)
        ? prev.preferredDisciplines.filter(d => d !== discipline)
        : [...prev.preferredDisciplines, discipline]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
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
            </div>
          </div>
        </header>

        <section className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="p-12">
              <User className="w-20 h-20 mx-auto mb-6 text-gray-400" />
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                Inicia Sesión
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Necesitas iniciar sesión para acceder a tu perfil y guardar tus eventos favoritos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={getLoginUrl()}>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                    Iniciar Sesión
                  </Button>
                </a>
                <Link href="/">
                  <Button variant="outline">
                    Volver al Inicio
                  </Button>
                </Link>
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
              <Link href="/enviar-evento">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Enviar Evento
                </a>
              </Link>
              <Link href="/perfil">
                <a className="text-blue-600 font-medium">
                  Mi Perfil
                </a>
              </Link>
              {(user as any)?.role === 'admin' && (
                <Link href="/admin">
                  <a className="text-purple-600 hover:text-purple-700 transition-colors font-medium flex items-center gap-1">
                    <span>🔑</span> Admin
                  </a>
                </Link>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={logout}
              >
                Cerrar Sesión
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Profile Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Mi Perfil
            </h1>
            <p className="text-lg text-gray-600">
              Personaliza tu experiencia y recibe notificaciones de eventos que te interesan
            </p>
          </div>

          {saved && (
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <p className="text-green-800 font-medium">
                  ¡Perfil guardado correctamente!
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Info (Read-only) */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Sesión Activa</span>
                      {(user as any)?.role === 'admin' && (
                        <Badge className="ml-2 bg-purple-600 hover:bg-purple-700">Admin</Badge>
                      )}
                      {(user as any)?.verified === 'yes' && (
                        <Badge className="ml-2 bg-green-600 hover:bg-green-700">✓ Verificado</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Nombre:</span>
                      <span className="text-sm text-gray-900">{user?.name || "Usuario"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Email:</span>
                      <span className="text-sm text-gray-900">{user?.email || "No disponible"}</span>
                    </div>
                  </div>
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Quién eres? <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.userType}
                    onChange={(e) => setFormData(prev => ({ ...prev, userType: e.target.value as "club" | "swimmer" | "federation" | "other" }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Selecciona tu tipo</option>
                    <option value="swimmer">Nadador/a</option>
                    <option value="club">Club Deportivo</option>
                    <option value="federation">Federación</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                {/* Preferred Disciplines */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Disciplinas de Interés
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Selecciona las disciplinas sobre las que quieres recibir notificaciones
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {DISCIPLINES.map(discipline => (
                      <div key={discipline} className="flex items-center gap-2">
                        <Checkbox
                          id={discipline}
                          checked={formData.preferredDisciplines.includes(discipline)}
                          onCheckedChange={() => toggleDiscipline(discipline)}
                        />
                        <label
                          htmlFor={discipline}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {discipline}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Consent */}
                <div className="border-t pt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="emailConsent"
                        checked={formData.emailConsent}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, emailConsent: checked as boolean }))}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <label
                          htmlFor="emailConsent"
                          className="text-sm font-medium text-gray-900 cursor-pointer block mb-1"
                        >
                          Acepto recibir notificaciones por email
                        </label>
                        <p className="text-xs text-gray-600">
                          Te enviaremos emails sobre nuevos eventos que coincidan con tus disciplinas de interés. 
                          Puedes cancelar la suscripción en cualquier momento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                  <Link href="/mis-favoritos">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Mis Favoritos
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* My Event Submissions */}
          {submissionsData && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Mis Eventos Enviados
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submissionsData.submissions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No has enviado ningún evento aún</p>
                    <Link href="/enviar-evento">
                      <Button className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-500">
                        Enviar Evento
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex justify-end">
                      <Link href="/enviar-evento">
                        <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                          Enviar Otro Evento
                        </Button>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {submissionsData.submissions.map((submission: any) => (
                      <div key={submission.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{submission.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {submission.city}, {submission.region} • {submission.discipline}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(submission.startDate).toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            variant={submission.status === 'approved' ? 'default' : submission.status === 'rejected' ? 'destructive' : 'secondary'}
                            className="whitespace-nowrap"
                          >
                            {submission.status === 'pending' && (
                              <><Clock className="w-3 h-3 mr-1" /> Pendiente</>
                            )}
                            {submission.status === 'approved' && (
                              <><CheckCircle className="w-3 h-3 mr-1" /> Aprobado</>
                            )}
                            {submission.status === 'rejected' && (
                              <><XCircle className="w-3 h-3 mr-1" /> Rechazado</>
                            )}
                          </Badge>
                          {submission.publishedAt && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Publicado
                            </Badge>                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingSubmission(submission);
                              setEditFormData({
                                title: submission.title,
                                discipline: submission.discipline,
                                category: submission.category || '',
                                region: submission.region,
                                city: submission.city,
                                startDate: new Date(submission.startDate).toISOString().split('T')[0],
                                endDate: submission.endDate ? new Date(submission.endDate).toISOString().split('T')[0] : '',
                                contactPhone: submission.contactPhone || '',
                                website: submission.website || '',
                                description: submission.description || '',
                                registrationUrl: submission.registrationUrl || '',
                                maxCapacity: submission.maxCapacity || '',
                              });
                            }}
                          >
                            Editar
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => {
                              if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
                                deleteSubmissionMutation.mutate({ id: submission.id });
                              }
                            }}
                            disabled={deleteSubmissionMutation.isPending}
                          >
                            {deleteSubmissionMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                          </Button>
                        </div>
                      </div>
                      {submission.adminNotes && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                          <p className="font-medium text-blue-900 mb-1">Nota del administrador:</p>
                          <p className="text-blue-700">{submission.adminNotes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Privacy Notice */}
          <Card className="mt-6 bg-gray-50 border-gray-200">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                🔒 Privacidad y Protección de Datos
              </h3>
              <p className="text-sm text-gray-700">
                Tus datos personales están protegidos conforme al RGPD. Solo usamos tu información 
                para enviarte notificaciones de eventos según tus preferencias. Nunca compartiremos 
                tus datos con terceros sin tu consentimiento explícito.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Edit Event Dialog */}
      <Dialog open={!!editingSubmission} onOpenChange={(open) => !open && setEditingSubmission(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Título del Evento *</Label>
              <Input
                id="edit-title"
                value={editFormData.title || ''}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                placeholder="Ej: Campeonato Regional de Natación"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-discipline">Disciplina *</Label>
                <select
                  id="edit-discipline"
                  value={editFormData.discipline || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, discipline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecciona disciplina</option>
                  <option value="Natación">Natación</option>
                  <option value="Waterpolo">Waterpolo</option>
                  <option value="Natación Sincronizada">Natación Sincronizada</option>
                  <option value="Saltos">Saltos</option>
                  <option value="Aguas Abiertas">Aguas Abiertas</option>
                  <option value="Triatlón">Triatlón</option>
                  <option value="Salvamento y Socorrismo">Salvamento y Socorrismo</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div>
                <Label htmlFor="edit-category">Categoría</Label>
                <Input
                  id="edit-category"
                  value={editFormData.category || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                  placeholder="Ej: Absoluto, Infantil, Master"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-region">Región *</Label>
                <Input
                  id="edit-region"
                  value={editFormData.region || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, region: e.target.value })}
                  placeholder="Ej: Comunidad de Madrid"
                />
              </div>
              <div>
                <Label htmlFor="edit-city">Ciudad *</Label>
                <Input
                  id="edit-city"
                  value={editFormData.city || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                  placeholder="Ej: Madrid"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startDate">Fecha de Inicio *</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={editFormData.startDate || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-endDate">Fecha de Fin</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={editFormData.endDate || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={editFormData.description || ''}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                placeholder="Describe el evento, categorías, pruebas, etc."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-contactPhone">Teléfono de Contacto</Label>
                <Input
                  id="edit-contactPhone"
                  value={editFormData.contactPhone || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, contactPhone: e.target.value })}
                  placeholder="+34 XXX XXX XXX"
                />
              </div>
              <div>
                <Label htmlFor="edit-website">Sitio Web</Label>
                <Input
                  id="edit-website"
                  value={editFormData.website || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
                  placeholder="https://ejemplo.com"
                />
              </div>
            </div>
            {editingSubmission?.publishedAt && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ Este evento ya está publicado. Al editarlo, volverá a estado pendiente y requerirá aprobación del administrador.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingSubmission(null)}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (!editFormData.title || !editFormData.discipline || !editFormData.region || !editFormData.city || !editFormData.startDate) {
                  toast.error('Por favor completa todos los campos obligatorios');
                  return;
                }
                updateSubmissionMutation.mutate({
                  id: editingSubmission.id,
                  ...editFormData,
                });
              }}
              disabled={updateSubmissionMutation.isPending}
            >
              {updateSubmissionMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

