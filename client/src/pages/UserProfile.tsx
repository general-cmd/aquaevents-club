import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, CheckCircle, Heart } from "lucide-react";
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
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [saved, setSaved] = useState(false);
  
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
      setFormData({
        userType: (user as any).userType || "",
        preferredDisciplines: (user as any).preferredDisciplines ? JSON.parse((user as any).preferredDisciplines) : [],
        emailConsent: !!(user as any).emailConsent,
      });
    }
  }, [user]);

  const updateMutation = trpc.userProfile.update.useMutation({
    onSuccess: () => {
      setSaved(true);
      toast.success("¡Perfil actualizado correctamente!");
      setTimeout(() => setSaved(false), 3000);
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
              <Link href="/perfil">
                <a className="text-blue-600 font-medium">
                  Mi Perfil
                </a>
              </Link>
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
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
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
                  <Select value={formData.userType} onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value as "club" | "swimmer" | "federation" | "other" }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="swimmer">Nadador/a</SelectItem>
                      <SelectItem value="club">Club Deportivo</SelectItem>
                      <SelectItem value="federation">Federación</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
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
    </div>
  );
}

