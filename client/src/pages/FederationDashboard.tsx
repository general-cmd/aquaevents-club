import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, Users, TrendingUp, Plus } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import BreadcrumbSchema from "@/components/schema/BreadcrumbSchema";

export default function FederationDashboard() {
  const { user, isAuthenticated } = useAuth();
  
  // Check if user is a federation
  const isFederation = user?.role === "federation";
  
  // Get federation's event submissions
  const { data: submissionsData } = trpc.eventSubmissions.mySubmissions.useQuery(
    undefined,
    { enabled: isAuthenticated && isFederation }
  );
  
  const submissions = submissionsData?.submissions || [];
  
  // Calculate statistics
  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === "pending").length,
    approved: submissions.filter(s => s.status === "approved").length,
    published: submissions.filter(s => s.publishedAt).length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Debes iniciar sesión para acceder al panel de federación.
            </p>
            <Button asChild className="w-full">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isFederation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Acceso Denegado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Esta sección es solo para federaciones. Si eres una federación y necesitas acceso, contacta con el administrador.
            </p>
            <Button asChild className="w-full">
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbSchema items={[
        { name: "Inicio", url: "/" },
        { name: "Panel de Federación", url: "/federacion" }
      ]} />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Panel de Federación</h1>
          <p className="text-blue-100">
            Gestiona tus eventos y visualiza estadísticas
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Eventos
              </CardTitle>
              <Calendar className="w-4 h-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pendientes
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Aprobados
              </CardTitle>
              <Users className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Publicados
              </CardTitle>
              <Eye className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.published}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <Button asChild size="lg">
            <Link href="/enviar-evento">
              <Plus className="w-4 h-4 mr-2" />
              Enviar Nuevo Evento
            </Link>
          </Button>
        </div>

        {/* Events List */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Eventos Enviados</CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No has enviado ningún evento aún</p>
                <Button asChild>
                  <Link href="/enviar-evento">Enviar Primer Evento</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{submission.title}</h3>
                        <p className="text-sm text-gray-600">
                          {submission.discipline} • {submission.city}, {submission.region}
                        </p>
                      </div>
                      <Badge
                        variant={
                          submission.status === "approved"
                            ? "default"
                            : submission.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {submission.status === "approved"
                          ? "Aprobado"
                          : submission.status === "rejected"
                          ? "Rechazado"
                          : "Pendiente"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📅 {new Date(submission.startDate).toLocaleDateString("es-ES")}</span>
                      {submission.publishedAt && (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Publicado
                        </Badge>
                      )}
                    </div>
                    {submission.adminNotes && (
                      <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                        <strong>Nota del administrador:</strong> {submission.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}

