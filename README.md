# G-TECH — Performance Architects

Landing page para G-TECH, servicios técnicos especializados en hardware y software para maximizar rendimiento gaming (FPS).

## 📦 Qué incluye este paquete

```
gtech-website/
├── out/                    ← 🚀 SITIO PRE-COMPILADO (¡abrí out/index.html!)
├── src/                    ← Código fuente (por si querés editar)
├── public/                 ← Imágenes originales
├── .github/workflows/      ← Deploy automático a GitHub Pages
├── package.json
├── next.config.ts
└── README.md
```

## ⚡ Ver la página ahora (sin instalar nada)

1. Descomprimí el zip
2. Abrí la carpeta `out/`
3. Doble click en `index.html` → se abre en tu navegador

Listo. No necesita servidor ni dependencias.

## 🚀 Publicar en GitHub Pages (gratis)

1. Creá un repo nuevo en GitHub llamado `gtech-website`
2. Subí TODO el contenido de esta carpeta al repo:
   ```bash
   cd gtech-website
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/gtech-website.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source: GitHub Actions**
4. El workflow `.github/workflows/deploy.yml` se ejecuta automáticamente
5. En 1-2 min tu sitio está online en: `https://TU-USUARIO.github.io/gtech-website/`

## 🌐 Publicar en Vercel (recomendado, dominio propio)

1. Subí el repo a GitHub (igual que arriba)
2. Entrá a https://vercel.com/new
3. Importá el repo
4. Framework: Next.js (autodetectado)
5. Click **Deploy**
6. Listo. Te da URL tipo `gtech.vercel.app` (gratis + HTTPS + CDN)

> En Vercel podés conectar dominio propio tipo `gtech.com.ar` gratis.

## 🛠 Editar el código (opcional)

Si querés modificar textos, colores o agregar secciones:

```bash
cd gtech-website
bun install          # o: npm install
bun run dev          # servidor de desarrollo en http://localhost:3000
```

Hacé cambios, mirá el preview, y cuando estés listo:

```bash
bun run build        # regenera la carpeta out/
```

## 📝 Personalización rápida

### WhatsApp (número real)
Buscar y reemplazar `5491100000000` por tu número en:
- `src/components/gtech/navbar.tsx`
- `src/components/gtech/hero.tsx`
- `src/components/gtech/dual-audience.tsx`
- `src/components/gtech/services.tsx`
- `src/components/gtech/contact.tsx`
- `src/components/gtech/footer.tsx`

Después corré `bun run build` para regenerar `out/`.

### Precios
`TIERS[].price` en `src/components/gtech/services.tsx`

### Imágenes
Reemplazá los PNG en `public/images/` con fotos reales de tus trabajos.

### Instagram
`INSTAGRAM_URL` en `src/components/gtech/footer.tsx`

## 🎨 Stack técnico

- **Next.js 16** (App Router, static export)
- **TypeScript 5**
- **Tailwind CSS 4** + shadcn/ui
- **Lucide React** (iconos)
- **Fonts**: PODIUM Sharp (headings) + Inter (body)
- **Paleta G-TECH**: Electric Blue `#2f67ff`, Deep Midnight `#11131c`, Cyber Grey `#373942`

## 📐 Estructura de la página

Single-page scroll con 7 secciones:
1. **Hero** — fullscreen con imagen gaming PC + animación Ken Burns
2. **Dual Audience** — Empresas vs Particulares
3. **Servicios** — 3 tier cards + tabla comparativa (16 features)
4. **Galería** — sliders before/after interactivos
5. **Academy** — artículos + glosario técnico
6. **Contacto** — formulario que deriva a WhatsApp pre-cargado
7. **Footer** — links sociales + botón flotante WhatsApp

## 🔧 Problemas comunes

**"Las imágenes no cargan al abrir index.html"**
- Asegurate de abrir el `index.html` que está DENTRO de la carpeta `out/`, no el del root del proyecto.

**"GitHub Pages muestra 404"**
- Verificá que en Settings → Pages el Source sea "GitHub Actions"
- Esperá 1-2 minutos al primer deploy
- El URL es `https://TU-USUARIO.github.io/gtech-website/` (con el nombre exacto del repo)

**"Quiero deployar en dominio propio"**
- Usá Vercel (gratis) y conectá tu dominio en Settings → Domains

## Licencia

Código entregado a G-TECH. Tipografía PODIUM Sharp cargada desde CDN — verificar licencia antes de uso comercial.
