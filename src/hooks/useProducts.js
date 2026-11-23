import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'

/**
 * Carga los productos una sola vez y expone los estados de la petición.
 * `retry` vuelve a lanzar la petición sin recargar la página.
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => {
    setAttempt((current) => current + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setLoading(true)
    setError(null)

    fetchProducts({ signal: controller.signal })
      .then((list) => {
        if (active) setProducts(list)
      })
      .catch((requestError) => {
        if (!active || requestError.name === 'AbortError') return

        setError(
          requestError.message ||
            'No pudimos cargar los productos. Revisa tu conexión e inténtalo de nuevo.',
        )
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [attempt])

  return { products, loading, error, retry }
}
