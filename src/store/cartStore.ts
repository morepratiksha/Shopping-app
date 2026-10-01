import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../types'

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  stock: number
  qty: number
}

interface CartState {
  items: CartItem[]
  add: (p: Product, qty?: number) => void
  setQty: (id: number, qty: number) => void
  remove: (id: number) => void
  clear: () => void
}

export const TAX_RATE = 0.18
const clamp = (qty: number, stock: number) => Math.max(1, Math.min(qty, stock))

export const totals = (items: CartItem[]) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const tax = subtotal * TAX_RATE
  return { subtotal, tax, total: subtotal + tax, count: items.reduce((s, i) => s + i.qty, 0) }
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (p, qty = 1) =>
        set((s) => {
          const found = s.items.find((i) => i.id === p.id)
          if (found)
            return { items: s.items.map((i) => (i.id === p.id ? { ...i, qty: clamp(i.qty + qty, i.stock) } : i)) }
          const { id, title, price, thumbnail, stock } = p
          return { items: [...s.items, { id, title, price, thumbnail, stock, qty: clamp(qty, stock) }] }
        }),
      setQty: (id, qty) =>
        set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty: clamp(qty, i.stock) } : i)) })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'shopfront-cart' }
  )
)
