# AGENTS.md

Guía de contexto para agentes que trabajen en este repositorio. Resume el plan de la prueba técnica
y las reglas que mantienen la app coherente.

Enunciado original: `Prueba_Tecnica_Frontend.pdf` (local, excluido del repositorio).

## 1. Contexto

**Mini Catálogo** es una prueba técnica Frontend: consumir `https://dummyjson.com/products?limit=20`,
listar productos en tarjetas, permitir búsqueda por título y marcar favoritos. El objetivo del
ejercicio es demostrar React con hooks, Tailwind CSS, manejo de estados asíncronos y un flujo Git con
commits descriptivos y Pull Request.

## 2. Alcance

Obligatorio:

- Tarjetas con imagen, título, precio y categoría.
- Estados de carga y error con mensaje claro.
- Búsqueda en tiempo real por título y mensaje de "sin resultados".
- Favoritos con botón por tarjeta y contador visible en el header.
- Grilla responsive: 1 / 2 / 3–4 columnas.

Bonus (implementados):

- Favoritos persistentes en `localStorage`.
- Custom hooks `useProducts`, `useFavorites` y `useDebounce`.
- Debounce de 250 ms en la búsqueda.
- Filtro por categoría.

Pendiente (requiere cuentas externas): despliegue en Render y creación del repositorio/PR en GitHub.

## 3. Stack

- React 19 (componentes funcionales + hooks, JSX).
- Vite 8 (`@vitejs/plugin-react`).
- Tailwind CSS 4 mediante `@tailwindcss/vite`; no existe `tailwind.config.js`.
- JavaScript moderno, sin TypeScript.

## 4. Comandos

| Comando           | Uso                                          |
| ----------------- | -------------------------------------------- |
| `npm install`     | Instala dependencias                         |
| `npm run dev`     | Desarrollo en `http://localhost:5173`        |
| `npm run build`   | Build de producción en `dist/`               |
| `npm run preview` | Verifica el build localmente                 |

No hay tests ni linter configurados. Si se agregan, documentarlos aquí y actualizar `package.json`.

## 5. Arquitectura y flujo de datos

```text
useProducts ──► App (products, loading, error, retry)
                  │
                  ├─ useDebounce(search)
                  ├─ useFavorites ◄─► localStorage
                  │
                  ├─ Header (favoritesCount)
                  ├─ SearchBar / CategoryFilter
                  ├─ ProductSkeleton (loading)
                  ├─ StatusMessage (error / vacío)
                  └─ ProductGrid ──► ProductCard (isFavorite, onToggleFavorite)
```

| Archivo | Responsabilidad |
| --- | --- |
| `src/api/products.js` | Único lugar con `fetch`; valida `response.ok` y la forma de la respuesta. |
| `src/hooks/useProducts.js` | Carga inicial, `AbortController`, estados `loading`/`error` y `retry`. |
| `src/hooks/useFavorites.js` | Lista de IDs favoritos, `toggleFavorite`, `isFavorite`, persistencia. |
| `src/hooks/useDebounce.js` | Debounce genérico (250 ms por defecto). |
| `src/App.jsx` | Estados de búsqueda/categoría, filtrado con `useMemo`, composición. |
| `src/components/*` | UI presentacional; solo `ProductCard` conoce el botón de favorito. |
| `src/utils/format.js` | `formatPrice` (USD) y `formatCategory`. |

## 6. Reglas de implementación

- **Estilos**: solo clases de Tailwind. `src/index.css` se limita a `@import "tailwindcss"`, `@theme`
  y base global mínima. No crear archivos CSS por componente.
- **Datos**: ninguna llamada a `fetch` fuera de `src/api/`. Los componentes no conocen URLs.
- **Favoritos**: siempre a través de `useFavorites`; no manipular `localStorage` desde componentes.
- **Idioma**: textos de interfaz y comentarios en español.
- **Componentes**: funcionales, con props explícitas y nombres en PascalCase. Mantener al menos la
  separación actual (`Header`, `SearchBar`, `CategoryFilter`, `ProductCard`, `ProductGrid`,
  `ProductSkeleton`, `StatusMessage`).
- **Accesibilidad**: conservar `aria-pressed` en favoritos, `aria-live` en contadores, `label` en
  inputs/selects, `alt` en imágenes y estilos de foco visibles.
- **Dependencias**: no agregar librerías de UI, estado o fetching sin justificarlo; el reto valora
  código limpio y mínimo.
- **Formato**: sin punto y coma, comillas simples, 2 espacios (consistente con el código existente).
- **PDF**: `Prueba_Tecnica_Frontend.pdf` está en `.gitignore`; no debe volver a commitearse.

## 7. Plan de trabajo y estado

1. ✅ Scaffold Vite + React + Tailwind, `.gitignore` y `.gitattributes`.
2. ✅ Cliente de API y `useProducts` con carga/error/reintento.
3. ✅ Catálogo base: `Header`, `SearchBar`, `ProductCard`, `ProductGrid`, skeletons y estados.
4. ✅ Favoritos: `useFavorites`, botón con `aria-pressed`, contador y `localStorage`.
5. ✅ Filtro por categoría y debounce en la búsqueda.
6. ✅ Pulido responsive (4 columnas en `xl`), skip link y footer.
7. ✅ Documentación (`README.md` + este archivo).
8. ⏳ Push a GitHub, Pull Request `feature/catalogo` → `main` y despliegue en Render.

## 8. Convención de Git

- Rama de trabajo: `feature/catalogo` (parte de `main`).
- Commits en imperativo y español, con prefijo `feat:`, `fix:`, `style:`, `docs:` o `chore:`.
- Evitar mensajes genéricos como "update" o "fix".
- La integración a `main` se hace con Pull Request, no con push directo.

## 9. Verificación antes de cerrar un cambio

1. `npm run build` sin errores ni advertencias.
2. Revisar 375 px, 768 px y 1280 px (1 / 2 / 4 columnas).
3. Simular fallo de red (DevTools → Offline) y comprobar el mensaje + _Reintentar_.
4. Probar búsqueda sin resultados, limpiar filtros y filtro por categoría.
5. Marcar/desmarcar favoritos, recargar y confirmar que el contador se conserva.
6. `git status` limpio (sin `node_modules`, `dist` ni el PDF).

## 10. Mejoras futuras

- Paginación / scroll infinito.
- Búsqueda server-side con `/products/search?q=`.
- Filtros y búsqueda en la URL.
- Tests con Vitest + Testing Library.
- Sincronización de favoritos entre pestañas (`storage` event).
- Modo oscuro y despliegue en Render.
