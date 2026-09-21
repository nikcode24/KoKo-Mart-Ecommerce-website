import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getAllProducts, getCategories } from '../api/products'
import { useProducts } from '../hooks/useProducts'
import { useDebounce } from '../hooks/useDebounce'
import { usePageTitle } from '../hooks/usePageTitle'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'
import CategoryChips from '../components/CategoryChips'
import { ErrorState, EmptyState } from '../components/States'
import { SkeletonGrid } from '../components/Skeleton'
import { SearchIcon } from '../components/icons'
import { displayCategoryName } from '../components/CategoryChips'
import { pluralize } from '../utils/format'

const PAGE_SIZE = 12

const SORTS = [
  { value: '', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Biggest Discount' },
]

function applyFilters(products, { term, category, sort }) {
  let list = products

  if (term) {
    const t = term.toLowerCase()
    list = list.filter(
      (p) =>
        p.title.toLowerCase().includes(t) ||
        (p.brand && p.brand.toLowerCase().includes(t)) ||
        (p.category && p.category.toLowerCase().includes(t)),
    )
  }

  if (category) {
    list = list.filter((p) => p.category === category)
  }

  switch (sort) {
    case 'price-asc':
      list = [...list].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list = [...list].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      list = [...list].sort((a, b) => b.rating - a.rating)
      break
    case 'discount':
      list = [...list].sort(
        (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0),
      )
      break
    default:
      break
  }

  return list
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const qParam = searchParams.get('q') || ''
  const categoryParam = searchParams.get('category') || ''
  const sortParam = searchParams.get('sort') || ''
  const pageParam = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)

  const [term, setTerm] = useState(qParam)
  const debouncedTerm = useDebounce(term, 300)
  const activeCategoryName = categoryParam ? displayCategoryName(categoryParam) : null
  const { products: all, loading, error, reload } = useProducts(
    getAllProducts,
    'all',
  )
  const { products: categories } = useProducts(getCategories, 'categories')

  usePageTitle(
    debouncedTerm
      ? `Search: ${debouncedTerm}`
      : activeCategoryName || 'All Products',
  )

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })
    setSearchParams(next, { replace: true })
  }

  useEffect(() => {
    if (debouncedTerm !== qParam) {
      updateParams({ q: debouncedTerm, page: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTerm])

  const results = useMemo(
    () =>
      applyFilters(all || [], {
        term: debouncedTerm,
        category: categoryParam,
        sort: sortParam,
      }),
    [all, debouncedTerm, categoryParam, sortParam],
  )

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const safePage = Math.min(pageParam, totalPages)
  const paged = useMemo(
    () => results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [results, safePage],
  )

  const setPage = (page) => updateParams({ page: page > 1 ? String(page) : '' })
  const setCategory = (value) => updateParams({ category: value, page: '' })
  const setSort = (value) => updateParams({ sort: value, page: '' })

  return (
    <>
      <header>
        <h1 className="page-title">
          {debouncedTerm
            ? `Search results for "${debouncedTerm}"`
            : activeCategoryName || 'All Products'}
        </h1>
        {!loading && (
          <p className="page-sub">
            {pluralize(results.length, 'result')} {debouncedTerm ? `for "${debouncedTerm}"` : ''}
          </p>
        )}
      </header>

      <div className="toolbar section" style={{ marginTop: 16 }}>
        <CategoryChips categories={categories} active={categoryParam} />
        <div className="toolbar__row">
          <div className="search-bar" style={{ flex: 1, maxWidth: 420 }}>
            <SearchIcon size={18} />
            <input
              type="search"
              placeholder="Search by product, brand, or category"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <select
            className="filter-select"
            value={sortParam}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <span className="toolbar__spacer" />
          <span className="results-meta" aria-live="polite">
            {loading ? 'Loading…' : `${results.length} products`}
          </span>
        </div>

        {categoryParam && (
          <div className="toolbar__row">
            <button
              type="button"
              className="chip is-active"
              onClick={() => setCategory('')}
              aria-label={`Remove ${activeCategoryName} filter`}
            >
              {activeCategoryName} ✕
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <SkeletonGrid count={12} />
      ) : error ? (
        <ErrorState message={error.message} onRetry={reload} />
      ) : results.length === 0 ? (
        <EmptyState
          title="No matching products"
          text="We couldn't find anything that matches your search. Try different keywords or clear your filters."
          icon="search"
          action={
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setTerm('')
                setCategory('')
                setSort('')
              }}
            >
              Clear all filters
            </button>
          }
        />
      ) : (
        <>
          <div className="product-grid">
            {paged.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Pagination page={safePage} total={totalPages} onChange={setPage} />
        </>
      )}
    </>
  )
}