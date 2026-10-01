import { Link, useLocation } from 'react-router-dom'
import { money } from '../types'

export default function Confirmation() {
  const s = useLocation().state as { orderId: string; name: string; total: number } | null
  if (!s) return <p className="notice">No recent order. <Link to="/">Browse products</Link></p>
  return (
    <div className="notice notice--ok">
      <h1>Order placed</h1>
      <p>Thanks, {s.name}. Order <strong>{s.orderId}</strong> for {money(s.total)} is confirmed.</p>
      <Link to="/" className="btn">Keep shopping</Link>
    </div>
  )
}
