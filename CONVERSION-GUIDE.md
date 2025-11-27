# 🎬 Guía de Conversión: WebM (Videos) y WebP (Imágenes)

## 📊 Beneficios Esperados

- **Videos WebM**: 40-60% menos tamaño que MP4
- **Imágenes WebP**: 25-35% menos tamaño que JPG/PNG
- **Resultado**: Carga 2-3x más rápida

---

## 🎥 PARTE 1: Convertir Videos MP4 → WebM

### Videos a Convertir:
```
public/videos/
├── aeroglow-product.mp4
├── ugc-aina.mp4
├── ugc-video-1.mov
├── ugc-video-2.mp4
├── ugc-video-3.mov
├── ugc-video-4.mov
└── ugc-video-5.mov
```

### Opción A: Herramienta Online (Más Fácil)

1. **CloudConvert** (recomendado): https://cloudconvert.com/mp4-to-webm
   - Arrastra todos los videos
   - Configuración:
     - Codec de video: VP9
     - Calidad: 85%
     - Codec de audio: Opus
   - Descarga todos como ZIP

2. **FreeConvert**: https://www.freeconvert.com/mp4-to-webm
   - Similar a CloudConvert
   - Límite: 1GB por archivo

### Opción B: Línea de Comandos (Más Control)

**Instalar FFmpeg:**
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# Windows
# Descarga desde: https://ffmpeg.org/download.html
```

**Convertir un video:**
```bash
ffmpeg -i aeroglow-product.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus aeroglow-product.webm
```

**Convertir todos los videos de una carpeta:**
```bash
cd public/videos

# Para archivos .mp4
for video in *.mp4; do
  ffmpeg -i "$video" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${video%.mp4}.webm"
done

# Para archivos .mov
for video in *.mov; do
  ffmpeg -i "$video" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "${video%.mov}.webm"
done
```

**Parámetros explicados:**
- `-c:v libvpx-vp9`: Codec VP9 (mejor compresión)
- `-crf 30`: Calidad constante (23-32 = buena calidad, menor tamaño)
- `-b:v 0`: Bitrate automático
- `-c:a libopus`: Audio Opus (mejor que MP3/AAC)

### Resultado Esperado:
```
public/videos/
├── aeroglow-product.mp4      (original - 5MB)
├── aeroglow-product.webm     (nuevo - 2MB) ✨
├── ugc-video-1.mp4
├── ugc-video-1.webm          ✨
...
```

---

## 🖼️ PARTE 2: Convertir Imágenes JPG/PNG → WebP

### Imágenes a Convertir:

**Categorías (Mayor impacto - 2MB cada una):**
```
src/assets/
├── category-corporales.jpg (2.8 MB)
├── category-cuidado-capilar.jpg (2.0 MB)
├── category-limpieza-facial.jpg (1.9 MB)
├── category-depilacion-ipl.jpg (1.8 MB)
├── category-masajeadores-faciales.jpg (1.8 MB)
├── category-mesoterapia.jpg (1.7 MB)
```

**UGC Content:**
```
src/assets/ugc/
├── ugc-1.jpg (240 KB)
├── ugc-2.jpg (121 KB)
├── ugc-3.jpg (46 KB)
├── ugc-4.jpg (202 KB)
└── ugc-5.jpg (345 KB)
```

### Opción A: Herramienta Online

1. **Squoosh.app** (recomendado): https://squoosh.app/
   - Arrastra imagen
   - Selecciona "WebP" a la derecha
   - Ajusta calidad: 85%
   - Descarga

2. **CloudConvert**: https://cloudconvert.com/jpg-to-webp
   - Subir múltiples archivos
   - Calidad: 85%
   - Descargar ZIP

### Opción B: Línea de Comandos

**Instalar cwebp:**
```bash
# macOS
brew install webp

# Ubuntu/Debian
sudo apt-get install webp

# Windows
# Descarga desde: https://developers.google.com/speed/webp/download
```

**Convertir todas las imágenes:**
```bash
cd src/assets

