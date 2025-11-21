# Guía de Optimización de Imágenes

## 📊 Resumen de Optimización

El sitio ha sido optimizado para cargar imágenes de manera eficiente con:
- ✅ Lazy loading automático
- ✅ Decodificación asíncrona
- ✅ Soporte para formato WebP
- ✅ Textos alternativos mejorados para SEO

## 🎯 Ahorro Potencial: 12,537 KiB

### Imágenes que requieren conversión a WebP

#### Categorías (Mayor impacto)
1. **category-corporales.jpg** (2.8 MB) → Ahorro: ~2.5 MB
2. **category-cuidado-capilar.jpg** (2.0 MB) → Ahorro: ~1.8 MB
3. **category-limpieza-facial.jpg** (1.9 MB) → Ahorro: ~1.7 MB
4. **category-depilacion-ipl.jpg** (1.8 MB) → Ahorro: ~1.6 MB
5. **category-masajeadores-faciales.jpg** (1.8 MB) → Ahorro: ~1.6 MB
6. **category-mesoterapia.jpg** (1.7 MB) → Ahorro: ~1.5 MB

#### UGC Content
7. **ugc-5.jpg** (345 KB) → Ahorro: ~280 KB
8. **ugc-1.jpg** (240 KB) → Ahorro: ~190 KB
9. **ugc-4.jpg** (202 KB) → Ahorro: ~160 KB
10. **ugc-2.jpg** (121 KB) → Ahorro: ~95 KB
11. **ugc-3.jpg** (46 KB) → Ahorro: ~35 KB

## 🛠️ Cómo Convertir tus Imágenes a WebP

### Opción 1: Herramienta Online (Más Fácil)
1. Ve a **[Squoosh.app](https://squoosh.app/)** (herramienta gratuita de Google)
2. Arrastra tu imagen JPG
3. Selecciona "WebP" en el panel derecho
4. Ajusta la calidad (recomendado: 80-85%)
5. Descarga la imagen optimizada

### Opción 2: Conversión por Lotes (Recomendado)
Usa **[CloudConvert](https://cloudconvert.com/jpg-to-webp)** para convertir múltiples imágenes:
1. Sube todas las imágenes JPG de una categoría
2. Selecciona WebP como formato de salida
3. Configura calidad: 85%
4. Descarga el archivo ZIP con todas las imágenes convertidas

### Opción 3: Línea de Comandos (Para Desarrolladores)
Instala `cwebp`:
```bash
# macOS
brew install webp

# Ubuntu/Debian
sudo apt-get install webp

# Windows
# Descarga desde: https://developers.google.com/speed/webp/download
```

Convertir una imagen:
```bash
cwebp -q 85 input.jpg -o output.webp
```

Convertir todas las imágenes de una carpeta:
```bash
for img in *.jpg; do cwebp -q 85 "$img" -o "${img%.jpg}.webp"; done
```

## 📁 Estructura de Archivos

Después de la conversión, mantén ambos formatos:
```
src/assets/
├── category-corporales.jpg      (original, para fallback)
├── category-corporales.webp     (optimizado, carga primero)
├── category-cuidado-capilar.jpg
├── category-cuidado-capilar.webp
└── ...
```

## ✨ Cómo Funciona

El componente `OptimizedImage` ya implementado:
1. Intenta cargar la versión WebP primero
2. Si el navegador no soporta WebP, usa la imagen original JPG
3. Aplica lazy loading automático
4. Usa decodificación asíncrona para mejor rendimiento

## 🎨 Configuración de Calidad Recomendada

- **Calidad 85%**: Balance perfecto entre tamaño y calidad visual
- **Calidad 75%**: Para imágenes donde el tamaño es crítico
- **Calidad 90%**: Para imágenes hero o productos principales

## 📈 Beneficios Esperados

Después de convertir todas las imágenes a WebP:
- ⚡ **60-70% reducción** en tamaño de archivo
- 🚀 **Mejora de 2-3 segundos** en tiempo de carga
- 📱 **Mejor experiencia móvil** (menos datos consumidos)
- 🎯 **Mejor SEO** (Page Speed Score +10-15 puntos)

## ⚠️ Notas Importantes

1. **Mantén los archivos originales**: El componente usa JPG como fallback
2. **Mismo nombre de archivo**: `imagen.jpg` → `imagen.webp`
3. **Misma ubicación**: Coloca los WebP en la misma carpeta que los originales
4. **No elimines los JPG**: Son necesarios para navegadores antiguos

## 🔄 Proceso Completo

1. Descarga tus imágenes actuales de `src/assets/`
2. Conviértelas a WebP con calidad 85%
3. Coloca los archivos `.webp` junto a los `.jpg` originales
4. El sitio automáticamente usará WebP cuando esté disponible
5. ¡Verifica la mejora en la velocidad!

## 📞 Soporte

Si tienes dudas sobre la optimización de imágenes, revisa:
- [Documentación de WebP](https://developers.google.com/speed/webp)
- [Guía de Squoosh](https://web.dev/squoosh-v2/)
- [Best Practices para Imágenes Web](https://web.dev/fast/#optimize-your-images)
