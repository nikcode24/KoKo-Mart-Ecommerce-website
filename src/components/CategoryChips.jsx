import { Link } from 'react-router-dom'

import { GridIcon } from './icons'

export function displayCategory(cat) {
  if (typeof cat === 'string') return { slug: cat, name: cat }
  return {
    slug: cat.slug || cat.name,
    name: cat.name || cat.slug,
  }
}

export function displayCategoryName(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function ChipSkeletons() {
  return (
    <div className="chip-row" aria-hidden="true">
      {Array.from({ length: 7 }, (_, i) => (
        <span key={i} className="skeleton" style={{ width: 96, height: 34, borderRadius: 999 }} />
      ))}
    </div>
  )
}

export default function CategoryChips({ categories, loading = false, active = '' }) {
  if (loading && !categories) return <ChipSkeletons />
  if (!categories || categories.length === 0) return null

  return (
    <nav className="chip-row" aria-label="Product categories">
      <Link
        className={`chip${active === '' ? ' is-active' : ''}`}
        to="/products"
        aria-current={active === '' ? 'page' : undefined}
      >
        <GridIcon size={15} />
        All
      </Link>
      {categories.map((cat) => {
        const { slug, name } = displayCategory(cat)
        const isActive = active === slug
        return (
          <Link
            key={slug}
            className={`chip${isActive ? ' is-active' : ''}`}
            to={`/products?category=${encodeURIComponent(slug)}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {displayCategoryName(name)}
          </Link>
        )
      })}
    </nav>
  )
}