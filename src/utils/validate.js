export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const PHONE_RE = /^\+?[\d\s()-]{9,15}$/

export function validateEmail(value) {
  if (!value) return 'Email is required.'
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address.'
  return ''
}

export function validatePassword(value, { confirm = '', forSignup = false } = {}) {
  if (!value) return 'Password is required.'
  if (forSignup && value.length < 6) return 'Password must be at least 6 characters.'
  if (confirm && value !== confirm) return 'Passwords do not match.'
  return ''
}

export function validateName(value) {
  if (!value) return 'Full name is required.'
  if (value.trim().length < 2) return 'Name must be at least 2 characters.'
  return ''
}

export function validatePhone(value, required = false) {
  if (!value) return required ? 'Phone number is required.' : ''
  if (!PHONE_RE.test(value)) return 'Enter a valid phone number.'
  return ''
}