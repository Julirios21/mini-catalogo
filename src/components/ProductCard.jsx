import { formatCategory, formatPrice } from '../utils/format'

export default function ProductCard({ product, isFavorite = false, onToggleFavorite }) {
  const { id, title, price, category, thumbnail, rating } = product

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition duration-300 group-hover:scale-105"
        />

        <button
          type="button"
          onClick={() => onToggleFavorite?.(id)}
          aria-pressed={isFavorite}
          aria-label={`${isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}: ${title}`}
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/90 shadow-sm ring-1 ring-slate-200 backdrop-blur transition hover:scale-105 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`size-5 transition ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'fill-transparent text-slate-500'
            }`}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200 backdrop-blur">
          {formatCategory(category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{title}</h3>
          {typeof rating === 'number' && (
            <span
              className="inline-flex shrink-0 items-center gap-0.5 rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-medium text-amber-700"
              title={`Calificación: ${rating} de 5`}
            >
              <span aria-hidden="true">★</span>
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        <p className="mt-auto text-lg font-semibold tracking-tight text-slate-900">
          {formatPrice(price)}
        </p>
      </div>
    </article>
  )
}
