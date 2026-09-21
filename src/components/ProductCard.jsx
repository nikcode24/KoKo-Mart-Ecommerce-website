import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { computedPrice, formatNPR } from '../utils/format'
import RatingStars from './RatingStars'
import { CartIcon, HeartIcon } from './icons'

export default function ProductCard({ product, eager = false }) {
  const { addToCart, isInCart, getQty } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { push } = useToast()
  const navigate = useNavigate()

  const { original } = computedPrice(product)
  const percent = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0
  const wished = isWishlisted(product.id)

  const handleWish = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    push(
      wished ? 'Removed from wishlist' : 'Added to wishlist',
      wished ? 'error' : 'success',
    )
  }

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isInCart(product.id)) {
      navigate('/cart')
      return
    }
    addToCart(product.id, 1)
    push(`${product.title} added to cart`)
  }

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} aria-label={product.title}>
        <div className="product-card__media">
          {percent > 0 && (
            <span className="pill pill-save product-card__discount">
              {percent}% OFF
            </span>
          )}
          <img
            src={product.thumbnail}
            alt={product.title}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      </Link>
      <button
        type="button"
        className={`product-card__wish${wished ? ' is-active' : ''}`}
        onClick={handleWish}
        aria-label={wished ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
        title={wished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <HeartIcon size={17} filled={wished} />
      </button>

      <div className="product-card__body">
        {product.brand && <span className="product-card__brand">{product.brand}</span>}
        <h3 className="product-card__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <span className="product-card__rating">
          <RatingStars rating={product.rating} />
          {product.rating.toFixed(1)}
        </span>
        <div className="product-card__price">
          <span className="price">{formatNPR(product.price)}</span>
          {percent > 0 && <span className="price-strike">{formatNPR(original)}</span>}
        </div>
        <button
          type="button"
          className="btn btn-primary btn-block mt-2"
          onClick={handleAdd}
        >
          <CartIcon size={17} />
          {isInCart(product.id) ? `In cart (${getQty(product.id)})` : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}