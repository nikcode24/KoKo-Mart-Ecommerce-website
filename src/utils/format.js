export function formatNPR(value) {
  return `NPR ${Math.round(Number(value) || 0).toLocaleString('en-IN')}`
}

export function discountPercent(price, comparedAt) {
  if (!price || !comparedAt || comparedAt <= price) return 0
  return Math.round(((comparedAt - price) / comparedAt) * 100)
}

export function effectivePrice(product) {
  if (!product) return 0
  return product.price
}

export function computedPrice(product) {
  if (!product) return { price: 0, original: 0, percent: 0 }
  const original = product.discountPercentage
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price
  return {
    price: product.price,
    original,
    percent: discountPercent(product.price, original),
  }
}

export function pluralize(count, word) {
  return `${count} ${word}${count === 1 ? '' : 's'}`
}

export function initials(name = '') {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('')
}