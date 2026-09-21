import { Link } from 'react-router-dom'

import { usePageTitle } from '../hooks/usePageTitle'
import { BoxIcon } from '../components/icons'

export default function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <div className="state-block" style={{ marginTop: 40 }}>
      <span className="state-block__icon">
        <BoxIcon size={30} />
      </span>
      <p className="state-block__title">Page not found</p>
      <p className="state-block__text">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to home
      </Link>
    </div>
  )
}