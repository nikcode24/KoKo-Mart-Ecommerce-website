import { NavLink } from 'react-router-dom'

import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { CartIcon, GridIcon, HeartIcon, HomeIcon, UserIcon } from '../icons'

export default function BottomNav() {
  const { cartCount } = useCart()
  const { ids } = useWishlist()

  const items = [
    { to: '/', label: 'Home', icon: HomeIcon, end: true },
    { to: '/products', label: 'Categories', icon: GridIcon },
    { to: '/wishlist', label: 'Wishlist', icon: HeartIcon, badge: ids.length },
    { to: '/cart', label: 'Cart', icon: CartIcon, badge: cartCount },
    { to: '/account', label: 'Profile', icon: UserIcon },
  ]

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map(({ to, label, icon: Icon, badge = 0, end }) => (
        <NavLink key={to} to={to} end={end} aria-label={label}>
          <span style={{ position: 'relative' }}>
            <Icon size={22} filled={badge > 0 && label === 'Wishlist'} />
            {badge > 0 && <span className="count-badge">{badge}</span>}
          </span>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}