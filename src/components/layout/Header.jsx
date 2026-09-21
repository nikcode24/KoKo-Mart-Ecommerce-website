import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { CartIcon, HeartIcon, SearchIcon } from '../icons'
import { initials } from '../../utils/format'

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="KoKo Mart home">
      <img src="/logo.png" alt="KoKo Mart" className="brand-logo" />
    </Link>
  )
}

export default function Header() {
  const { cartCount } = useCart()
  const { ids } = useWishlist()
  const { isAuthed, user } = useAuth()
  const navigate = useNavigate()
  const [term, setTerm] = useState('')

  const submitSearch = (e) => {
    e.preventDefault()
    const q = term.trim()
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : '/products')
  }

  return (
    <header className="app-header">
      <div className="container">
        <Brand />
        <nav className="header-nav" aria-label="Primary">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/wishlist">Wishlist</NavLink>
        </nav>

        <form className="search-bar header-search" onSubmit={submitSearch} role="search" aria-label="Search products">
          <SearchIcon size={18} />
          <input
            type="search"
            placeholder="Search for products, brands"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className="header-actions">
          {isAuthed ? (
            <Link
              to="/account"
              className="icon-btn user-chip"
              aria-label={`Account, ${user.name}`}
              title={user.name}
            >
              {initials(user.name)}
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm header-signin">
              Sign in
            </Link>
          )}
          <Link to="/wishlist" className="icon-btn" aria-label={`Wishlist, ${ids.length} items`}>
            <HeartIcon size={20} filled={ids.length > 0} />
            {ids.length > 0 && <span className="count-badge">{ids.length}</span>}
          </Link>
          <Link to="/cart" className="icon-btn" aria-label={`Cart, ${cartCount} items`}>
            <CartIcon size={20} />
            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  )
}