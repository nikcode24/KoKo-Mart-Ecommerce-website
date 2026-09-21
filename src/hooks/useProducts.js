import { useCallback, useEffect, useState } from 'react'
import { getProduct } from '../api/products'

const CACHE = new Map()

export function useProducts(fetchFn, cacheKey = null) {
  const [products, setProducts] = useState(() =>
    cacheKey && CACHE.has(cacheKey) ? CACHE.get(cacheKey) : null,
  )
  const [loading, setLoading] = useState(!cacheKey || !CACHE.has(cacheKey))
  const [error, setError] = useState(null)

  const load = useCallback(
    async (params) => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchFn(params)
        setProducts(data)
        if (cacheKey) CACHE.set(cacheKey, data)
      } catch (err) {
        setError(err)
        setProducts(null)
      } finally {
        setLoading(false)
      }
    },
    [fetchFn, cacheKey],
  )

  useEffect(() => {
    load()
  }, [load])

  return { products, loading, error, reload: load }
}

export function useProduct(id) {
  const key = `product:${id}`
  const [product, setProduct] = useState(() =>
    CACHE.has(key) ? CACHE.get(key) : null,
  )
  const [loading, setLoading] = useState(!CACHE.has(key))
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    ;(async () => {
      try {
        const data = await getProduct(id)
        if (!cancelled) {
          CACHE.set(key, data)
          setProduct(data)
        }
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [id, key])

  return { product, loading, error }
}