import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mini-catalogo:favoritos'

function readStoredFavorites() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return [...new Set(parsed.filter((id) => typeof id === 'number'))]
  } catch {
    // Si el almacenamiento no está disponible o el JSON es inválido, arrancamos vacío.
    return []
  }
}

/**
 * Mantiene los IDs de los productos favoritos y los persiste en localStorage.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(readStoredFavorites)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Persistencia best-effort: la app sigue funcionando sin localStorage.
    }
  }, [favorites])

  const toggleFavorite = useCallback((productId) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }, [])

  const isFavorite = useCallback((productId) => favorites.includes(productId), [favorites])

  return {
    favorites,
    count: favorites.length,
    isFavorite,
    toggleFavorite,
  }
}
