import { Link } from 'react-router-dom'
import { useMemo } from 'react'

import { getAllProducts, getCategories } from '../api/products'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import ProductCard from '../components/ProductCard'
import CategoryChips from '../components/CategoryChips'
import { ErrorState, EmptyState } from '../components/States'
import { SkeletonGrid } from '../components/Skeleton'
import Countdown from '../components/Countdown'
import { BoltIcon, ChevronRight } from '../components/icons'

export default function HomePage() {
  usePageTitle('')

  const { products: categories, loading: catLoading } = useProducts(
    getCategories,
    'categories',
  )
  const { products: all, loading, error, reload } = useProducts(
    getAllProducts,
    'all',
  )

  const flashSale = useMemo(() => {
    if (!all) return []
    return [...all]
      .filter((p) => (p.discountPercentage || 0) > 15)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 8)
  }, [all])

  const featured = useMemo(() => {
    if (!all) return []
    return [...all].sort((a, b) => b.rating - a.rating).slice(0, 8)
  }, [all])

  const renderGrid = (items) =>
    items.length === 0 ? (
      <EmptyState title="No products" text="Couldn't find any products to show." />
    ) : (
      <div className="product-grid">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    )

  return (
    <>
      <section className="banner" aria-label="Summer sale promotion">
        <span className="banner__kicker">Summer Sale</span>
        <h1 className="banner__title">Up to 50% Off on Top Brands</h1>
        <p className="banner__sub">Grab the season's best deals before they're gone.</p>
        <div className="banner__apps">
          <Link to="/products?sort=discount" className="btn btn-accent">
            Shop the Sale <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="cat-heading">
        <div className="section-head">
          <h2 id="cat-heading" className="section-title">
            Categories
          </h2>
          <Link to="/products" className="section-link">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <CategoryChips categories={categories} loading={catLoading} />
      </section>

      <section className="section" aria-labelledby="flash-heading">
        <div className="section-head">
          <div className="flash-head">
            <h2 id="flash-heading" className="section-title flash-label">
              <BoltIcon size={18} /> Flash Sale
            </h2>
            <Countdown />
          </div>
          <Link to="/products?sort=discount" className="section-link">
            See all <ChevronRight size={14} />
          </Link>
        </div>
        {error && <ErrorState message={error.message} onRetry={reload} />}
        {loading ? <SkeletonGrid count={8} /> : renderGrid(flashSale)}
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="section-head">
          <h2 id="featured-heading" className="section-title">
            Top Rated Picks
          </h2>
          <Link to="/products?sort=rating" className="section-link">
            See all <ChevronRight size={14} />
          </Link>
        </div>
        {error && <ErrorState message={error.message} onRetry={reload} />}
        {loading ? <SkeletonGrid count={8} /> : renderGrid(featured)}
      </section>
    </>
  )
}