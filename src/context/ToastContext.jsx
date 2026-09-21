import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

const ToastContext = createContext(null)

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timerRef = useRef({})

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    clearTimeout(timerRef.current[id])
    delete timerRef.current[id]
  }, [])

  const push = useCallback(
    (message, type = 'success') => {
      const id = ++toastId
      setToasts((prev) => [...prev.slice(-2), { id, message, type }])
      timerRef.current[id] = setTimeout(() => dismiss(id), 3200)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ push, dismiss }}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast is-${toast.type}`}>
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}