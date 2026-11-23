import { formatCategory } from '../utils/format'

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <div className="relative w-full sm:w-56">
      <label htmlFor="category-filter" className="sr-only">
        Filtrar por categoría
      </label>
      <select
        id="category-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pr-9 pl-3.5 text-sm text-slate-900 shadow-sm transition outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        <option value="todas">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {formatCategory(category)}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-400"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  )
}
