import { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import ScrollToTop from './components/ScrollToTop'
import RequireAuth from './components/RequireAuth'
import NotFoundPage from './pages/NotFoundPage'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))

function PageLoader() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading page"
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: '80px 0',
        color: 'var(--color-text-faint)',
        fontWeight: 600,
      }}
    >
      <div className="skeleton" style={{ width: 220, height: 18 }} />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path="products" element={<ProductsPage />} />
                      <Route path="products/:id" element={<ProductDetailsPage />} />
                      <Route path="cart" element={<CartPage />} />
                      <Route path="wishlist" element={<WishlistPage />} />
                      <Route path="login" element={<LoginPage />} />
                      <Route path="signup" element={<SignupPage />} />
                      <Route
                        path="account"
                        element={
                          <RequireAuth>
                            <AccountPage />
                          </RequireAuth>
                        }
                      />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                  </Routes>
                </Suspense>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}