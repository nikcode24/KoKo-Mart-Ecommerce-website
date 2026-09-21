import { AlertIcon, BoxIcon, SearchIcon } from './icons'

export function ErrorState({
  title = "Couldn't load this content",
  message = 'Something went wrong.',
  onRetry,
}) {
  return (
    <div className="state-block" role="alert">
      <span className="state-block__icon">
        <AlertIcon size={28} />
      </span>
      <p className="state-block__title">{title}</p>
      <p className="state-block__text">{message}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({
  title = 'Nothing here yet',
  text = 'Try adjusting your search or filters.',
  icon = 'search',
  action,
}) {
  const Icons = { search: SearchIcon, box: BoxIcon }
  const Icon = Icons[icon] || SearchIcon
  return (
    <div className="state-block">
      <span className="state-block__icon">
        <Icon size={28} />
      </span>
      <p className="state-block__title">{title}</p>
      <p className="state-block__text">{text}</p>
      {action}
    </div>
  )
}