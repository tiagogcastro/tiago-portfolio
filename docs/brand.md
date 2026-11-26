# Tiago G Castro Brand

## Variants

### Mark

The standalone `[T<]` symbol. Use it when space is limited, such as the site header, app icons, and social avatars.

Files:

- `src/components/brand/Mark.tsx` for the interface
- `public/brand/tiago-g-castro-mark.png` for the favicon and web app manifest

### Lockup

The `[T<]` symbol combined with the `TIAGO G CASTRO` name. Use it in hero sections, footers, presentations, and documents where the name needs to be clear.

Files:

- `src/components/brand/BrandLockupLogo.tsx` for vector rendering in React
- `public/brand/tiago-g-castro-lockup.png`

## Colors

- Site background: `#141815`
- Surface: `#1b211d`
- Deep mineral: `#26372e`
- Mineral and borders: `#789987`
- Text: `#f2f0e8`
- Accent: `#c9aa70`

## Typography

- Fraunces is the display face for editorial titles and major statements.
- Familjen Grotesk is used for headings, body copy, labels, navigation, and controls.
- Do not introduce another font family without revisiting the complete site and Open Graph identity.

## Open Graph

Localized Open Graph artwork is exported as static 1200 x 630 PNG files in `public/og/`. Keep the same Fraunces and Familjen Grotesk identity when replacing those exports.

## Rules

- Keep the original proportions.
- Leave clear space around the logo.
- Do not rotate, stretch, recolor, or rearrange the static files.
- Use React SVG components for interface rendering. The favicon and manifest use the static PNG export. Keep raster exports in `public/brand/` updated when the source changes.
- AWS and Udemy files are third-party marks used only to identify their respective credentials. They are not part of the Tiago G Castro brand.
