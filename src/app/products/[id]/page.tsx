import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products/${id}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch product')
    }
    
    const data = await response.json()
    return data.success ? data.data : null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const productData = await getProduct(id)
  
  if (!productData) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    }
  }

  const { product } = productData
  const price = product.discountedPrice || product.basePrice

  return {
    title: `${product.title} - MELI Products`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.slice(0, 1),
      type: 'website',
      siteName: 'MELI Products',
    },
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': product.currency,
      'product:availability': product.stockQuantity > 0 ? 'in stock' : 'out of stock',
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const productData = await getProduct(id)

  if (!productData) {
    notFound()
  }

  return (
    <ErrorBoundary>
      <ProductDetailClient 
        initialData={productData}
        productId={id}
      />
    </ErrorBoundary>
  )
}