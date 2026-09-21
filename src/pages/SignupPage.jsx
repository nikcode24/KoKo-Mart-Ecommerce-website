import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { usePageTitle } from '../hooks/usePageTitle'
import FormField from '../components/FormField'
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '../utils/validate'

export default function SignupPage() {
  usePageTitle('Sign Up')
  const { signup, isAuthed } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/account'

  if (isAuthed) {
    return <Navigate to="/account" replace />
  }

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  })
  const [agreed, setAgreed] = useState(false)
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
    let msg = ''
    switch (key) {
      case 'name':
        msg = validateName(value)
        break
      case 'email':
        msg = validateEmail(value)
        break
      case 'phone':
        msg = validatePhone(value, true)
        break
      case 'password':
        msg = validatePassword(value, { confirm: values.confirm, forSignup: true })
        break
      case 'confirm':
        msg = validatePassword(values.password, { confirm: value, forSignup: true })
        break
      default:
        break
    }
    setErrors((prev) => ({ ...prev, [key]: msg }))
    return msg
  }

  const validateAll = () => {
    const next = {
      name: validateName(values.name),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone, true),
      password: validatePassword(values.password, {
        confirm: values.confirm,
        forSignup: true,
      }),
      confirm: validatePassword(values.password, {
        confirm: values.confirm,
        forSignup: true,
      }),
    }
    setErrors(next)
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      confirm: true,
    })
    if (!agreed) {
      setErrors((prev) => ({ ...prev, terms: 'Please accept the terms to continue.' }))
    }
    return !Object.values(next).some(Boolean) && agreed
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    if (validateAll()) {
      setTimeout(() => {
        const result = signup(values)
        if (result.ok) {
          push(`Welcome to KoKo Mart, ${result.user.name.split(' ')[0]}!`)
          navigate(from, { replace: true })
        } else {
          setErrors((prev) => ({ ...prev, email: result.error }))
        }
        setSubmitting(false)
      }, 400)
    } else {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <header className="auth-head">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-sub">Let's get you started — it only takes a minute.</p>
        </header>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <FormField
            label="Full Name"
            value={values.name}
            onChange={setField('name')}
            onBlur={touch('name')}
            placeholder="Enter your full name"
            autoComplete="name"
            error={errors.name}
            required
          />
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
            label="Phone Number"
            type="tel"
            value={values.phone}
            onChange={setField('phone')}
            onBlur={touch('phone')}
            placeholder="+977 98XXXXXXXX"
            autoComplete="tel"
            error={errors.phone}
            required
          />
          <div className="form-grid2">
            <FormField
              label="Password"
              type="password"
              value={values.password}
              onChange={setField('password')}
              onBlur={touch('password')}
              placeholder="Create a password"
              autoComplete="new-password"
              error={errors.password}
              required
            />
            <FormField
              label="Confirm Password"
              type="password"
              value={values.confirm}
              onChange={setField('confirm')}
              onBlur={touch('confirm')}
              placeholder="Confirm your password"
              autoComplete="new-password"
              error={errors.confirm}
              required
            />
          </div>

          <label className="auth-terms">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked)
                if (e.target.checked) {
                  setErrors((prev) => {
                    const { terms, ...rest } = prev
                    return rest
                  })
                }
              }}
              aria-invalid={Boolean(errors.terms)}
            />
            <span>
              I agree to the <a href="#terms">Terms &amp; Conditions</a> and{' '}
              <a href="#privacy">Privacy Policy</a>
            </span>
          </label>
          {errors.terms && (
            <p className="form-error" role="alert">
              {errors.terms}
            </p>
          )}

          <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}