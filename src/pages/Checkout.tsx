import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { checkoutSchema, type CheckoutForm } from '../schemas/checkout'
import { totals, useCart } from '../store/cartStore'
import { money } from '../types'

const fields: { name: keyof CheckoutForm; label: string; type?: string; autoComplete: string }[] = [
  { name: 'name', label: 'Full name', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone (10 digits)', type: 'tel', autoComplete: 'tel-national' },
  { name: 'address', label: 'Street address', autoComplete: 'street-address' },
  { name: 'city', label: 'City', autoComplete: 'address-level2' },
  { name: 'pin', label: 'PIN code', autoComplete: 'postal-code' },
]

export default function Checkout() {
  const { items, clear } = useCart()
  const navigate = useNavigate()
  const t = totals(items)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  })

  if (!items.length) return <p className="notice">Your cart is empty. <Link to="/">Browse products</Link></p>

  const onSubmit = async (form: CheckoutForm) => {
    await new Promise((r) => setTimeout(r, 600)) // simulated payment
    const orderId = `SF-${Date.now().toString(36).toUpperCase()}`
    clear()
    navigate('/confirmation', { state: { orderId, name: form.name, total: t.total } })
  }

  return (
    <div className="checkout">
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Delivery details</h1>
        {fields.map((f) => (
          <label key={f.name} className="field">{f.label}
            <input type={f.type ?? 'text'} autoComplete={f.autoComplete} aria-invalid={!!errors[f.name]} aria-describedby={`${f.name}-err`} {...register(f.name)} />
            <span id={`${f.name}-err`} className="field__error" role="alert">{errors[f.name]?.message}</span>
          </label>
        ))}
        <button className="btn" disabled={isSubmitting}>{isSubmitting ? 'Placing order…' : `Place order · ${money(t.total)}`}</button>
      </form>
      <aside className="summary" aria-label="Order summary">
        <h2>Order summary</h2>
        {items.map((i) => <div key={i.id}><dt>{i.title} × {i.qty}</dt><dd>{money(i.price * i.qty)}</dd></div>)}
        <div className="summary__total"><dt>Total incl. tax</dt><dd>{money(t.total)}</dd></div>
      </aside>
    </div>
  )
}
