# Identificaciones Inteligentes — Landing Page

Landing page profesional lista para publicar en GitHub Pages.

## Características

- Diseño Apple-inspired minimalista con iconos SVG
- Modo claro/oscuro con toggle persistente
- 100% responsive (mobile-first)
- HTML accesible (semántico, ARIA, alt en imágenes)
- SEO optimizado (meta tags, Open Graph)
- Sin dependencias (HTML + CSS + JS puro)
- Imágenes incluidas en `assets/`

## Estructura

```
├── index.html      # Página principal
├── styles.css      # Estilos responsive con dark mode
├── script.js       # Interactividad (dark mode, menú, formulario)
├── assets/
│   ├── hero.jpg
│   ├── product-tablet.jpg
│   ├── product-captura.jpg
│   └── product-impresora.jpg
├── .gitignore
├── README.md
└── LICENSE
```

## Uso local

Descomprime el ZIP y abre `index.html` en tu navegador.

O con un servidor local:
```bash
python -m http.server 8000
```
Abre `http://localhost:8000`

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub
2. Sube todos los archivos (incluida la carpeta `assets/`)
3. Ve a Settings → Pages
4. Source: Deploy from a branch
5. Branch: main → / (root)
6. Save
7. Tu sitio estará en `https://TU-USUARIO.github.io/NOMBRE-REPO/`

## Licencia

MIT License. Contenido © 2012 Identificacines Inteligentes S.R.L.
