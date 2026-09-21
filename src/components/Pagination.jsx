import { ChevronLeft, ChevronRight } from './icons'

function getPageWindow(current, total) {
  const pages = []
  const start = Math.max(2, current - 2)
  const end = Math.min(total - 1, current + 2)
  for (let i = start; i <= end; i += 1) pages.push(i)
  return { pages, showStartGap: current > 4, showEndGap: current < total - 3 }
}

export default function Pagination({ page, total, onChange }) {
  if (total <= 1) return null
  const { pages, showStartGap, showEndGap } = getPageWindow(page, total)

  const btn = (label, value, opts = {}) => (
    <button
      type="button"
      key={label}
      className={`page-btn${value === page ? ' is-active' : ''}`}
      onClick={() => onChange(value)}
      disabled={opts.disabled}
      aria-current={value === page ? 'page' : undefined}
      aria-label={opts.label}
    >
      {label}
    </button>
  )

  const prev = (
    <button
      type="button"
      key="prev"
      className="page-btn"
      onClick={() => onChange(page - 1)}
      disabled={page <= 1}
      aria-label="Previous page"
    >
      <ChevronLeft size={18} />
    </button>
  )

  const next = (
    <button
      type="button"
      key="next"
      className="page-btn"
      onClick={() => onChange(page + 1)}
      disabled={page >= total}
      aria-label="Next page"
    >
      <ChevronRight size={18} />
    </button>
  )

  return (
    <nav className="pagination" aria-label="Pagination">
      {prev}
      {btn(1, 1)}
      {showStartGap && <span className="page-btn" aria-hidden="true">…</span>}
      {pages.map((p) => btn(p, p))}
      {showEndGap && <span className="page-btn" aria-hidden="true">…</span>}
      {total > 1 && btn(total, total)}
      {next}
    </nav>
  )
}