# Convertir todas las JPG
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done

# Convertir todas las PNG
for img in *.png; do
  cwebp -q 85 "$img" -o "${img%.png}.webp"
done

# Carpeta UGC
cd ugc
for img in *.jpg; do
  cwebp -q 85 "$img" -o "${img%.jpg}.webp"
done
```

---

## 📁 Estructura Final

Después de la conversión, mantén ambos formatos:

```
public/videos/
├── aeroglow-product.mp4      (fallback)
├── aeroglow-product.webm     (preferido) ✨
└── ...

src/assets/
├── category-corporales.jpg   (fallback)
├── category-corporales.webp  (preferido) ✨
└── ...
```

---

## 🔧 Cómo Usar los Nuevos Formatos

### Para Videos:

```tsx
// Antes
<VideoPlayer 
  src="/videos/aeroglow-product.mp4"
  poster={aeroglowHero}
/>

// Después (con WebM)
<VideoPlayer 
  src="/videos/aeroglow-product.mp4"
  srcWebM="/videos/aeroglow-product.webm"  // ✨ Nuevo
  poster={aeroglowHero}
/>
```

El navegador automáticamente:
1. Intenta cargar WebM primero (mejor compresión)
2. Si no es compatible, usa MP4 (fallback)

### Para Imágenes:

El componente `OptimizedImage` ya soporta WebP automáticamente:

```tsx
// Ya funciona automáticamente
<OptimizedImage 
  src={categoryImage}  // Busca .webp primero, luego .jpg
  alt="Categoría"
/>
```

---

## ✅ Checklist de Conversión

### Videos (WebM):
- [ ] Convertir aeroglow-product.mp4 → .webm
- [ ] Convertir ugc-aina.mp4 → .webm
- [ ] Convertir ugc-video-1.mov → .webm
- [ ] Convertir ugc-video-2.mp4 → .webm
- [ ] Convertir ugc-video-3.mov → .webm
- [ ] Convertir ugc-video-4.mov → .webm
- [ ] Convertir ugc-video-5.mov → .webm
- [ ] Colocar archivos .webm en public/videos/
- [ ] Actualizar componentes para usar srcWebM

### Imágenes (WebP):
- [ ] Convertir category-corporales.jpg → .webp
- [ ] Convertir category-cuidado-capilar.jpg → .webp
- [ ] Convertir category-limpieza-facial.jpg → .webp
- [ ] Convertir category-depilacion-ipl.jpg → .webp
- [ ] Convertir category-masajeadores-faciales.jpg → .webp
- [ ] Convertir category-mesoterapia.jpg → .webp
- [ ] Convertir ugc/*.jpg → .webp
- [ ] Colocar archivos .webp junto a originales
- [ ] ✅ El código ya soporta WebP automáticamente

---

## 📈 Verificar Mejoras

Después de la conversión:

1. **PageSpeed Insights**: https://pagespeed.web.dev/
2. **GTmetrix**: https://gtmetrix.com/
3. Compara tamaños de archivo antes/después

### Métricas Esperadas:
- **LCP** (Largest Contentful Paint): -30-40%
- **Total Blocking Time**: -20-30%
- **Peso total página**: -40-50%

---

## ⚠️ Notas Importantes

1. **NO elimines los archivos originales** - son necesarios como fallback
2. **Mantén el mismo nombre** - solo cambia la extensión
3. **Misma ubicación** - coloca WebM/WebP junto a originales
4. **Calidad 85%** - balance perfecto entre tamaño y calidad
5. **WebM para videos** / **WebP para imágenes** - no confundir

---

## 🆘 Soporte

- **Documentación FFmpeg**: https://ffmpeg.org/documentation.html
- **Documentación WebP**: https://developers.google.com/speed/webp
- **Compatibility**: 
  - WebM: 96% navegadores (Chrome, Firefox, Edge, Safari 14.1+)
  - WebP: 97% navegadores (todos modernos)
