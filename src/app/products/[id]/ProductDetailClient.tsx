'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Product, DiscountCalculation } from '@/types'
import ImageGallery from '@/components/ImageGallery'
import ProductInfo from '@/components/ProductInfo'
import SellerInfo from '@/components/SellerInfo'
import ProductSpecifications from '@/components/ProductSpecifications'
import ProductReviews from '@/components/ProductReviews'
import ProductSkeleton from '@/components/ui/ProductSkeleton'

interface ProductDetailClientProps {
  initialData: {
    product: Product
    pricing: DiscountCalculation
  }
  productId: string
}

export default function ProductDetailClient({ 
  initialData, 
  productId 
}: ProductDetailClientProps) {
  const [productData, setProductData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const refreshProductData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/products/${productId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch updated product data')
        }
        
        const data = await response.json()
        if (data.success) {
          setProductData(data.data)
        }
      } catch (err) {
        console.error('Error refreshing product data:', err)
        setError('Failed to load updated product information')
      } finally {
        setIsLoading(false)
      }
    }

    const interval = setInterval(refreshProductData, 30000)
    return () => clearInterval(interval)
  }, [productId])

  if (isLoading && !productData) {
    return <ProductSkeleton />
  }

  if (error && !productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const { product, pricing } = productData

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 truncate">{product.title}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <ImageGallery images={product.images} title={product.title} />
          </div>
          
          <div>
            <ProductInfo 
              product={product}
              discountedPrice={pricing.discountedPrice}
              discountPercentage={pricing.discountPercentage}
            />
          </div>
        </div>

        {product.description && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProductReviews reviews={product.reviews} />
            <ProductSpecifications specifications={product.specifications} />
          </div>
          
          <div>
            <SellerInfo seller={product.seller} />
          </div>
        </div>

        {pricing.appliedDiscounts.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">
              Active Discounts Applied
            </h3>
            <div className="space-y-2">
              {pricing.appliedDiscounts.map((discount) => (
                <div key={discount.id} className="flex justify-between items-center">
                  <span className="text-green-700 font-medium">
                    {discount.name || `${discount.type} discount`}
                  </span>
                  <span className="text-green-800 font-bold">
                    {discount.type === 'percentage' ? `${pricing.discountPercentage}%` : `$${discount.value}`} OFF
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {product.tags && product.tags.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}