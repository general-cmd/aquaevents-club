import { Link, useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, ArrowLeft, Share2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data, isLoading } = trpc.blog.getBySlug.useQuery({ slug });
  const post = data?.post;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Artículo no encontrado</h2>
            <p className="text-gray-600 mb-6">
              El artículo que buscas no existe o ha sido eliminado.
            </p>
            <Link href="/blog">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-500">
                Ver todos los artículos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img src="/logo.png" alt="AquaEvents.club" className="w-12 h-12" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AquaEvents.club
                </span>
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link href="/blog">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">{post.title}</span>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Blog
            </Button>
          </Link>

          {post.coverImage && (
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
          )}

          {/* Schema.org markup for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                description: post.metaDescription || post.excerpt,
                image: post.coverImage ? `https://aquaevents.club${post.coverImage}` : undefined,
                datePublished: post.publishedAt,
                dateModified: post.updatedAt || post.publishedAt,
                author: {
                  "@type": "Organization",
                  name: "AquaEvents.club"
                },
                publisher: {
                  "@type": "Organization",
                  name: "AquaEvents.club",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://aquaevents.club/logo.png"
                  }
                }
              })
            }}
          />

          <div className="flex items-center gap-4 mb-6">
            {post.category && <Badge>{post.category}</Badge>}
            {post.publishedAt && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                  year: 'numeric'
                })}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">¿Te ha gustado este artículo?</h3>
                  <p className="text-sm text-gray-600">Compártelo con tu comunidad acuática</p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt || post.title,
                        url: window.location.href
                      });
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
}

