import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ProductInfoProps {
  product: Product
  discountedPrice?: number
  discountPercentage?: number
}

export default function ProductInfo({ 
  product, 
  discountedPrice, 
  discountPercentage 
}: ProductInfoProps) {
  const finalPrice = discountedPrice || product.discountedPrice || product.basePrice
  const savings = discountPercentage || product.discountPercentage || 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {product.title}
        </h1>
        <p className="text-gray-600 text-sm">
          Sold by {product.seller.name} • {product.stockQuantity} available
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(finalPrice, product.currency)}
          </span>
          {savings > 0 && (
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(product.basePrice, product.currency)}
            </span>
          )}
        </div>
        
        {savings > 0 && (
          <div className="flex items-center space-x-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
              {savings}% OFF
            </span>
            <span className="text-green-600 text-sm">
              You save {formatPrice(product.basePrice - finalPrice, product.currency)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Payment Methods</h3>
        <div className="flex flex-wrap gap-2">
          {product.paymentMethods.map((method, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping</span>
          <div className="text-right">
            {product.shippingInfo.freeShipping ? (
              <span className="text-green-600 font-medium">Free shipping</span>
            ) : (
              <span className="text-gray-900">
                {formatPrice(product.shippingInfo.cost || 0, product.currency)}
              </span>
            )}
            <div className="text-sm text-gray-500">
              Arrives in {product.shippingInfo.estimatedDays} days
            </div>
          </div>
        </div>

        {product.condition && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Condition</span>
            <span className="text-gray-900 capitalize">{product.condition}</span>
          </div>
        )}

        {product.warranty && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Warranty</span>
            <span className="text-gray-900">{product.warranty}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button 
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          disabled={product.stockQuantity === 0}
        >
          {product.stockQuantity === 0 ? 'Out of Stock' : 'Buy Now'}
        </button>
        
        <button 
          className="w-full border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          disabled={product.stockQuantity === 0}
        >
          Add to Cart
        </button>
      </div>

      {product.stockQuantity <= 10 && product.stockQuantity > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-orange-800 font-medium">
            Only {product.stockQuantity} left in stock!
          </p>
        </div>
      )}
    </div>
  )
}