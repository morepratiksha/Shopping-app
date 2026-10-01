import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name'),
  email: z.string().trim().email('Enter a valid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a 10-digit phone number'),
  address: z.string().trim().min(8, 'Enter your full street address'),
  city: z.string().trim().min(2, 'Enter your city'),
  pin: z.string().regex(/^\d{6}$/, 'Enter a 6-digit PIN code'),
})

export type CheckoutForm = z.infer<typeof checkoutSchema>
