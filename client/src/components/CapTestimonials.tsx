import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface CapTestimonialsProps {
  capType: string | null;
}

export default function CapTestimonials({ capType }: CapTestimonialsProps) {
  const { data: testimonials, isLoading } = trpc.capManagement.testimonials.getByType.useQuery({
    capType,
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <div className="space-y-6">
      {testimonials.map((testimonial: any) => (
        <Card key={testimonial.id} className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              {testimonial.photo && (
                <div className="flex-shrink-0">
                  <img
                    src={testimonial.photo}
                    alt={`${testimonial.clubName} - ${testimonial.customerName}`}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{testimonial.clubName}</h4>
                    <p className="text-sm text-gray-600">{testimonial.customerName}</p>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                  <p className="text-gray-700 italic pl-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
