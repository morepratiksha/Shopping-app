import { beforeEach, describe, expect, it } from 'vitest'
import { totals, useCart } from './cartStore'
import type { Product } from '../types'

const p = (id: number, price: number, stock = 5): Product => ({
  id, price, stock, title: `P${id}`, description: '', category: 'x', rating: 4, thumbnail: '', images: [],
})

describe('cart store', () => {
  beforeEach(() => useCart.getState().clear())

  it('merges duplicate adds into one line', () => {
    useCart.getState().add(p(1, 10))
    useCart.getState().add(p(1, 10))
    expect(useCart.getState().items).toHaveLength(1)
    expect(useCart.getState().items[0].qty).toBe(2)
  })

  it('keeps quantity between 1 and stock', () => {
    useCart.getState().add(p(1, 10, 3))
    useCart.getState().setQty(1, 99)
    expect(useCart.getState().items[0].qty).toBe(3)
    useCart.getState().setQty(1, 0)
    expect(useCart.getState().items[0].qty).toBe(1)
  })

  it('derives subtotal, tax and total', () => {
    useCart.getState().add(p(1, 100), 2)
    useCart.getState().add(p(2, 50))
    const t = totals(useCart.getState().items)
    expect(t.subtotal).toBe(250)
    expect(t.tax).toBeCloseTo(45)
    expect(t.total).toBeCloseTo(295)
    expect(t.count).toBe(3)
  })

  it('removes items', () => {
    useCart.getState().add(p(1, 10))
    useCart.getState().remove(1)
    expect(useCart.getState().items).toHaveLength(0)
  })
})
