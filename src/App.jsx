import { useMemo, useState } from 'react'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import ProductSkeleton from './components/ProductSkeleton'
import SearchBar from './components/SearchBar'
import StatusMessage from './components/StatusMessage'
import { useProducts } from './hooks/useProducts'

export default function App() {
  const { products, loading, error, retry } = useProducts()
  const [search, setSearch] = useState('')

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('es')
    if (!term) return products

    return products.filter((product) => product.title.toLocaleLowerCase('es').includes(term))
  }, [products, search])

  const hasSearch = search.trim().length > 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header favoritesCount={0} />

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

          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            resultCount={filteredProducts.length}
            totalCount={products.length}
          />

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
                hasSearch
                  ? `No encontramos productos que coincidan con “${search.trim()}”.`
                  : 'Todavía no hay productos para mostrar.'
              }
              action={
                hasSearch && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Limpiar búsqueda
                  </button>
                )
              }
            />
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <ProductGrid products={filteredProducts} />
          )}
        </section>
      </main>
    </div>
  )
}
