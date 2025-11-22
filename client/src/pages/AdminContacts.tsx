import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Download, Shield, ShieldOff, Search, Filter } from "lucide-react";
import { Link } from "wouter";

export default function AdminContacts() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [verificationNotes, setVerificationNotes] = useState("");

  // Fetch all contacts
  const { data: contactsData, refetch } = trpc.newsletter.allContacts.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  // Verify user mutation
  const verifyMutation = trpc.admin.verifyUser.useMutation({
    onSuccess: () => {
      refetch();
      setVerifyDialogOpen(false);
      setSelectedContact(null);
      setVerificationNotes("");
    },
  });

  // Unverify user mutation
  const unverifyMutation = trpc.admin.unverifyUser.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const contacts = contactsData?.contacts || [];

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterType === "all" ||
      (filterType === "verified" && contact.verified === "yes") ||
      (filterType === "unverified" && contact.verified !== "yes") ||
      (filterType === "newsletter" && contact.hasNewsletter) ||
      (filterType === "profile" && contact.hasProfile) ||
      (filterType === "event_submitter" && contact.hasSubmittedEvent);

    return matchesSearch && matchesFilter;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Email", "Name", "Type", "Source", "Verified", "Newsletter", "Profile", "Event Submitter", "Created At"];
    const rows = filteredContacts.map((contact) => [
      contact.email,
      contact.name || "",
      contact.userType || "",
      contact.source,
      contact.verified === "yes" ? "Yes" : "No",
      contact.hasNewsletter ? "Yes" : "No",
      contact.hasProfile ? "Yes" : "No",
      contact.hasSubmittedEvent ? "Yes" : "No",
      contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `aquaevents-contacts-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVerify = (contact: any) => {
    setSelectedContact(contact);
    setVerifyDialogOpen(true);
  };

  const confirmVerify = () => {
    if (selectedContact) {
      verifyMutation.mutate({
        userId: selectedContact.userId,
        verificationNotes,
      });
    }
  };

  const handleUnverify = (contact: any) => {
    if (confirm(`¿Revocar verificación de ${contact.email}?`)) {
      unverifyMutation.mutate({
        userId: contact.userId,
        reason: "Revocado por administrador",
      });
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Acceso Restringido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Solo los administradores pueden acceder a esta página.
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Gestión de Contactos</h1>
          <p className="text-blue-100">
            Todos los contactos del sistema (newsletter + perfiles + eventos)
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Contactos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contacts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Verificados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {contacts.filter((c) => c.verified === "yes").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Con Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {contacts.filter((c) => c.hasProfile).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Han Enviado Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {contacts.filter((c) => c.hasSubmittedEvent).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por email o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border rounded-md bg-white"
                >
                  <option value="all">Todos</option>
                  <option value="verified">Verificados</option>
                  <option value="unverified">No Verificados</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="profile">Con Perfil</option>
                  <option value="event_submitter">Han Enviado Eventos</option>
                </select>

                <Button onClick={exportToCSV} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.email}>
                    <TableCell className="font-medium">{contact.email}</TableCell>
                    <TableCell>{contact.name || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{contact.userType || "N/A"}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {contact.verified === "yes" && (
                          <Badge className="bg-green-100 text-green-800">
                            <Shield className="w-3 h-3 mr-1" />
                            Verificado
                          </Badge>
                        )}
                        {contact.hasNewsletter && (
                          <Badge variant="secondary">Newsletter</Badge>
                        )}
                        {contact.hasProfile && (
                          <Badge variant="secondary">Perfil</Badge>
                        )}
                        {contact.hasSubmittedEvent && (
                          <Badge variant="secondary">Eventos</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{contact.source}</Badge>
                    </TableCell>
                    <TableCell>
                      {contact.hasProfile && (
                        <div className="flex gap-2">
                          {contact.verified === "yes" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUnverify(contact)}
                              disabled={unverifyMutation.isPending}
                            >
                              <ShieldOff className="w-4 h-4 mr-1" />
                              Revocar
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleVerify(contact)}
                              disabled={verifyMutation.isPending}
                            >
                              <Shield className="w-4 h-4 mr-1" />
                              Verificar
                            </Button>
                          )}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredContacts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No se encontraron contactos
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Verify Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verificar Contacto</DialogTitle>
            <DialogDescription>
              Estás a punto de verificar a {selectedContact?.email}. Este contacto
              recibirá un badge de verificación y sus eventos serán aprobados más rápidamente.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Notas de verificación (opcional)
              </label>
              <Textarea
                placeholder="Ej: Verificado tras llamada telefónica el 22/11/2025"
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setVerifyDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={confirmVerify}
              disabled={verifyMutation.isPending}
            >
              {verifyMutation.isPending ? "Verificando..." : "Verificar Contacto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

