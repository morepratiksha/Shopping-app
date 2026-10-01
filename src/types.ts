export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  rating: number
  stock: number
  thumbnail: string
  images: string[]
}

export const API = 'https://dummyjson.com'
export const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
