import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { initials } from '../utils/format'
import { ChevronRight, HeartIcon, GridIcon } from '../components/icons'

const rows = [
  { label: 'My Orders', desc: 'Track your deliveries' },
  { label: 'My Addresses', desc: 'Manage delivery addresses' },
  { label: 'Payment Methods', desc: 'Cards, eSewa, wallets' },
  { label: 'Notifications', desc: 'Order and deal alerts' },
  { label: 'Language', desc: 'English', value: 'English' },
  { label: 'Currency', desc: 'Nepali Rupees', value: 'NPR (Rs)' },
  { label: 'Theme', desc: 'Appearance', value: 'Light' },
  { label: 'Help & Support', desc: 'FAQs and contact' },
]

export default function AccountPage() {
  usePageTitle('Profile')
  const { user, logout } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    push('You have been signed out.', 'error')
    navigate('/')
  }

  return (
    <>
      <header className="section-head" style={{ marginBottom: 18 }}>
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-sub">Manage your account</p>
        </div>
      </header>

      <div className="card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <span
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--color-navy)',
            color: '#fff',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            fontSize: 20,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {initials(user.name)}
        </span>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 16 }}>{user.name}</p>
          <p style={{ fontSize: 13.5, color: 'var(--color-text-muted)', overflowWrap: 'anywhere' }}>
            {user.email} · {user.phone}
          </p>
        </div>
      </div>

      <nav className="card" aria-label="Account settings">
        <ul>
          {rows.map((row) => (
            <li key={row.label} style={{ borderTop: '1px solid var(--color-border)' }}>
              <button
                type="button"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '15px 18px',
                  textAlign: 'left',
                }}
              >
                <span style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontWeight: 600 }}>{row.label}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--color-text-faint)' }}>{row.desc}</span>
                </span>
                {row.value && (
                  <span style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>{row.value}</span>
                )}
                <ChevronRight size={16} color="var(--color-text-faint)" />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
        <Link to="/wishlist" className="btn btn-outline">
          <HeartIcon size={17} /> Wishlist
        </Link>
        <Link to="/products" className="btn btn-outline">
          <GridIcon size={17} /> Browse Products
        </Link>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  )
}