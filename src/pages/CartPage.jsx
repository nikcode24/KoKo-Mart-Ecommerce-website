import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllProducts } from '../api/products'
import { useProducts } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatNPR } from '../utils/format'
import { EmptyState, ErrorState } from '../components/States'
import { SkeletonGrid } from '../components/Skeleton'
import ConfirmDialog from '../components/ConfirmDialog'
import { CartIcon, TrashIcon } from '../components/icons'

const TAX_RATE = 0.13

function CartItemRow({ product, qty }) {
  const { setQuantity, removeFromCart } = useCart()
  const { push } = useToast()
  const total = product.price * qty

  return (
    <li className="cart-item">
      <Link to={`/products/${product.id}`} className="cart-item__img" aria-label={product.title}>
        <img src={product.thumbnail} alt="" />
      </Link>
      <div>
        <h3 className="cart-item__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="cart-item__brand">{product.brand}</p>
        <p className="cart-item__unit">
          {formatNPR(product.price)} each
        </p>
      </div>
      <div className="cart-item__actions">
        <div className="qty-stepper" style={{ borderWidth: 1.5 }}>
          <button
            type="button"
            onClick={() => setQuantity(product.id, qty - 1)}
            aria-label={`Decrease quantity of ${product.title}`}
          >
            −
          </button>
          <output aria-live="polite">{qty}</output>
          <button
            type="button"
            onClick={() => setQuantity(product.id, qty + 1)}
            aria-label={`Increase quantity of ${product.title}`}
          >
            +
          </button>
        </div>
        <span className="price">{formatNPR(total)}</span>
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            removeFromCart(product.id)
            push(`${product.title} removed from cart`, 'error')
          }}
        >
          <TrashIcon size={15} /> Remove
        </button>
      </div>
    </li>
  )
}

export default function CartPage() {
  const { items, clearCart } = useCart()
  const { push } = useToast()
  const [confirmClear, setConfirmClear] = useState(false)
  const { products: all, loading, error, reload } = useProducts(
    getAllProducts,
    'all',
  )

  usePageTitle('My Cart')

  const productMap = useMemo(() => {
    const map = new Map()
    if (all) all.forEach((p) => map.set(p.id, p))
    return map
  }, [all])

  const lineItems = useMemo(
    () =>
      items
        .map((item) => ({ item, product: productMap.get(item.id) }))
        .filter((entry) => entry.product),
    [items, productMap],
  )

  const totals = useMemo(() => {
    const subtotal = lineItems.reduce((sum, { item, product }) => sum + product.price * item.qty, 0)
    const savings = lineItems.reduce(
      (sum, { item, product }) => {
        const original = product.discountPercentage
          ? product.price / (1 - product.discountPercentage / 100)
          : product.price
        return sum + Math.max(0, original - product.price) * item.qty
      },
      0,
    )
    const tax = subtotal * TAX_RATE
    return { subtotal, savings, tax, total: subtotal + tax }
  }, [lineItems])

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        text="Looks like you haven't added anything yet. Explore the catalog and find something you love."
        icon="box"
        action={
          <Link to="/products" className="btn btn-primary">
            Start shopping
          </Link>
        }
      />
    )
  }

  if (loading) return <SkeletonGrid count={4} />
  if (error) return <ErrorState message={error.message} onRetry={reload} />
  if (lineItems.length === 0) {
    return <ErrorState message="Some items in your cart are no longer available." />
  }

  return (
    <>
      <header className="section-head" style={{ marginBottom: 18 }}>
        <div>
          <h1 className="page-title">My Cart ({items.length})</h1>
          <p className="page-sub">{lineItems.reduce((s, e) => s + e.item.qty, 0)} items</p>
        </div>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setConfirmClear(true)}
        >
          <TrashIcon size={16} /> Clear cart
        </button>
      </header>

      <div className="cart-layout">
        <ul className="cart-list">
          {lineItems.map(({ item, product }) => (
            <CartItemRow key={item.id} product={product} qty={item.qty} />
          ))}
        </ul>

        <aside className="summary card" aria-label="Order summary">
          <h2 className="section-title">Order Summary</h2>
          <dl className="summary__rows">
            <div className="summary__row">
              <dt>Subtotal</dt>
              <dd className="amount">{formatNPR(totals.subtotal)}</dd>
            </div>
            {totals.savings > 0 && (
              <div className="summary__row">
                <dt>You save</dt>
                <dd className="amount" style={{ color: 'var(--color-success)' }}>
                  −{formatNPR(totals.savings)}
                </dd>
              </div>
            )}
            <div className="summary__row">
              <dt>Shipping</dt>
              <dd className="amount">Free</dd>
            </div>
            <div className="summary__row">
              <dt>Tax ({Math.round(TAX_RATE * 100)}%)</dt>
              <dd className="amount">{formatNPR(totals.tax)}</dd>
            </div>
            <div className="summary__row total">
              <dt>Total</dt>
              <dd className="amount">{formatNPR(totals.total)}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="btn btn-accent btn-lg btn-block"
            onClick={() => push('Payment processing is a demo in this build.', 'success')}
          >
            Proceed to Checkout
          </button>
          <div className="mt-2 text-center">
            <Link to="/products" className="section-link">
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>

      <ConfirmDialog
        open={confirmClear}
        title="Clear the whole cart?"
        message={`This will remove all ${items.length} item${items.length === 1 ? '' : 's'} from your cart. This can't be undone.`}
        confirmLabel="Yes, clear cart"
        onConfirm={() => {
          clearCart()
          setConfirmClear(false)
          push('Cart cleared', 'error')
        }}
        onCancel={() => setConfirmClear(false)}
      />
    </>
  )
}