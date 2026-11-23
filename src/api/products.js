const API_URL = 'https://dummyjson.com/products?limit=20'

/**
 * Obtiene el listado de productos del catálogo.
 *
 * @param {{ signal?: AbortSignal }} options
 * @returns {Promise<Array<{ id: number, title: string, price: number, category: string, thumbnail: string, images: string[], rating: number, stock: number }>>}
 */
export async function fetchProducts({ signal } = {}) {
  const response = await fetch(API_URL, { signal })

  if (!response.ok) {
    throw new Error(`La API respondió con un error ${response.status}.`)
  }

  const data = await response.json()
  const products = data?.products

  if (!Array.isArray(products)) {
    throw new Error('La respuesta de la API no tiene el formato esperado.')
  }

  return products
}
