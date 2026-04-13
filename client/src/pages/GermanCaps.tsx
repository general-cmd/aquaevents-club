import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Truck, Clock, Shield, Star, Package } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

/**
 * German Custom Swim Caps Landing Page
 * Target: /de/personalisierte-badekappen
 * SEO: "personalisierte Badekappen", "Schwimmkappen mit Logo", "Vereinsbadekappen"
 */
export default function GermanCaps() {
  const products = [
    {
      name: "Silikon-Badekappen",
      slug: "silicona",
      price: "ab €4.45/Stk",
      image: "/gorro-silicona-amarillo-hero.webp",
      description: "Höchste Qualität für Vereine und Wettkämpfe. Chlorbeständig, hypoallergen, 50GMS Stärke.",
      features: ["Maximale Haltbarkeit", "50GMS Stärke", "Perfekter Sitz", "30+ Farben"],
    },
    {
      name: "Latex-Badekappen",
      slug: "latex",
      price: "ab €2.10/Stk",
      image: "/gorro-latex-verde.webp",
      description: "Ideal für Events und Promotionen. Günstig und vielseitig. Große Farbauswahl.",
      features: ["Bestes Preis-Leistung", "Massenevents", "Schnelle Lieferung", "20+ Farben"],
    },
    {
      name: "Wildleder-Badekappen",
      slug: "gamuza",
      price: "ab €4.99/Stk",
      image: "/gorro-gamuza-azul-hero.webp",
      description: "Weiches, angenehmes Tragegefühl. Ideal für Schwimmer mit Latexallergie. Premium-Qualität.",
      features: ["Weiches Material", "Latexfrei", "Premium-Finish", "15+ Farben"],
    },
    {
      name: "Badekappen für langes Haar",
      slug: "pelo-largo",
      price: "ab €6.20/Stk",
      image: "/gorro-pelo-largo-azul-hero.webp",
      description: "Speziell entwickelt für Schwimmer mit langem Haar. Mehr Kapazität und Komfort.",
      features: ["Spezielles Design", "Mehr Kapazität", "Komfortabler Sitz", "10+ Farben"],
    },
    {
      name: "Stoff-Badekappen",
      slug: "tela",
      price: "ab €2.10/Stk",
      image: "/gorro-lycra-hero.jpg",
      description: "Polyester und Lycra für Schulen und Freizeitschwimmer. Bequem, leicht und günstig.",
      features: ["Ideal für Kinder", "Maximaler Komfort", "Schwimmschulen", "Verschiedene Farben"],
    },
  ];

  const faqs = [
    {
      question: "Was ist die Mindestbestellmenge für personalisierte Badekappen?",
      answer: "Die Mindestbestellmenge beträgt 50 Stück für Latex- und Silikon-Badekappen. Wir bieten erhebliche Rabatte für Bestellungen von 250, 500, 1000 und 1500+ Einheiten.",
    },
    {
      question: "Wie lange dauert die Produktion von personalisierten Badekappen?",
      answer: "Die Standardproduktionszeit beträgt 3 Wochen nach Genehmigung des Designs und Zahlung. Wir bieten Express- und Super-Express-Dienste für schnellere Lieferungen an.",
    },
    {
      question: "Welche Personalisierungsmöglichkeiten gibt es?",
      answer: "Wir bieten Druck mit bis zu 6 Farben auf den Badekappen. Wir können Vereinslogos, Namen, Sponsoren und individuelle Designs drucken. Druckplatten sind kostenlos, vorbehaltlich der Designgenehmigung.",
    },
    {
      question: "Was ist der Unterschied zwischen Silikon- und Latex-Badekappen?",
      answer: "Silikon-Badekappen sind langlebiger, chlorbeständiger und komfortabler für den täglichen Gebrauch (€4.45/Stk). Latex-Badekappen sind günstiger und ideal für Massenevents oder Promotionen (€2.10/Stk). Beide sind 100% hypoallergen.",
    },
    {
      question: "Bieten Sie kostenlosen Versand nach Deutschland an?",
      answer: "Ja, wir bieten kostenlosen Versand nach Deutschland und ganz Europa für Bestellungen, die die Mindestmengen erfüllen. Der Standardversand dauert 3-5 Werktage nach Abschluss der Produktion.",
    },
    {
      question: "Kann ich ein Muster vor der Bestellung erhalten?",
      answer: "Ja, wir können ein Muster-Badekappe mit Ihrem Design vor der Hauptbestellung anfertigen. Kontaktieren Sie uns für Details zu Musterbestellungen und Kosten.",
    },
    {
      question: "Wie viele Farben kann ich auf meiner Badekappe drucken?",
      answer: "Wir können bis zu 6 Farben auf Ihre Badekappen drucken. Jede zusätzliche Farbe erhöht den Preis leicht, aber wir bieten wettbewerbsfähige Preise für Mehrfarbendrucke.",
    },
    {
      question: "Sind die Badekappen für Wettkämpfe geeignet?",
      answer: "Ja, unsere Silikon-Badekappen sind für Wettkämpfe auf allen Ebenen geeignet, einschließlich Bundesliga und internationale Meisterschaften. Sie erfüllen alle FINA-Anforderungen.",
    },
  ];

  const testimonials = [
    {
      name: "Thomas Müller",
      club: "SC Neptun Berlin",
      text: "Ausgezeichnete Qualität und schnelle Lieferung. Unsere 200 Vereinsmitglieder sind begeistert von den personalisierten Badekappen.",
      rating: 5,
    },
    {
      name: "Anna Schmidt",
      club: "TSV Schwimmen Hamburg",
      text: "Perfekte Badekappen für unser Vereinsfest. Der Druck ist scharf und die Farben sind leuchtend. Sehr empfehlenswert!",
      rating: 5,
    },
    {
      name: "Klaus Weber",
      club: "SV Wasserfreunde München",
      text: "Wir bestellen seit 3 Jahren bei AquaEvents. Immer pünktlich, immer top Qualität. Der beste Anbieter für Vereinsbadekappen.",
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <html lang="de" />
        <title>Personalisierte Badekappen für Vereine | ab €2.10 | AquaEvents</title>
        <meta
          name="description"
          content="Personalisierte Badekappen für Schwimmvereine in Deutschland. Silikon, Latex, Wildleder. Ab 50 Stück, ab €2.10/Stk. Kostenloser Versand. 3 Wochen Lieferzeit. Kostenloses Angebot!"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aquaevents.club/de/personalisierte-badekappen" />
        <link rel="alternate" hrefLang="de" href="https://aquaevents.club/de/personalisierte-badekappen" />
        <link rel="alternate" hrefLang="es" href="https://aquaevents.club/gorros-natacion" />
        <meta property="og:title" content="Personalisierte Badekappen für Vereine | ab €2.10 | AquaEvents" />
        <meta property="og:description" content="Personalisierte Badekappen für Schwimmvereine in Deutschland. Ab 50 Stück, ab €2.10/Stk. Kostenloser Versand nach Deutschland." />
        <meta property="og:url" content="https://aquaevents.club/de/personalisierte-badekappen" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://aquaevents.club/gorro-silicona-amarillo-hero.webp" />

        {/* Product Schema - German */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Personalisierte Badekappen für Vereine",
            "description": "Personalisierte Badekappen für Schwimmvereine und Wettkämpfe in Deutschland. Silikon, Latex, Wildleder. Hochwertige Qualität, schnelle Lieferung.",
            "image": "https://aquaevents.club/gorro-silicona-amarillo-hero.webp",
            "brand": {
              "@type": "Brand",
              "name": "AquaEvents / EuroSwimCaps",
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "EUR",
              "lowPrice": "2.10",
              "highPrice": "7.50",
              "offerCount": "5",
              "availability": "https://schema.org/InStock",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": 0,
                  "currency": "EUR"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "DE"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 14,
                    "maxValue": 21,
                    "unitCode": "DAY"
                  }
                }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "189",
            },
            "review": testimonials.map(t => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": t.rating,
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": t.name
              },
              "reviewBody": t.text
            }))
          })}
        </script>

        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>

        {/* BreadcrumbList Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "AquaEvents",
                "item": "https://aquaevents.club",
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Deutschland",
                "item": "https://aquaevents.club/de/events",
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Personalisierte Badekappen",
                "item": "https://aquaevents.club/de/personalisierte-badekappen",
              },
            ],
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AquaEvents / EuroSwimCaps",
            "url": "https://aquaevents.club",
            "logo": "https://aquaevents.club/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "sales",
              "availableLanguage": ["German", "Spanish", "English"]
            },
            "sameAs": ["https://euroswimcaps.com"]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-16">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="text-sm mb-6 opacity-90">
              <Link href="/" className="hover:underline">AquaEvents</Link>
              <span className="mx-2">›</span>
              <Link href="/de/events" className="hover:underline">Deutschland</Link>
              <span className="mx-2">›</span>
              <span>Personalisierte Badekappen</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full mb-4">
                  🏆 25+ Jahre Erfahrung · 1 Million+ Kappen geliefert
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Personalisierte Badekappen für Ihren Schwimmverein
                </h1>
                <p className="text-xl mb-4 opacity-95">
                  Hochwertige Badekappen mit Ihrem Vereinslogo. Ab 50 Stück, ab <strong>€2.10/Stk</strong>. Kostenloser Versand nach Deutschland.
                </p>
                <p className="text-lg mb-6 opacity-90">
                  Silikon, Latex, Wildleder und mehr — alle Materialien, alle Farben, bis zu 6 Druckfarben. Lieferzeit: 3 Wochen.
                </p>

                {/* Key trust signals */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span>Mindestbestellung: 50 Stück</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span>Kostenloser Versand DE</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span>Lieferzeit: 3 Wochen</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    <span>Kostenlose Druckplatten</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 font-bold text-lg px-8"
                    onClick={() => {
                      const form = document.getElementById('angebot');
                      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    Kostenloses Angebot anfordern
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <a href="https://euroswimcaps.com" target="_blank" rel="noopener noreferrer">
                      Muster ansehen
                    </a>
                  </Button>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-center gap-4">
                <img
                  src="/gorro-silicona-amarillo-hero.webp"
                  alt="Personalisierte Silikon-Badekappe für Schwimmvereine"
                  className="w-64 h-64 object-cover rounded-full shadow-2xl border-4 border-white/30"
                />
                <div className="flex gap-3">
                  <img src="/gorros-natacion-personalizados-50-unidades-5.jpg" alt="Vereinsbadekappen mit Logo" className="w-20 h-20 object-cover rounded-lg shadow-lg" />
                  <img src="/gorro-silicona-personalizado-beavers-trust.jpg" alt="Personalisierte Badekappen Verein" className="w-20 h-20 object-cover rounded-lg shadow-lg" />
                  <img src="/gorros-silicona-personalizados-al-por-mayor-4.jpg" alt="Badekappen Großbestellung" className="w-20 h-20 object-cover rounded-lg shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section className="py-12 bg-blue-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Preise für Personalisierte Badekappen</h2>
            <p className="text-center text-gray-600 mb-8">Alle Preise pro Stück, zzgl. MwSt. Kostenloser Versand ab Mindestbestellung.</p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-md text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-3 text-left rounded-tl-xl">Material</th>
                    <th className="px-4 py-3 text-center">50–249 Stk</th>
                    <th className="px-4 py-3 text-center">250–499 Stk</th>
                    <th className="px-4 py-3 text-center">500–999 Stk</th>
                    <th className="px-4 py-3 text-center rounded-tr-xl">1000+ Stk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold">Silikon (1 Farbe)</td>
                    <td className="px-4 py-3 text-center">€4.45</td>
                    <td className="px-4 py-3 text-center">€3.95</td>
                    <td className="px-4 py-3 text-center">€3.50</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">€3.10</td>
                  </tr>
                  <tr className="border-b hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold">Silikon (2 Farben)</td>
                    <td className="px-4 py-3 text-center">€5.95</td>
                    <td className="px-4 py-3 text-center">€5.45</td>
                    <td className="px-4 py-3 text-center">€4.95</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">€4.50</td>
                  </tr>
                  <tr className="border-b hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold">Silikon (3 Farben)</td>
                    <td className="px-4 py-3 text-center">€7.50</td>
                    <td className="px-4 py-3 text-center">€6.95</td>
                    <td className="px-4 py-3 text-center">€6.25</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">€5.75</td>
                  </tr>
                  <tr className="border-b hover:bg-blue-50 bg-green-50">
                    <td className="px-4 py-3 font-semibold">Latex (1 Farbe) ⭐</td>
                    <td className="px-4 py-3 text-center font-bold text-green-700">€2.10</td>
                    <td className="px-4 py-3 text-center">€1.85</td>
                    <td className="px-4 py-3 text-center">€1.65</td>
                    <td className="px-4 py-3 text-center font-bold text-green-700">€1.45</td>
                  </tr>
                  <tr className="border-b hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold">Wildleder (1 Farbe)</td>
                    <td className="px-4 py-3 text-center">€4.99</td>
                    <td className="px-4 py-3 text-center">€4.50</td>
                    <td className="px-4 py-3 text-center">€4.10</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">€3.75</td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="px-4 py-3 font-semibold">Stoff/Lycra (1 Farbe)</td>
                    <td className="px-4 py-3 text-center">€2.10</td>
                    <td className="px-4 py-3 text-center">€1.85</td>
                    <td className="px-4 py-3 text-center">€1.65</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">€1.45</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">* Kostenlose Druckplatten · Kostenloser Versand nach Deutschland · Muster auf Anfrage</p>
          </div>
        </section>

        {/* Product Cards */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Unsere Badekappentypen</h2>
            <p className="text-center text-gray-600 mb-8">Wählen Sie das richtige Material für Ihren Verein</p>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <Card key={product.slug} className="hover:shadow-lg transition-shadow border-2 hover:border-blue-300">
                  <CardHeader className="pb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    <p className="text-blue-600 font-bold text-sm">{product.price}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-gray-600 mb-3">{product.description}</p>
                    <ul className="space-y-1">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-1 text-xs text-gray-700">
                          <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-12 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Warum AquaEvents für Ihre Vereinsbadekappen?</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: <Package className="w-8 h-8 text-blue-600" />, title: "25+ Jahre Erfahrung", desc: "Über 1 Million Badekappen für Vereine in ganz Europa geliefert." },
                { icon: <Truck className="w-8 h-8 text-blue-600" />, title: "Kostenloser Versand", desc: "Kostenloser Versand nach Deutschland und ganz Europa." },
                { icon: <Clock className="w-8 h-8 text-blue-600" />, title: "3 Wochen Lieferzeit", desc: "Schnelle Produktion und zuverlässige Lieferung für Ihr Vereinsfest." },
                { icon: <Shield className="w-8 h-8 text-blue-600" />, title: "Kostenlose Druckplatten", desc: "Keine versteckten Kosten — Druckplatten und Design-Beratung inklusive." },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex justify-center mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Beispiele unserer Vereinsbadekappen</h2>
            <p className="text-center text-gray-600 mb-8">Echte Bestellungen von Schwimmvereinen aus ganz Europa</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { src: "/gorro-silicona-personalizado-100tri-race-team.jpg", alt: "Triathlon Verein Badekappen" },
                { src: "/gorro-silicona-personalizado-beavers-trust.jpg", alt: "Schwimmverein Badekappen Logo" },
                { src: "/gorro-silicona-personalizado-bosh-winter.jpg", alt: "Winter Schwimmen Badekappen" },
                { src: "/gorro-silicona-personalizado-corsham-league.jpg", alt: "Schwimmliga Badekappen" },
                { src: "/gorros-silicona-multicolor-swimadelica.jpg", alt: "Mehrfarbige Vereinsbadekappen" },
                { src: "/gorros-silicona-personalizados-ice-swimmers.jpg", alt: "Eisschwimmen Badekappen" },
              ].map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-28 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-12 bg-blue-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Was deutsche Vereine sagen</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Card key={i} className="bg-white shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex mb-3">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{t.text}"</p>
                    <div>
                      <p className="font-bold text-gray-900">{t.name}</p>
                      <p className="text-sm text-blue-600">{t.club}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-white">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Häufig gestellte Fragen</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="angebot" className="py-16 bg-gradient-to-r from-blue-700 to-cyan-600">
          <div className="container max-w-2xl">
            <div className="text-center text-white mb-8">
              <h2 className="text-3xl font-bold mb-3">Kostenloses Angebot anfordern</h2>
              <p className="text-lg opacity-90">Antwort innerhalb von 24 Stunden. Keine Verpflichtung.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-6">
              <QuoteForm
                productType="Personalisierte Badekappen Deutschland"
                title="Angebot anfordern"
                description="Füllen Sie das Formular aus und wir antworten innerhalb von 24 Stunden mit einem personalisierten Angebot."
                language="de"
              />
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-10 bg-gray-50">
          <div className="container">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Mehr von AquaEvents</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/de/events" className="text-blue-600 hover:underline text-sm font-medium">
                🏊 Schwimmveranstaltungen in Deutschland
              </Link>
              <Link href="/gorros-natacion" className="text-blue-600 hover:underline text-sm font-medium">
                🇪🇸 Gorros personalizados España
              </Link>
              <Link href="/gorros-natacion/silicona" className="text-blue-600 hover:underline text-sm font-medium">
                Silikon-Badekappen
              </Link>
              <Link href="/gorros-natacion/latex" className="text-blue-600 hover:underline text-sm font-medium">
                Latex-Badekappen
              </Link>
              <a href="https://euroswimcaps.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium">
                EuroSwimCaps.com →
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
