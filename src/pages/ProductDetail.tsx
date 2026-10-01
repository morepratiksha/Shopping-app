import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../store/cartStore'
import { API, money, type Product } from '../types'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: p, error, loading } = useFetch<Product>(`${API}/products/${id}`)
  const add = useCart((s) => s.add)
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  const [added, setAdded] = useState('')

  if (loading) return <div className="detail detail--skeleton" aria-busy="true" />
  if (error === 'not-found') return <p className="notice">Product not found. <Link to="/">Back to products</Link></p>
  if (error || !p) return <p className="notice notice--error" role="alert">Couldn't load this product. Reload to try again.</p>

  return (
    <article className="detail">
      <div className="detail__gallery">
        <img className="detail__hero" src={p.images[img] ?? p.thumbnail} alt={p.title} />
        <div className="detail__thumbs">
          {p.images.slice(0, 4).map((src, i) => (
            <button key={src} className={`detail__thumb${i === img ? ' detail__thumb--active' : ''}`} onClick={() => setImg(i)} aria-label={`Show image ${i + 1}`}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="detail__info">
        <Link to="/" className="detail__back">Back to products</Link>
        <h1>{p.title}</h1>
        <p className="detail__price">{money(p.price)}</p>
        <p>{p.description}</p>
        <p className={p.stock > 0 ? 'stock' : 'stock stock--out'}>{p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</p>
        <div className="detail__buy">
          <label className="field">Quantity
            <input type="number" min={1} max={p.stock} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(p.stock, Number(e.target.value) || 1)))} />
          </label>
          <button className="btn" disabled={p.stock === 0} onClick={() => { add(p, qty); setAdded(`Added ${qty} to cart`) }}>Add to cart</button>
        </div>
        <p className="detail__status" role="status">{added}</p>
      </div>
    </article>
  )
}
