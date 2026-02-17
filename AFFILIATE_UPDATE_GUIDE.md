# 📝 Guía para Actualizar Afiliados

## ⚠️ IMPORTANTE: Un Solo Archivo para Todas las Actualizaciones

Cuando necesites actualizar banners de Awin o productos de Amazon, **SOLO edita este archivo**:

```
/client/src/config/affiliateConfig.tsx
```

**NO edites** componentes individuales como `AwinBanner.tsx`, `BlogAffiliateSection.tsx`, o `RecommendedGear.tsx` - todos obtienen sus datos del archivo de configuración centralizado.

---

## 🔄 Cómo Actualizar el Banner de Awin (365Rider)

### Opción 1: Código HTML Completo

Si 365Rider te da un nuevo código HTML completo:

1. Abre `/client/src/config/affiliateConfig.tsx`
2. Busca la sección `AWIN_BANNER_CONFIG`
3. Reemplaza el contenido de `bannerHTML` con el nuevo código

```typescript
export const AWIN_BANNER_CONFIG = {
  bannerHTML: `
    <!-- PEGA AQUÍ EL NUEVO CÓDIGO DE AWIN -->
    <a rel="sponsored" href="https://...">
        <img src="https://..." border="0">
    </a>
  `,
```

### Opción 2: URLs Individuales

Si solo tienes las URLs:

1. Abre `/client/src/config/affiliateConfig.tsx`
2. Actualiza `clickUrl` e `imageUrl`:

```typescript
export const AWIN_BANNER_CONFIG = {
  clickUrl: "https://www.awin1.com/cread.php?s=NUEVO_CODIGO",
  imageUrl: "https://www.awin1.com/cshow.php?s=NUEVO_CODIGO",
  altText: "365Rider - Descripción de la oferta"
};
```

3. Guarda el archivo
4. Haz commit y push a GitHub
5. Railway desplegará automáticamente

---

## 🛍️ Cómo Actualizar Productos de Amazon

### Actualizar Precio de un Producto

1. Abre `/client/src/config/affiliateConfig.tsx`
2. Busca el producto (por ejemplo, `SPEEDO_BIOFUSE`)
3. Actualiza el campo `price`:

```typescript
SPEEDO_BIOFUSE: {
  title: "Speedo Biofuse 2.0 Gafas",
  description: "...",
  imageUrl: "...",
  amazonUrl: "https://amzn.to/46smj9R",
  price: "€85.00",  // ← CAMBIA AQUÍ
  rating: 4.6,
  reviewCount: 1047,
  asin: "B0DRNXT7CP"
}
```

### Actualizar Enlace de Afiliado

Si Amazon cambia el enlace corto (amzn.to):

```typescript
SPEEDO_BIOFUSE: {
  // ...
  amazonUrl: "https://amzn.to/NUEVO_CODIGO",  // ← CAMBIA AQUÍ
  // ...
}
```

### Actualizar Imagen del Producto

Si necesitas cambiar la imagen:

1. Sube la nueva imagen a CDN usando `manus-upload-file`
2. Copia la URL devuelta
3. Actualiza `imageUrl`:

```typescript
SPEEDO_BIOFUSE: {
  // ...
  imageUrl: "https://files.manuscdn.com/NUEVA_URL.png",  // ← CAMBIA AQUÍ
  // ...
}
```

### Añadir un Nuevo Producto

1. Abre `/client/src/config/affiliateConfig.tsx`
2. Añade una nueva entrada en `AMAZON_PRODUCTS`:

```typescript
export const AMAZON_PRODUCTS = {
  // ... productos existentes ...
  
  NUEVO_PRODUCTO: {
    title: "Nombre del Producto",
    description: "Descripción breve",
    imageUrl: "https://files.manuscdn.com/...",
    amazonUrl: "https://amzn.to/...",
    price: "€XX.XX",
    rating: 4.5,
    reviewCount: 100,
    asin: "B0XXXXXXXX"
  }
};
```

3. Luego añádelo a las categorías relevantes:

```typescript
export function getProductsByCategory(category: ...) {
  const categoryMap = {
    goggles: ['SPEEDO_BIOFUSE', 'NUEVO_PRODUCTO'],  // ← AÑADE AQUÍ
    // ...
  };
}
```

---

## 🚀 Después de Hacer Cambios

1. **Guarda el archivo** `/client/src/config/affiliateConfig.tsx`
2. **Haz commit**:
   ```bash
   git add client/src/config/affiliateConfig.tsx
   git commit -m "Actualizar productos/banners de afiliados"
   ```
3. **Push a GitHub**:
   ```bash
   git push github main
   ```
4. **Railway desplegará automáticamente** en 2-3 minutos

---

## 📍 Dónde se Muestran los Afiliados

### Banner de Awin (365Rider)
- ✅ Páginas de eventos de triatlón/duatlón
- ✅ Blogs sobre triatlón/ciclismo

### Productos de Amazon
- ✅ Páginas de eventos de natación (piscina/aguas abiertas)
- ✅ Todos los blogs (productos contextuales según tema)
- ✅ Pop-ups de productos en eventos
- ✅ Sección "Material Recomendado"

---

## ❓ Preguntas Frecuentes

**P: ¿Puedo editar los componentes directamente?**  
R: NO. Siempre edita `/client/src/config/affiliateConfig.tsx`

**P: ¿Cómo sé qué productos mostrar en cada blog?**  
R: Los blogs usan product sets predefinidos (SWIMMING_TRAINING_PRODUCTS, OPEN_WATER_PRODUCTS, etc.) que puedes modificar en el mismo archivo de configuración.

**P: ¿Qué pasa si el banner de Awin no se ve?**  
R: Verifica que las URLs en `AWIN_BANNER_CONFIG` sean correctas y que la imagen sea accesible públicamente.

**P: ¿Cómo actualizo todos los precios a la vez?**  
R: Edita cada producto en `AMAZON_PRODUCTS` uno por uno, o usa buscar/reemplazar si el cambio es sistemático.

---

## 📞 Soporte

Si tienes dudas, consulta este archivo primero. Todos los cambios de afiliados se hacen en **UN SOLO LUGAR**: `/client/src/config/affiliateConfig.tsx`
