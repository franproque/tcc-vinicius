export const normalizePrice = (price) => {

  if (!price) return
  return Number(price.replace(/\./g, '').replace(/,/g, '.').replace(/R\$/g, ''))


}