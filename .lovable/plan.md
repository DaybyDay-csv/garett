# Salir de Shopify y recuperar el catálogo

## Situación confirmada

- La API de Shopify responde `402 Unavailable Shop`: la tienda está inactiva, por eso la web no muestra productos.
- En el proyecto solo están guardados los **textos editoriales** de las fichas (beneficios, cómo funciona, resultados, modo de uso) por categoría, en `src/lib/productContent.ts`.
- Los **datos de catálogo** (títulos, precios, imágenes, variantes, stock) nunca se guardaron en el proyecto: se leían en vivo desde Shopify. No se pueden recuperar desde el código.

## Cómo recuperar los productos

Orden de preferencia para obtener los datos originales:

1. **Exportar CSV desde el admin de Shopify** (recomendado). El panel de administración suele seguir accesible aunque la tienda esté congelada: Productos > Exportar > CSV con todos los productos. Ese CSV trae títulos, descripciones, precios, variantes y URLs de imágenes.
2. Si el admin ya no es accesible: reconstruir el catálogo a partir de copias archivadas de la web y de las imágenes que aún tengas, producto a producto. Es más lento y puede faltar información.

Tú aportas el CSV (o la lista de productos) y yo lo cargo en el sistema nuevo.

## Nuevo catálogo sin Shopify

- Catálogo propio en Lovable Cloud: tablas de productos, variantes e imágenes, con lectura pública y edición restringida a administradores.
- Importación del CSV a esas tablas, incluyendo la descarga de las imágenes al almacenamiento del proyecto para no depender del CDN de Shopify.
- Sustituir `src/lib/shopify.ts` por una capa de datos equivalente (`fetchProducts`, ficha por handle, búsqueda, categorías) para que Productos, Categoría, Detalle, Superventas, Novedades y Búsqueda sigan funcionando igual.
- Mantener intactos los textos de `productContent.ts`, las categorías y todo el diseño actual.

## Pago y checkout: decisión pendiente

Sin Shopify no hay checkout. Opciones cuando lleguemos a ese punto:

- **Stripe** integrado en la web (carrito propio + pago con tarjeta, Apple Pay, Google Pay).
- **Solo catálogo** por ahora: fichas y peticiones de información/WhatsApp, sin venta online.

## Detalles técnicos

- Retirar `@shopify` de la lógica de carrito (`src/stores/cartStore.ts`, `CartDrawer.tsx`) y de la creación de checkout.
- Las páginas seguirán usando la misma forma de datos (`{ node: { ... } }`) para minimizar cambios en componentes.
- El bloque de regalo (GWP) y los banners promocionales se adaptan al nuevo origen de precios.
- Desconectar la integración de Shopify del proyecto al final, una vez migrados los datos.

## Primer paso

Confírmame si puedes descargar el CSV de productos desde admin.shopify.com y qué prefieres para el pago (Stripe o solo catálogo).
