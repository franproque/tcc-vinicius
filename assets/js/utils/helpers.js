export const normalizePrice = (price) => {
  if (!price) return
  return Number(price.replace(/\./g, '').replace(/,/g, '.').replace(/R\$/g, ''))
}

export const formatPagination = (array) => {
  return Array.from(
    { length: Math.ceil(array.length / 6) },
    (v, i) => array.slice(i * 6, i * 6 + 6)
  )
}