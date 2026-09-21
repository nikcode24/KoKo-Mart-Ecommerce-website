import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const WishlistContext = createContext(null)

const STORAGE_KEY = 'kokomart:wishlist'

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // storage unavailable — wishlist just won't persist
    }
  }, [ids])

  const toggleWishlist = useCallback((id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const isWishlisted = useCallback((id) => ids.includes(id), [ids])

  const value = useMemo(
    () => ({ ids, toggleWishlist, isWishlisted }),
    [ids, toggleWishlist, isWishlisted],
  )

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}