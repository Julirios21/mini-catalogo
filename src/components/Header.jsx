export default function Header({ favoritesCount = 0 }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-lg shadow-sm shadow-indigo-600/30"
          >
            🛍️
          </span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">Mini Catálogo</h1>
            <p className="text-xs text-slate-500">Productos de DummyJSON</p>
          </div>
        </div>

        <p
          className="inline-flex w-fit items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1.5 text-sm font-medium text-rose-600 ring-1 ring-rose-200 ring-inset"
          aria-live="polite"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4 text-rose-500"
          >
            <path d="M12 21s-6.716-4.35-9.428-8.62C.59 8.9 1.948 4.5 6.045 4.5c2.13 0 3.43 1.14 3.955 1.99.525-.85 1.825-1.99 3.955-1.99 4.097 0 5.455 4.4 3.473 7.88C18.716 16.65 12 21 12 21Z" />
          </svg>
          Favoritos: <strong className="tabular-nums">{favoritesCount}</strong>
        </p>
      </div>
    </header>
  )
}
