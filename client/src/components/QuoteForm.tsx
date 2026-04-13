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
  language?: 'es' | 'de';
}

export default function QuoteForm({ 
  productType = "Gorros de Natación", 
  title,
  description,
  language = 'es',
}: QuoteFormProps) {
  const isDE = language === 'de';
  const resolvedTitle = title ?? (isDE ? 'Angebot anfordern' : 'Solicitar Presupuesto');
  const resolvedDescription = description ?? (
    isDE
      ? 'Füllen Sie das Formular aus und wir antworten Ihnen innerhalb von 24 Stunden mit einem persönlichen Angebot.'
      : 'Completa el formulario y te responderemos en menos de 24 horas con un presupuesto personalizado.'
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const submitMutation = trpc.contact.submitQuote.useMutation({
    onSuccess: () => {
      toast.success(isDE ? 'Anfrage gesendet!' : '¡Solicitud enviada!', {
        description: isDE ? 'Wir antworten Ihnen innerhalb von 24 Stunden.' : 'Te responderemos en menos de 24 horas.',
      });
      setFormData({ name: "", email: "", phone: "", quantity: "", message: "" });
    },
    onError: (error: any) => {
      toast.error(isDE ? 'Fehler beim Senden' : 'Error al enviar', {
        description: error.message || (isDE ? 'Bitte versuchen Sie es erneut.' : 'Por favor, inténtalo de nuevo.'),
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      ...formData,
      productType,
      language,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{resolvedTitle}</CardTitle>
        <p className="text-sm text-gray-600">{resolvedDescription}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder={isDE ? 'Vollständiger Name *' : 'Nombre completo *'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="E-Mail *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder={isDE ? 'Telefon' : 'Teléfono'}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder={isDE ? 'Geschätzte Menge Badekappen *' : 'Cantidad estimada de gorros *'}
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              min="50"
            />
          </div>
          <div>
            <Textarea
              placeholder={isDE
                ? 'Erzählen Sie uns von Ihrem Projekt (Farben, Design, gewünschtes Datum, etc.)'
                : 'Cuéntanos sobre tu proyecto (colores, diseño, fecha necesaria, etc.)'}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
            />
          </div>
          <Button type="submit" className="w-full" disabled={submitMutation.isPending}>
            {submitMutation.isPending
              ? (isDE ? 'Wird gesendet...' : 'Enviando...')
              : (isDE ? 'Angebot anfordern' : 'Solicitar Presupuesto')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
