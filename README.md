# IDInteligentes — Landing Page

Landing page oficial de **IDInteligentes**, distribuidor de los gabinetes RFID médicos **Cykeo** en Argentina.

![IDInteligentes](assets/logo.svg)

## 🚀 Ver online (GitHub Pages)

Después de hacer push, activá GitHub Pages:

1. Andá al repositorio en GitHub → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` · **Folder:** `/root` (o `/landing` si subís solo la carpeta)
4. **Save** → en 1–2 min tu URL será:

   ```
   https://TU-USUARIO.github.io/TU-REPO/
   ```

## 📦 Qué incluye

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Página completa, 15 secciones, semántica HTML5 |
| `styles.css` | Sistema de diseño Apple + acentos amp, responsive |
| `script.js` | 8 módulos JS vanilla (reveal, galería, tabs, contadores, form) |
| `assets/logo.svg` | Logo horizontal completo (claro) |
| `assets/logo-white.svg` | Logo versión blanca (para fondos oscuros) |
| `assets/logo-mark.svg` | Solo isotipo (avatar / app icon) |
| `assets/favicon.svg` | Favicon |
| `assets/products/gy1b/` | 6 imágenes producto CK-GY1B |
| `assets/products/gy1a/` | 6 imágenes producto CK-GY1A |

## 🖥️ Ver localmente

Opción A — doble click:
```
Abrí index.html en el navegador
```

Opción B — servidor local (recomendado para que las fuentes carguen bien):
```bash
# Python
python -m http.server 8000
# después: http://localhost:8000

# Node
npx serve
```

## 🎨 Sistema de diseño

Basado en Apple (referencia principal) + amp (acentos secundarios):

- **Canvas:** `#f5f5f7` (frost)
- **Texto:** `#1d1d1f` (carbon)
- **CTA:** `#0071e3` (apple-blue, único color cromático de acción)
- **Botones:** pill 980px (filled + outlined, nunca 2 filled juntos)
- **Cards:** radio 8px, sin sombra — solo hairline borders
- **Sombra:** exclusiva en imágenes de producto

## ✨ Características

- ✅ Responsive (mobile-first, breakpoints 480/768/1024px)
- ✅ Accesibilidad WCAG 2.1 (focus visible, ARIA, nav por teclado)
- ✅ `prefers-reduced-motion` y `prefers-contrast: more`
- ✅ Animaciones reveal on scroll (IntersectionObserver)
- ✅ Galería de producto con thumbnails
- ✅ Tabs de especificaciones GY1B / GY1A
- ✅ Contadores animados
- ✅ FAQ accordion
- ✅ Formulario con validación

## 🇦🇷 Datos de la marca (editar)

Estos valores están en `index.html` — cambialos por los reales:

```html
ventas@idinteligentes.com.ar     <!-- footer + CTA mailto -->
+54 11 5555-5555                  <!-- footer -->
Buenos Aires, Argentina           <!-- footer -->
```

## 📝 Licencia

© 2026 IDInteligentes. Cykeo® es marca de Cykeo Information Technology Co., Ltd.
Todos los derechos reservados.
