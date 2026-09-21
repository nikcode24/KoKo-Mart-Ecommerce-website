import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

const AuthContext = createContext(null)

const AUTH_KEY = 'kokomart:auth-user'
const USERS_KEY = 'kokomart:users'

export const DEMO_USER = {
  name: 'Demo User',
  email: 'demo@kokomart.np',
  phone: '+977 9800000000',
  password: 'demo123',
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function seedUsers() {
  let users = readJson(USERS_KEY, null)
  if (!users) {
    users = [DEMO_USER]
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch {
      // ignore
    }
  }
  return users
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(AUTH_KEY, null))
  const [users, setUsers] = useState(seedUsers)

  const persistUser = (next) => {
    setUser(next)
    try {
      if (next) localStorage.setItem(AUTH_KEY, JSON.stringify(next))
      else localStorage.removeItem(AUTH_KEY)
    } catch {
      // ignore
    }
  }

  const persistUsers = (next) => {
    setUsers(next)
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  const login = useCallback(
    ({ email, password }) => {
      const found = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
      )
      if (!found || found.password !== password) {
        return { ok: false, error: 'Invalid email or password.' }
      }
      const { password: _pw, ...safe } = found
      persistUser(safe)
      return { ok: true, user: safe }
    },
    [users],
  )

  const signup = useCallback(
    ({ name, email, phone, password }) => {
      const normalizedEmail = email.trim().toLowerCase()
      const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail)
      if (exists) {
        return { ok: false, error: 'An account with this email already exists.' }
      }
      const record = { name: name.trim(), email: normalizedEmail, phone, password }
      persistUsers([...users, record])
      const { password: _pw, ...safe } = record
      persistUser(safe)
      return { ok: true, user: safe }
    },
    [users],
  )

  const loginWithProvider = useCallback(
    (provider) => {
      const name =
        provider === 'google' ? 'Google User' : provider === 'apple' ? 'Apple User' : 'Demo User'
      const safe = { name, email: `${provider}@kokomart.np`, phone: '+977 9800000000' }
      persistUser(safe)
      return { ok: true, user: safe }
    },
    [],
  )

  const logout = useCallback(() => persistUser(null), [])

  const value = useMemo(
    () => ({
      user,
      isAuthed: Boolean(user),
      login,
      signup,
      loginWithProvider,
      logout,
    }),
    [user, login, signup, loginWithProvider, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}