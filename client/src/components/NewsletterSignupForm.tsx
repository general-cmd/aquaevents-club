import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function NewsletterSignupForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      if (data.alreadySubscribed) {
        toast.info(data.message);
      } else {
        toast.success(data.message);
        setEmail(""); // Clear form
      }
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    subscribeMutation.mutate({
      email,
      userType: "swimmer", // Default to swimmer for homepage signups
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu email"
        required
        disabled={isSubmitting}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-blue-500 focus:outline-none text-base disabled:opacity-50"
      />
      <Button 
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-lg font-bold disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : "Descargar Mi Guía Gratis 📥"}
      </Button>
    </form>
  );
}

