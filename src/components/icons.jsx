const Svg = ({ size = 20, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

export const SearchIcon = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Svg>
)

export const CartIcon = (p) => (
  <Svg {...p}>
    <path d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.47 1.2h8.86a1.5 1.5 0 0 0 1.47-1.18L21 8H6" />
    <circle cx="10" cy="21" r="1" />
    <circle cx="18" cy="21" r="1" />
  </Svg>
)

export const HeartIcon = ({ filled = false, ...p }) => (
  <Svg {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M19.5 13.6 12 21l-7.5-7.4a5.1 5.1 0 0 1 7.5-6.9 5.1 5.1 0 0 1 7.5 6.9Z" />
  </Svg>
)

export const HomeIcon = (p) => (
  <Svg {...p}>
    <path d="m3 10.5 9-7 9 7V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1Z" />
  </Svg>
)

export const GridIcon = (p) => (
  <Svg {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </Svg>
)

export const UserIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />
  </Svg>
)

export const ChevronRight = (p) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
)

export const ChevronLeft = (p) => (
  <Svg {...p}>
    <path d="m15 6-6 6 6 6" />
  </Svg>
)

export const BackIcon = (p) => (
  <Svg {...p}>
    <path d="m13 5-7 7 7 7" />
    <path d="M7 12h14" />
  </Svg>
)

export const TrashIcon = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </Svg>
)

export const CloseIcon = (p) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
)

export const AlertIcon = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16.5v.01" />
  </Svg>
)

export const BoxIcon = (p) => (
  <Svg {...p}>
    <path d="M21 8 12 3 3 8v8l9 5 9-5Z" />
    <path d="M3 8l9 5 9-5M12 13v8" />
  </Svg>
)

export const BoltIcon = (p) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </Svg>
)

export const CheckIcon = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
)