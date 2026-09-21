import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · KoKo Mart` : 'KoKo Mart — Shop Smart, Live Better'
    return () => {
      document.title = previous
    }
  }, [title])
}