export function SkeletonCard() {
  return (
    <div className="skel-card card" aria-hidden="true">
      <div className="skel-media skeleton" />
      <div className="skel-line skeleton" />
      <div className="skel-line skeleton short" />
    </div>
  )
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="product-grid" aria-label="Loading products" aria-busy="true">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}