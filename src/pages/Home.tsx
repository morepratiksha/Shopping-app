import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/useFetch'
import { API, type Product } from '../types'

export default function Home() {
  const { data, error, loading } = useFetch<{ products: Product[] }>(`${API}/products?limit=100`)
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const cat = params.get('category') ?? ''
  const sort = params.get('sort') ?? ''

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    value ? next.set(key, value) : next.delete(key)
    setParams(next, { replace: true })
  }

  const categories = useMemo(() => [...new Set((data?.products ?? []).map((p) => p.category))].sort(), [data])
  const list = useMemo(() => {
    const l = (data?.products ?? []).filter(
      (p) => (!cat || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase())
    )
    if (sort === 'price-asc') l.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') l.sort((a, b) => b.price - a.price)
    if (sort === 'rating') l.sort((a, b) => b.rating - a.rating)
    return l
  }, [data, q, cat, sort])

  return (
    <>
      <div className="filters">
        <label className="field">Search
          <input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search products" />
        </label>
        <label className="field">Category
          <select value={cat} onChange={(e) => set('category', e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="field">Sort by
          <select value={sort} onChange={(e) => set('sort', e.target.value)}>
            <option value="">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </label>
      </div>
      {error && <p className="notice notice--error" role="alert">Couldn't load products. Check your connection and reload.</p>}
      <div className="grid">
        {loading && Array.from({ length: 8 }, (_, i) => <div key={i} className="card card--skeleton" aria-hidden />)}
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {!loading && !error && list.length === 0 && <p className="notice">No products match. Clear a filter to see more.</p>}
    </>
  )
}
