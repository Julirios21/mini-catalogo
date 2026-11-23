const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(value) {
  return currencyFormatter.format(Number(value) || 0)
}

export function formatCategory(category = '') {
  if (!category) return 'Sin categoría'
  return category.charAt(0).toUpperCase() + category.slice(1)
}
