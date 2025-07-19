import { Product, DiscountRule, DiscountCalculation } from '@/types'
import { readDiscounts } from './fileOperations'

export async function calculateProductDiscount(product: Product, discounts?: DiscountRule[]): Promise<DiscountCalculation> {
  const allDiscounts = discounts || await readDiscounts()
  const applicableDiscounts = getApplicableDiscounts(product, allDiscounts)
  
  let finalPrice = product.discountedPrice && product.discountedPrice < product.basePrice 
    ? product.discountedPrice 
    : product.basePrice
  let totalDiscountAmount = product.basePrice - finalPrice
  const appliedDiscounts: DiscountRule[] = []
  
  for (const discount of applicableDiscounts) {
    const discountAmount = applyDiscount(finalPrice, discount)
    if (discountAmount > 0) {
      finalPrice -= discountAmount
      totalDiscountAmount += discountAmount
      appliedDiscounts.push(discount)
    }
  }
  
  return {
    originalPrice: product.basePrice,
    discountedPrice: Math.max(0, finalPrice),
    discountAmount: totalDiscountAmount,
    discountPercentage: totalDiscountAmount > 0 ? Math.round((totalDiscountAmount / product.basePrice) * 100) : 0,
    appliedDiscounts
  }
}

function getApplicableDiscounts(product: Product, discounts: DiscountRule[]): DiscountRule[] {
  return discounts.filter(discount => discount.isActive)
}

function applyDiscount(price: number, discount: DiscountRule): number {
  switch (discount.type) {
    case 'percentage':
      return (price * discount.value) / 100
    
    case 'fixed':
      return Math.min(discount.value, price)
    
    default:
      return 0
  }
}

