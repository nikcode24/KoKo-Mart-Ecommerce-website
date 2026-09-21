import { Link } from 'react-router-dom'

import { displayCategoryName } from '../CategoryChips'

const shopLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'All Products' },
  { to: '/wishlist', label: 'Wishlist' },
  { to: '/cart', label: 'Cart' },
  { to: '/account', label: 'Account' },
]

const categoryLinks = [
  'beauty',
  'fragrances',
  'womens-dresses',
  'smartphones',
  'laptops',
  'sports-accessories',
  'home-decoration',
  'groceries',
]

const helpLinks = [
  { to: '/products?sort=discount', label: 'Deals' },
  { to: '/products?sort=rating', label: 'Top Rated' },
  { to: '/products?category=sunglasses', label: 'Sunglasses' },
  { to: '/products?category=footwear', label: 'Footwear' },
  { to: '/products?category=furniture', label: 'Furniture' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__grid container">
        <div className="footer__brand">
          <img src="/logo.png" alt="KoKo Mart" className="footer__logo" />
          <p className="footer__tagline">Shop Smart, Live Better.</p>
          <p className="footer__note">
            A demo e-commerce experience built with React and the DummyJSON
            products API.
          </p>
        </div>

        <nav className="footer__col" aria-label="Shop links">
          <h2 className="footer__heading">Shop</h2>
          <ul>
            {shopLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Category links">
          <h2 className="footer__heading">Categories</h2>
          <ul>
            {categoryLinks.map((slug) => (
              <li key={slug}>
                <Link
                  to={`/products?category=${encodeURIComponent(slug)}`}
                  className="footer__link"
                >
                  {displayCategoryName(slug)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Discover links">
          <h2 className="footer__heading">Discover</h2>
          <ul>
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer__bar">
        <p>© {year} All rights reserved · Built for the Sajilo Life React assessment.</p>
      </div>
    </footer>
  )
}