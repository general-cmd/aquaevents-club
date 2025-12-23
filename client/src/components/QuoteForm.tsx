import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface QuoteFormProps {
  productType?: string;
  title?: string;
  description?: string;
}

export default function QuoteForm({ 
  productType = "Gorros de Natación", 
  title = "Solicitar Presupuesto",
  description = "Completa el formulario y te responderemos en menos de 24 horas con un presupuesto personalizado."
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const submitMutation = trpc.contact.submitQuote.useMutation({
    onSuccess: () => {
      toast.success("¡Solicitud enviada!", {
        description: "Te responderemos en menos de 24 horas.",
      });
      setFormData({ name: "", email: "", phone: "", quantity: "", message: "" });
    },
    onError: (error: any) => {
      toast.error("Error al enviar", {
        description: error.message || "Por favor, inténtalo de nuevo.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      ...formData,
      productType,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nombre completo *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="Cantidad estimada de gorros *"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              min="50"
            />
          </div>
          <div>
            <Textarea
              placeholder="Cuéntanos sobre tu proyecto (colores, diseño, fecha necesaria, etc.)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
            {submitMutation.isPending ? "Enviando..." : "Solicitar Presupuesto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
