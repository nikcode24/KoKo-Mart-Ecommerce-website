import { useId } from 'react'

const Star = ({ ratio }) => {
  const grad = `${useId().replace(/:/g, '')}-star`
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="star-svg"
    >
      {ratio > 0 && ratio < 1 && (
        <defs>
          <linearGradient id={grad}>
            <stop offset={`${ratio * 100}%`} stopColor="#ffb400" />
            <stop offset={`${ratio * 100}%`} stopColor="#e6e9f0" />
          </linearGradient>
        </defs>
      )}
      <path
        d="m12 3 2.7 5.6 6.1.8-4.5 4.3 1.1 6L12 17.2l-5.4 2.5 1.1-6L3.2 9.4l6.1-.8Z"
        fill={ratio > 0 && ratio < 1 ? `url(#${grad})` : ratio >= 1 ? '#ffb400' : '#e6e9f0'}
      />
    </svg>
  )
}

export default function RatingStars({ rating = 0, showValue = false, count = 0 }) {
  if (rating == null) return null

  return (
    <span className="stars" role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const ratio = Math.max(0, Math.min(1, rating - i))
        return <Star key={i} ratio={ratio} />
      })}
      {showValue && <span style={{ marginLeft: 4 }}>{rating.toFixed(1)}</span>}
      {count > 0 && <span>({count})</span>}
    </span>
  )
}