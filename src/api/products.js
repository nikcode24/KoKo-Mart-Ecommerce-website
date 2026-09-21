import client, { LIST_SELECT } from './client'

export async function getProducts({ skip = 0, limit = 12 } = {}) {
  const { data } = await client.get('/products', {
    params: { skip, limit, select: LIST_SELECT },
  })
  return data
}

export async function getAllProducts() {
  const { data } = await client.get('/products', {
    params: { limit: 0, select: LIST_SELECT },
  })
  return data.products || []
}

export async function getProduct(id) {
  const { data } = await client.get(`/products/${id}`)
  return data
}

export async function getCategories() {
  const { data } = await client.get('/products/categories')
  return Array.isArray(data) ? data : []
}

export async function searchProducts(term) {
  const { data } = await client.get('/products/search', {
    params: { q: term, limit: 0, select: LIST_SELECT },
  })
  return data.products || []
}

export async function addProduct(payload) {
  const { data } = await client.post('/products/add', payload)
  return data
}

export async function updateProduct(id, payload) {
  const { data } = await client.put(`/products/${id}`, payload)
  return data
}

export async function deleteProduct(id) {
  const { data } = await client.delete(`/products/${id}`)
  return data
}