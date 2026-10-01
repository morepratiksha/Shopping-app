import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { totals, useCart } from './store/cartStore'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'

export default function App() {
  const count = useCart((s) => totals(s.items).count)
  return (
    <>
      <header className="header">
        <Link to="/" className="header__logo">Shopfront</Link>
        <nav className="header__nav" aria-label="Main">
          <NavLink to="/cart" className="header__cart" aria-label={`Cart, ${count} items`}>
            Cart <span className="header__badge" aria-live="polite">{count}</span>
          </NavLink>
        </nav>
      </header>
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<p className="notice">Page not found. <Link to="/">Back to products</Link></p>} />
        </Routes>
      </main>
    </>
  )
}
