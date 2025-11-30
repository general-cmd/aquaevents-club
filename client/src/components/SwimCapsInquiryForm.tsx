import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Building2, Package } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function SwimCapsInquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    quantity: "",
    colors: "1",
    message: "",
  });

  const sendInquiryMutation = trpc.swimCaps.sendInquiry.useMutation({
    onSuccess: () => {
      toast.success("¡Solicitud enviada correctamente! Te contactaremos pronto.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        organization: "",
        quantity: "",
        colors: "1",
        message: "",
      });
    },
    onError: (error: any) => {
      toast.error(`Error al enviar solicitud: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.quantity) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    sendInquiryMutation.mutate(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <CardTitle className="text-2xl">Solicitar Presupuesto</CardTitle>
        <CardDescription className="text-blue-50">
          Completa el formulario y te enviaremos un presupuesto personalizado en menos de 24 horas
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Nombre Completo *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Juan Pérez"
              required
              className="mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="juan@clubnatacion.com"
              required
              className="mt-1"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Teléfono
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+34 600 000 000"
              className="mt-1"
            />
          </div>

          {/* Organization */}
          <div>
            <Label htmlFor="organization">
              Club / Federación / Organización
            </Label>
            <Input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              placeholder="Club Natación Barcelona"
              className="mt-1"
            />
          </div>

          {/* Quantity and Colors Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Cantidad Aproximada *
              </Label>
              <Input
                id="quantity"
                type="number"
                min="50"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="100"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="colors">
                Número de Colores
              </Label>
              <Select
                value={formData.colors}
                onValueChange={(value) => setFormData({ ...formData, colors: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecciona colores" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Color</SelectItem>
                  <SelectItem value="2">2 Colores</SelectItem>
                  <SelectItem value="3">3 Colores</SelectItem>
                  <SelectItem value="4">4 Colores</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">
              Detalles Adicionales (diseño, fecha de entrega, etc.)
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Necesitamos los gorros para un campeonato el 15 de marzo. Queremos incluir el logo del club y el nombre del evento..."
              rows={4}
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white"
            disabled={sendInquiryMutation.isPending}
          >
            {sendInquiryMutation.isPending ? "Enviando..." : "Solicitar Presupuesto Gratis"}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Al enviar este formulario, aceptas que contactemos contigo para proporcionarte un presupuesto personalizado.
            Respuesta garantizada en menos de 24 horas.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
