# 🛍️ Mini Catálogo

Aplicación de catálogo construida como prueba técnica Frontend. Consume la API pública de
[DummyJSON](https://dummyjson.com/docs/products), muestra 20 productos, permite buscarlos por
título, filtrarlos por categoría y guardarlos como favoritos.

## Stack

| Herramienta  | Versión | Uso                                      |
| ------------ | ------- | ---------------------------------------- |
| React        | 19      | Componentes funcionales y hooks          |
| Vite         | 8       | Bundler y servidor de desarrollo         |
| Tailwind CSS | 4       | Todos los estilos (plugin `@tailwindcss/vite`) |
| JavaScript   | ES2022+ | Sin TypeScript, según el alcance del reto |

## Requisitos

- Node.js 20.19+ (o 22.12+)
- npm 10+

## Cómo correr el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd mini-catalogo
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

### Scripts disponibles

| Comando           | Descripción                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con recarga en caliente |
| `npm run build`   | Build de producción en `dist/`                |
| `npm run preview` | Sirve el build de producción localmente       |

## Funcionalidades

### Requisitos obligatorios

- **Listado**: tarjetas con imagen, título, precio en USD y categoría.
- **Estados de carga y error**: skeletons animados durante la petición y mensaje claro con botón
  _Reintentar_ si la API falla.
- **Búsqueda**: filtro por título en tiempo real (con debounce), contador de resultados y estado
  vacío cuando no hay coincidencias.
- **Favoritos**: botón de corazón en cada tarjeta, contador visible en el header y persistencia en
  `localStorage`.
- **Responsive**: 1 columna en móvil, 2 en tablet, 3 en escritorio y 4 en pantallas grandes.

### Bonus implementados

- ✅ Favoritos persistidos en `localStorage`.
- ✅ Hooks propios: `useProducts`, `useFavorites` y `useDebounce`.
- ✅ Debounce de 250 ms en la búsqueda.
- ✅ Filtro por categoría con categorías derivadas de los datos.
- ⏳ Despliegue en Render (documentado abajo, requiere cuenta propia).

## Estructura del proyecto

```text
.
├─ index.html
├─ vite.config.js
├─ src/
│  ├─ api/
│  │  └─ products.js          # Petición a DummyJSON y validación de la respuesta
│  ├─ components/
│  │  ├─ CategoryFilter.jsx   # Select de categorías
│  │  ├─ Header.jsx           # Marca y contador de favoritos
│  │  ├─ ProductCard.jsx      # Tarjeta con imagen, datos y botón de favorito
│  │  ├─ ProductGrid.jsx      # Grilla responsive
│  │  ├─ ProductSkeleton.jsx  # Placeholders de carga
│  │  ├─ SearchBar.jsx        # Input de búsqueda controlado
│  │  └─ StatusMessage.jsx    # Mensajes de error y sin resultados
│  ├─ hooks/
│  │  ├─ useDebounce.js       # Retrasa el valor de búsqueda
│  │  ├─ useFavorites.js      # Estado y persistencia de favoritos
│  │  └─ useProducts.js       # Carga, error, loading y reintento
│  ├─ utils/
│  │  └─ format.js            # Formato de precios y categorías
│  ├─ App.jsx                 # Composición y filtros
│  ├─ index.css               # Tailwind y estilos base mínimos
│  └─ main.jsx                # Punto de entrada
└─ README.md
```

## Decisiones técnicas

1. **Búsqueda en el cliente.** La API entrega 20 productos en una sola petición, así que filtrar en
   memoria con `useMemo` es instantáneo y evita peticiones por cada tecla. Para un catálogo más
   grande usaría el endpoint `/products/search?q=` con paginación.
2. **Debounce de 250 ms.** Reduce el trabajo de filtrado en listas grandes y mantiene la sensación de
   inmediatez. El contador y el estado vacío reaccionan al valor debounced.
3. **`useProducts` con `AbortController`.** La petición se cancela al desmontar (incluido el doble
   montaje de `StrictMode`) y si falla se muestra un mensaje accionable con reintento.
4. **Favoritos como IDs en `localStorage`.** Se guardan solo los IDs, la lectura tolera JSON inválido
   o almacenamiento no disponible, y la UI deriva el estado de esa lista.
5. **Tailwind CSS v4 con el plugin de Vite.** No hay `tailwind.config.js`: el tema se declara con
   `@theme` en `index.css`. Los estilos propios se limitan a la base (fondo, tipografía, selección y
   `prefers-reduced-motion`).
6. **Sin router ni estado global.** Es una sola pantalla; `useState`, `useEffect` y hooks propios
   cubren el alcance sin dependencias extra.
7. **Accesibilidad.** `aria-pressed` en favoritos, etiquetas asociadas a los campos, `aria-live` en
   contadores, textos alternativos, foco visible y enlace para saltar al catálogo.

## Git y GitHub

El trabajo se desarrolló en la rama `feature/catalogo`, que se integra a `main` mediante un Pull
Request. Historial de commits:

```text
chore: inicia repositorio del proyecto
chore: inicializa proyecto con Vite, React y Tailwind CSS
feat: agrega cliente de API y hook useProducts con estados de carga y error
feat: implementa catálogo con Header, SearchBar y ProductCard
feat: agrega favoritos con contador en el header y persistencia en localStorage
feat: incorpora filtro por categoría y debounce en la búsqueda
style: ajusta grilla responsive, skip link y pie de página
docs: agrega README con instrucciones y decisiones
```

Para publicarlo:

```bash
gh repo create mini-catalogo --public --source=. --remote=origin --push
git push -u origin feature/catalogo
gh pr create --base main --head feature/catalogo --title "Mini Catálogo" --body "Implementación de la prueba técnica Frontend"
```

## Despliegue en Render (Static Site)

1. Crear un **Static Site** conectado al repositorio.
2. Build command: `npm install && npm run build`.
3. Publish directory: `dist`.
4. (Opcional) Auto-deploy en cada push a `main`.

No se necesita rewrite de SPA porque la app no usa rutas del cliente.

## Qué haría con más tiempo

- Paginación o scroll infinito con el endpoint de DummyJSON.
- Búsqueda server-side y filtros reflejados en la URL (compartibles).
- Tests con Vitest y React Testing Library para hooks y estados de la UI.
- Sincronizar favoritos entre pestañas con el evento `storage`.
- Modo oscuro y transiciones más cuidadas.
- Despliegue en Render con URL pública.

## Créditos

Datos provistos por [DummyJSON](https://dummyjson.com). Proyecto realizado como prueba técnica.
