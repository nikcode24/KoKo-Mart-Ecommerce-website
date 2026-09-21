import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { getAllProducts } from '../api/products'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { useWishlist } from '../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import { EmptyState, ErrorState } from '../components/States'
import { SkeletonGrid } from '../components/Skeleton'

export default function WishlistPage() {
  const { ids } = useWishlist()
  const { products: all, loading, error, reload } = useProducts(
    getAllProducts,
    'all',
  )

  usePageTitle('Wishlist')

  const wished = useMemo(() => {
    if (!all) return []
    return all.filter((p) => ids.includes(p.id))
  }, [all, ids])

  if (ids.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        text="Tap the heart on any product to save it here for later."
        icon="box"
        action={
          <Link to="/products" className="btn btn-primary">
            Explore products
          </Link>
        }
      />
    )
  }

  if (loading) return <SkeletonGrid count={6} />
  if (error) return <ErrorState message={error.message} onRetry={reload} />

  return (
    <>
      <header className="section-head" style={{ marginBottom: 18 }}>
        <div>
          <h1 className="page-title">Wishlist</h1>
          <p className="page-sub">{wished.length} saved products</p>
        </div>
      </header>

      {wished.length === 0 ? (
        <ErrorState message="Some saved products are no longer available." />
      ) : (
        <div className="product-grid">
          {wished.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  )
}