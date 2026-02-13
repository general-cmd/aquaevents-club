import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Blog() {
  const { data, isLoading } = trpc.blog.list.useQuery();
  const { user } = useAuth();

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
                <a className="text-blue-600 font-medium">
                  Blog
                </a>
              </Link>
              <Link href="/enviar-evento">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Enviar Evento
                </a>
              </Link>
              <Link href="/perfil">
                <a className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Mi Perfil
                </a>
              </Link>
              {user && (
                <Link href="/blog/crear">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Artículo
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Blog AquaEvents
          </h1>
          <p className="text-lg text-gray-600">
            Guías, consejos y noticias sobre eventos acuáticos, entrenamiento y competición
          </p>
        </div>

        {/* Featured Static Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Guías Destacadas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Club Guide */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-blue-200">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/113670411/PrbJwnhUNXAvZWRT.jpg"
                alt="Guía para Presidentes de Club"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-600">Guía Práctica</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Guía para Presidentes de Club: Cómo Organizar un Pedido de 200 Gorros
                </h3>
                <p className="text-gray-600 mb-4">
                  Proceso paso a paso para coordinar diseño, aprobaciones, pagos y entregas sin complicaciones. Incluye checklist y ejemplos reales.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Ene 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    8 min lectura
                  </div>
                </div>
                <Link href="/blog/guia-pedido-gorros-club">
                  <Button variant="outline" className="w-full">
                    Leer guía completa
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Goggles Guide */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-blue-200">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/113670411/dIADXyiXhgpkLxBv.jpg"
                alt="Mejores Gafas de Natación 2026"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-blue-600">Equipo</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Las Mejores Gafas de Natación 2026: Guía Completa
                </h3>
                <p className="text-gray-600 mb-4">
                  Análisis detallado de las mejores gafas para piscina y aguas abiertas. Comparativa de Speedo, Arena y Aqua Sphere con precios.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Ene 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    12 min lectura
                  </div>
                </div>
                <Link href="/blog/mejores-gafas-natacion-2026">
                  <Button variant="outline" className="w-full">
                    Ver comparativa
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Wetsuit Guide */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-blue-200">
              <img 
                src="https://files.manuscdn.com/user_upload_by_module/session_file/113670411/yDtzKeCtijeeJqtf.jpg"
                alt="Cómo Elegir Neopreno para Aguas Abiertas"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-cyan-600">Aguas Abiertas</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Cómo Elegir Traje de Neopreno para Aguas Abiertas
                </h3>
                <p className="text-gray-600 mb-4">
                  Guía definitiva para elegir tu neopreno perfecto. Grosor, ajuste, flotabilidad y comparativa de marcas top para triatlón.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Ene 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    10 min lectura
                  </div>
                </div>
                <Link href="/blog/neopreno-aguas-abiertas">
                  <Button variant="outline" className="w-full">
                    Leer guía
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Competition Prep */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-purple-200">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-1_1770939992000_na1fn_YmxvZy1wcmVwYXJhY2lvbi1jb21wZXRpY2lvbmVzLWhlcm8uanBn.jpg"
                alt="Preparación Profesional para Competiciones"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-purple-600">Competición</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Preparación Profesional para Competiciones de Natación
                </h3>
                <p className="text-gray-600 mb-4">
                  Guía completa de entrenamiento, nutrición y estrategia mental para competir al máximo nivel.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Feb 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    11 min lectura
                  </div>
                </div>
                <Link href="/blog/preparacion-profesional-competiciones">
                  <Button variant="outline" className="w-full">
                    Leer guía
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Grants Guide */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-green-200">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-2_1770939992000_na1fn_YmxvZy1zdWJ2ZW5jaW9uZXMtY2x1YmVzLWhlcm8uanBn.jpg"
                alt="Guía de Subvenciones para Clubes 2026"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-600">Clubes</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Guía de Subvenciones para Clubes Deportivos 2026
                </h3>
                <p className="text-gray-600 mb-4">
                  Todas las ayudas disponibles para clubes de natación: cómo solicitarlas, requisitos y plazos.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Feb 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    10 min lectura
                  </div>
                </div>
                <Link href="/blog/guia-subvenciones-clubes-2026">
                  <Button variant="outline" className="w-full">
                    Ver subvenciones
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Open Water Benefits */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-teal-200">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-3_1770939992000_na1fn_YmxvZy1hZ3Vhcy1hYmllcnRhcy1oZXJvLmpwZw.jpg"
                alt="Beneficios de la Natación en Aguas Abiertas"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-teal-600">Aguas Abiertas</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Beneficios de la Natación en Aguas Abiertas
                </h3>
                <p className="text-gray-600 mb-4">
                  Descubre por qué nadar en aguas abiertas mejora tu salud física y mental más que la piscina.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Feb 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    8 min lectura
                  </div>
                </div>
                <Link href="/blog/beneficios-natacion-aguas-abiertas">
                  <Button variant="outline" className="w-full">
                    Leer artículo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Turn Techniques */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-orange-200">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-4_1770939992000_na1fn_YmxvZy12aXJhamUtaGVyby5qcGc.jpg"
                alt="Técnicas Avanzadas de Viraje"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-orange-600">Técnica</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Técnicas Avanzadas de Viraje en Natación
                </h3>
                <p className="text-gray-600 mb-4">
                  Domina los virajes de volteo y mejora tus tiempos con estas técnicas profesionales.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Feb 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    7 min lectura
                  </div>
                </div>
                <Link href="/blog/tecnicas-avanzadas-viraje">
                  <Button variant="outline" className="w-full">
                    Ver técnicas
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Choose Competition */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-pink-200">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-5_1770939992000_na1fn_YmxvZy1lbGVnaXItY29tcGV0aWNpb24taGVyby5qcGc.jpg"
                alt="Elegir Competición según Nivel"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-pink-600">Competición</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Cómo Elegir la Competición Adecuada según tu Nivel
                </h3>
                <p className="text-gray-600 mb-4">
                  Guía para principiantes e intermedios: qué competiciones elegir y cómo prepararte.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Feb 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    9 min lectura
                  </div>
                </div>
                <Link href="/blog/elegir-competicion-segun-nivel">
                  <Button variant="outline" className="w-full">
                    Leer guía
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Nutrition */}
            <Card className="hover:shadow-lg transition-shadow overflow-hidden border-2 border-green-200">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/3SpND3cLoLaQvUxJEwnvJQ/sandbox/Jz8IZlQ8YdP0LKqJv1YYB0-img-6_1770939992000_na1fn_YmxvZy1udXRyaWNpb24tbmFkYWRvcmVzLWhlcm8uanBn.jpg"
                alt="Nutrición para Nadadores"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-600">Nutrición</Badge>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Nutrición para Nadadores de Alto Rendimiento
                </h3>
                <p className="text-gray-600 mb-4">
                  Plan nutricional completo para maximizar rendimiento y recuperación en natación.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Feb 2026
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    13 min lectura
                  </div>
                </div>
                <Link href="/blog/nutricion-nadadores-alto-rendimiento">
                  <Button variant="outline" className="w-full">
                    Ver plan nutricional
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Cargando artículos...</p>
          </div>
        ) : data?.posts && data.posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.posts.map((post: any) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                {post.coverImage && (
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  {post.category && (
                    <Badge className="mb-3">{post.category}</Badge>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  
                  {post.publishedAt && (
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  )}

                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" className="w-full">
                      Leer más
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                Próximamente
              </h3>
              <p className="text-gray-600 mb-6">
                Estamos preparando contenido de calidad sobre deportes acuáticos, entrenamiento y competición.
              </p>
              {user && (
                <Link href="/blog/crear">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Primer Artículo
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}

