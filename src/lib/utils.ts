// Client-side utilities that don't require Node.js APIs

export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export function calculateSavings(originalPrice: number, discountedPrice: number): {
  amount: number
  percentage: number
} {
  const amount = originalPrice - discountedPrice
  const percentage = originalPrice > 0 ? Math.round((amount / originalPrice) * 100) : 0
  
  return { amount, percentage }
}