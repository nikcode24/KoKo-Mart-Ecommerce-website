import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'kokomart:cart'

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const existing = state.find((item) => item.id === action.payload.id)
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: Math.min(item.qty + (action.payload.qty || 1), 99) }
            : item,
        )
      }
      return [...state, { id: action.payload.id, qty: action.payload.qty || 1 }]
    }
    case 'remove':
      return state.filter((item) => item.id !== action.payload.id)
    case 'setQty': {
      if (action.payload.qty <= 0) {
        return state.filter((item) => item.id !== action.payload.id)
      }
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: Math.min(action.payload.qty, 99) }
          : item,
      )
    }
    case 'clear':
      return []
    default:
      return state
  }
}

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private mode / quota) — cart just won't persist
    }
  }, [items])

  const addToCart = useCallback(
    (id, qty = 1) => dispatch({ type: 'add', payload: { id, qty } }),
    [],
  )
  const removeFromCart = useCallback(
    (id) => dispatch({ type: 'remove', payload: { id } }),
    [],
  )
  const setQuantity = useCallback(
    (id, qty) => dispatch({ type: 'setQty', payload: { id, qty } }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: 'clear' }), [])

  const cartCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      cartCount,
      addToCart,
      removeFromCart,
      setQuantity,
      clearCart,
      isInCart: (id) => items.some((item) => item.id === id),
      getQty: (id) => items.find((item) => item.id === id)?.qty || 0,
    }),
    [items, cartCount, addToCart, removeFromCart, setQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}