import { Link } from 'react-router-dom'
import { money, type Product } from '../types'

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link to={`/product/${p.id}`} className="card">
      <img className="card__img" src={p.thumbnail} alt={p.title} loading="lazy" />
      <div className="card__body">
        <h2 className="card__title">{p.title}</h2>
        <p className="card__meta">{p.category} · {p.rating.toFixed(1)} rating</p>
        <p className="card__price">{money(p.price)}</p>
      </div>
    </Link>
  )
}
