import { useMemo, useState } from 'react'
import CategoryFilter from './components/CategoryFilter'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import ProductSkeleton from './components/ProductSkeleton'
import SearchBar from './components/SearchBar'
import StatusMessage from './components/StatusMessage'
import { useDebounce } from './hooks/useDebounce'
import { useFavorites } from './hooks/useFavorites'
import { useProducts } from './hooks/useProducts'
import { formatCategory } from './utils/format'

export default function App() {
  const { products, loading, error, retry } = useProducts()
  const { count, isFavorite, toggleFavorite } = useFavorites()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('todas')
  const debouncedSearch = useDebounce(search)

  const categories = useMemo(
    () =>
      [...new Set(products.map((product) => product.category).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, 'es'),
      ),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const term = debouncedSearch.trim().toLocaleLowerCase('es')

    return products.filter((product) => {
      const matchesCategory = category === 'todas' || product.category === category
      const matchesSearch = term === '' || product.title.toLocaleLowerCase('es').includes(term)
      return matchesCategory && matchesSearch
    })
  }, [products, debouncedSearch, category])

  const hasSearch = debouncedSearch.trim().length > 0
  const hasCategory = category !== 'todas'
  const hasFilters = hasSearch || hasCategory

  const clearFilters = () => {
    setSearch('')
    setCategory('todas')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header favoritesCount={count} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <section aria-labelledby="catalog-heading" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2
              id="catalog-heading"
              className="text-2xl font-semibold tracking-tight text-slate-900"
            >
              Catálogo
            </h2>
            <p className="text-sm text-slate-500">
              Explora los productos, busca por título y guarda tus favoritos.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchBar
                value={search}
                onChange={setSearch}
                onClear={() => setSearch('')}
                className="sm:max-w-md"
              />
              <CategoryFilter
                categories={categories}
                value={category}
                onChange={setCategory}
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
              <p role="status" aria-live="polite">
                Mostrando{' '}
                <strong className="font-semibold text-slate-900">
                  {filteredProducts.length}
                </strong>{' '}
                de {products.length} productos
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-medium text-indigo-600 underline-offset-2 transition hover:text-indigo-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {loading && <ProductSkeleton />}

          {!loading && error && (
            <StatusMessage
              icon="⚠️"
              title="No pudimos cargar el catálogo"
              description={error}
              action={
                <button
                  type="button"
                  onClick={retry}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reintentar
                </button>
              }
            />
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <StatusMessage
              icon="🔍"
              title="Sin resultados"
              description={
                hasFilters
                  ? `No encontramos productos${hasSearch ? ` para “${debouncedSearch.trim()}”` : ''}${
                      hasCategory ? ` en ${formatCategory(category)}` : ''
                    }. Prueba con otra búsqueda o categoría.`
                  : 'Todavía no hay productos para mostrar.'
              }
              action={
                hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Limpiar filtros
                  </button>
                )
              }
            />
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <ProductGrid
              products={filteredProducts}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </section>
      </main>
    </div>
  )
}
