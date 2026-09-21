import { useEffect, useState } from 'react'

import { CloseIcon } from './icons'

function timeLeftUntilMidnight() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  const diff = Math.max(0, midnight - now)
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

export default function Countdown() {
  const [left, setLeft] = useState(timeLeftUntilMidnight)

  useEffect(() => {
    const timer = setInterval(() => setLeft(timeLeftUntilMidnight()), 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <span className="countdown" role="timer" aria-label="Time remaining in flash sale">
      <span className="countdown__unit">{pad(left.h)}</span>
      <span className="countdown__sep">:</span>
      <span className="countdown__unit">{pad(left.m)}</span>
      <span className="countdown__sep">:</span>
      <span className="countdown__unit">{pad(left.s)}</span>
    </span>
  )
}

export function MobileSearch({ defaultValue, onSubmit }) {
  const [value, setValue] = useState(defaultValue || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    const term = value.trim()
    if (term) onSubmit(term)
    else setValue('')
  }

  return (
    <form className="search-bar mobile-search" onSubmit={handleSubmit} role="search">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        placeholder="Search for products, brands"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search products"
      />
      {value && (
        <button type="button" aria-label="Clear search" onClick={() => setValue('')}>
          <CloseIcon size={15} />
        </button>
      )}
    </form>
  )
}