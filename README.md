# AquaEvents.club

**Calendario Completo de Eventos Acuáticos en España 2026**

Plataforma web para descubrir y gestionar eventos de natación, triatlón, waterpolo y aguas abiertas en toda España.

## 🌊 Características

- **Calendario Actualizado**: Eventos oficiales de RFEN, FETRI y federaciones autonómicas
- **Búsqueda Avanzada**: Filtros por deporte, comunidad autónoma, fecha y categoría
- **Blog Educativo**: Guías, consejos y recursos para clubes y nadadores
- **Gorros Personalizados**: Servicio de personalización de gorros de natación para eventos
- **Notificaciones**: Suscripción a newsletter para recibir actualizaciones mensuales

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS 4
- **Backend**: Express + tRPC 11
- **Database**: MongoDB
- **Authentication**: Manus OAuth
- **Deployment**: Railway
- **UI Components**: shadcn/ui + Radix UI

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

## 🔧 Environment Variables

See `.env.example` for required environment variables.

Key variables:
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Session signing secret
- `OAUTH_SERVER_URL` - OAuth backend URL
- `VITE_APP_TITLE` - Application title
- `VITE_APP_LOGO` - Logo URL

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

This is a private project. For inquiries, contact admin@aquaevents.club

## 🌐 Live Site

Visit [aquaevents.club](https://aquaevents.club)
