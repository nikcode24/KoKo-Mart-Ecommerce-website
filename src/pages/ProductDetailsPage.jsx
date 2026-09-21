import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useProduct } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { computedPrice, formatNPR, initials } from '../utils/format'
import RatingStars from '../components/RatingStars'
import { ErrorState } from '../components/States'
import { BackIcon, CartIcon, HeartIcon } from '../components/icons'
import { displayCategoryName } from '../components/CategoryChips'

function DetailSkeleton() {
  return (
    <div className="pd" aria-busy="true" aria-label="Loading product details">
      <div className="skeleton" style={{ aspectRatio: '1/1', borderRadius: 22 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="skeleton" style={{ height: 18, width: 120 }} />
        <div className="skeleton" style={{ height: 30, width: '80%' }} />
        <div className="skeleton" style={{ height: 30, width: 160 }} />
        <div className="skeleton" style={{ height: 90 }} />
        <div className="skeleton" style={{ height: 52, width: 260 }} />
      </div>
    </div>
  )
}

export default function ProductDetailsPage() {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)
  usePageTitle(product ? product.title : loading ? 'Product' : 'Not found')
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { push } = useToast()
  const navigate = useNavigate()

  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)

  if (loading) return <DetailSkeleton />
  if (error || !product) {
    return (
      <ErrorState
        title="Product not found"
        message={error?.message || `We couldn't find product #${id}.`}
        onRetry={() => navigate(0)}
      />
    )
  }

  const prices = computedPrice(product)
  const images = product.images?.length ? product.images : [product.thumbnail]
  const inStock = product.stock > 0
  const wished = isWishlisted(product.id)

  const handleWish = () => {
    toggleWishlist(product.id)
    push(wished ? 'Removed from wishlist' : 'Added to wishlist', wished ? 'error' : 'success')
  }

  const handleAdd = (toCart = false) => {
    addToCart(product.id, qty)
    push(`${product.title} added to cart`)
    if (toCart) navigate('/cart')
  }

  const hasReviews = product.reviews && product.reviews.length > 0

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> /
        <Link to="/products">Products</Link> /
        <span aria-current="page">{product.title}</span>
      </nav>

      <div className="pd">
        <div className="pd__gallery">
          <div className="pd__main-img">
            <img src={images[activeImage]} alt={product.title} />
          </div>
          {images.length > 1 && (
            <div className="pd__thumbs" role="tablist" aria-label="Product images">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === activeImage}
                  aria-label={`View image ${i + 1} of ${images.length}`}
                  className={`pd__thumb${i === activeImage ? ' is-active' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="pd__brand">{product.brand || 'KoKo Mart'}</span>
          <h1 className="pd__title">{product.title}</h1>

          <div className="pd__rating-row">
            <RatingStars rating={product.rating} />
            <span className="review-count">
              {product.rating.toFixed(1)} · {product.reviews?.length || 0} reviews
            </span>
          </div>

          <div className="pd__price-row">
            <span className="pd__price">{formatNPR(product.price)}</span>
            {prices.percent > 0 && (
              <>
                <span className="pd__price-old">{formatNPR(prices.original)}</span>
                <span className="pill pill-save">{prices.percent}% OFF</span>
              </>
            )}
          </div>

          <dl className="pd__meta">
            <div className="pd__meta-item">
              <dt>Category</dt>
              <dd>{displayCategoryName(product.category)}</dd>
            </div>
            <div className="pd__meta-item">
              <dt>Brand</dt>
              <dd>{product.brand || '—'}</dd>
            </div>
            <div className="pd__meta-item">
              <dt>Availability</dt>
              <dd style={{ color: inStock ? 'var(--color-success)' : 'var(--color-danger)' }}>
                {inStock ? `In stock (${product.stock})` : 'Out of stock'}
              </dd>
            </div>
            {product.returnPolicy && (
              <div className="pd__meta-item">
                <dt>Returns</dt>
                <dd>{product.returnPolicy}</dd>
              </div>
            )}
          </dl>

          {product.description && (
            <p className="pd__desc">{product.description}</p>
          )}

          <div className="pd__actions">
            <div className="qty-stepper">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={!inStock}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <output aria-live="polite">{qty}</output>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                disabled={!inStock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleWish}
              aria-pressed={wished}
            >
              <HeartIcon size={18} filled={wished} />
              {wished ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>

          <div className="pd__actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => handleAdd(false)}
              disabled={!inStock}
            >
              <CartIcon size={18} /> Add to Cart
            </button>
            <button
              type="button"
              className="btn btn-accent btn-lg"
              onClick={() => handleAdd(true)}
              disabled={!inStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {hasReviews && (
        <section className="reviews" aria-labelledby="reviews-heading">
          <div className="reviews-head">
            <h2 id="reviews-heading" className="section-title">
              Customer Reviews
            </h2>
            <span className="rating-summary">
              <span className="rating-summary__score">{product.rating}</span>
              <RatingStars rating={product.rating} />
              <span className="review-count">{product.reviews.length} reviews</span>
            </span>
          </div>
          {product.reviews.map((review, i) => (
            <article key={i} className="review">
              <div className="review__head">
                <span className="review__avatar" aria-hidden="true">
                  {initials(review.reviewerName)}
                </span>
                <div>
                  <p className="review__name">{review.reviewerName}</p>
                  <p className="review__date">{review.date}</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <RatingStars rating={review.rating} />
                </div>
              </div>
              <p className="review__comment">
                {review.comment || 'No written review was left.'}
              </p>
            </article>
          ))}
        </section>
      )}
    </>
  )
}