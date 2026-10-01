import { Link } from 'react-router-dom'
import { totals, useCart } from '../store/cartStore'
import { money } from '../types'

export default function Cart() {
  const { items, setQty, remove } = useCart()
  const t = totals(items)

  if (!items.length) return <p className="notice">Your cart is empty. <Link to="/">Browse products</Link></p>

  return (
    <div className="cart">
      <h1>Your cart</h1>
      <ul className="cart__list">
        {items.map((i) => (
          <li key={i.id} className="cart__row">
            <img src={i.thumbnail} alt="" className="cart__img" />
            <div className="cart__name">
              <Link to={`/product/${i.id}`}>{i.title}</Link>
              <span>{money(i.price)}</span>
            </div>
            <div className="cart__qty">
              <button aria-label={`Decrease quantity of ${i.title}`} onClick={() => setQty(i.id, i.qty - 1)} disabled={i.qty <= 1}>−</button>
              <span aria-live="polite">{i.qty}</span>
              <button aria-label={`Increase quantity of ${i.title}`} onClick={() => setQty(i.id, i.qty + 1)} disabled={i.qty >= i.stock}>+</button>
            </div>
            <strong>{money(i.price * i.qty)}</strong>
            <button className="link" onClick={() => remove(i.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <dl className="summary">
        <div><dt>Subtotal</dt><dd>{money(t.subtotal)}</dd></div>
        <div><dt>Tax (18%)</dt><dd>{money(t.tax)}</dd></div>
        <div className="summary__total"><dt>Total</dt><dd>{money(t.total)}</dd></div>
      </dl>
      <Link to="/checkout" className="btn">Go to checkout</Link>
    </div>
  )
}
