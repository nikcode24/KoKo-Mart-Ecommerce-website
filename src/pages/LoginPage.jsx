import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth, DEMO_USER } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { usePageTitle } from '../hooks/usePageTitle'
import FormField from '../components/FormField'
import { validateEmail, validatePassword } from '../utils/validate'

const PROVIDERS = [
  { id: 'google', label: 'Continue with Google', glyph: 'G' },
  { id: 'apple', label: 'Continue with Apple', glyph: '' },
]

export default function LoginPage() {
  usePageTitle('Login')
  const { login, loginWithProvider, isAuthed } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/account'

  if (isAuthed) {
    return <Navigate to="/account" replace />
  }

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const setField = (key) => (e) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (touched[key]) validateField(key, next[key])
  }

  const touch = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    validateField(key, values[key])
  }

  const validateField = (key, value) => {
    const msg =
      key === 'email' ? validateEmail(value) : validatePassword(value, { forSignup: false })
    setErrors((prev) => ({ ...prev, [key]: msg }))
    return msg
  }

  const validateAll = () => {
    const emailErr = validateEmail(values.email)
    const passErr = validatePassword(values.password)
    setErrors({ email: emailErr, password: passErr })
    setTouched({ email: true, password: true })
    return !emailErr && !passErr
  }

  const finishLogin = (result) => {
    if (result.ok) {
      push(`Welcome back, ${result.user.name.split(' ')[0]}!`)
      navigate(from, { replace: true })
    } else {
      setErrors({ password: result.error, email: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (validateAll()) {
      setTimeout(() => {
        finishLogin(login({ email: values.email, password: values.password }))
        setSubmitting(false)
      }, 400)
    } else {
      setSubmitting(false)
    }
  }

  const handleProvider = (provider) => {
    const result = loginWithProvider(provider.id)
    if (result.ok) finishLogin(result)
  }

  const useDemo = () => {
    setValues({ email: DEMO_USER.email, password: DEMO_USER.password })
    setErrors({})
    setTouched({ email: true, password: true })
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <header className="auth-head">
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-sub">Login to your account to continue shopping.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Email"
            type="email"
            value={values.email}
            onChange={setField('email')}
            onBlur={touch('email')}
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email}
            required
          />
          <FormField
            label="Password"
            type="password"
            value={values.password}
            onChange={setField('password')}
            onBlur={touch('password')}
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password}
            required
          />

          <div className="auth-row">
            <button type="button" className="text-btn" onClick={useDemo}>
              Use demo account
            </button>
            <button
              type="button"
              className="text-btn"
              onClick={() => push('Password reset is a demo in this build.', 'error')}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="auth-providers">
          {PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              type="button"
              className="btn btn-outline btn-block"
              onClick={() => handleProvider(provider)}
            >
              {provider.glyph && (
                <span className="provider-glyph">{provider.glyph}</span>
              )}
              {provider.label}
            </button>
          ))}
        </div>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}