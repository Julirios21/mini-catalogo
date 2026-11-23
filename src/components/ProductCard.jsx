import { formatCategory, formatPrice } from '../utils/format'

export default function ProductCard({ product }) {
  const { title, price, category, thumbnail, rating } = product

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition duration-300 group-hover:scale-105"
        />
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
