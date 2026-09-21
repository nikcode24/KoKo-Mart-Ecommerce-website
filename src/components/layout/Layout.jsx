import { Outlet } from 'react-router-dom'

import Header from './Header'
import BottomNav from './BottomNav'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="main container">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}