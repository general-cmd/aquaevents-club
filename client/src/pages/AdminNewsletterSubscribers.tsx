import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminNewsletterSubscribers() {
  const { data, isLoading, error } = trpc.newsletter.list.useQuery();

  const downloadCSV = () => {
    if (!data?.subscribers || data.subscribers.length === 0) {
      toast.error("No hay suscriptores para exportar");
      return;
    }

    // Create CSV content
    const headers = ["Email", "Nombre", "Tipo de Usuario", "Fuente", "Fecha de Suscripción", "Sincronizado con Systeme.io", "ID de Systeme.io", "Error"];
    const rows = data.subscribers.map((sub: any) => [
      sub.email,
      sub.name || "",
      sub.userType || "",
      sub.source || "website",
      sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString("es-ES") : "",
      sub.systemeioSynced ? "Sí" : "No",
      sub.systemeioContactId || "",
      sub.systemeioError || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\\n");

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exportados ${data.subscribers.length} suscriptores`);
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">Error: {error.message}</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Suscriptores del Newsletter</CardTitle>
                <p className="text-muted-foreground mt-2">
                  {isLoading ? "Cargando..." : `${data?.subscribers?.length || 0} suscriptores totales`}
                </p>
              </div>
              <Button
                onClick={downloadCSV}
                disabled={isLoading || !data?.subscribers || data.subscribers.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Cargando suscriptores...</p>
              </div>
            ) : data?.subscribers && data.subscribers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fuente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Systeme.io</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.subscribers.map((subscriber: any) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            {subscriber.email}
                          </div>
                        </TableCell>
                        <TableCell>{subscriber.name || "-"}</TableCell>
                        <TableCell>
                          {subscriber.userType ? (
                            <Badge variant="outline">{subscriber.userType}</Badge>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{subscriber.source || "website"}</Badge>
                        </TableCell>
                        <TableCell>
                          {subscriber.subscribedAt
                            ? new Date(subscriber.subscribedAt).toLocaleDateString("es-ES")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {subscriber.systemeioSynced ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm">Sincronizado</span>
                            </div>
                          ) : subscriber.systemeioError ? (
                            <div className="flex items-center gap-2 text-red-600" title={subscriber.systemeioError}>
                              <XCircle className="w-4 h-4" />
                              <span className="text-sm">Error</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-yellow-600">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm">Pendiente</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay suscriptores todavía</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

