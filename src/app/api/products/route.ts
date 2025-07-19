import { NextRequest, NextResponse } from 'next/server'
import { readProducts, createProduct } from '@/lib/fileOperations'
import { Product, ApiResponse, ProductFilters, PaginationParams } from '@/types'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters: ProductFilters = {
      category: searchParams.get('category') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minRating: searchParams.get('minRating') ? Number(searchParams.get('minRating')) : undefined,
      inStock: searchParams.get('inStock') === 'true' ? true : undefined,
    }
    
    const pagination: PaginationParams = {
      page: Number(searchParams.get('page')) || 1,
      limit: Number(searchParams.get('limit')) || 10,
      sortBy: (searchParams.get('sortBy') as 'price' | 'rating' | 'date') || 'date',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
    }
    
    let products = await readProducts()
    
    products = filterProducts(products, filters)
    products = sortProducts(products, pagination.sortBy, pagination.sortOrder)
    
    const page = pagination.page || 1
    const limit = pagination.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = products.slice(startIndex, endIndex)
    
    const response: ApiResponse<{
      products: Product[]
      total: number
      page: number
      totalPages: number
    }> = {
      success: true,
      data: {
        products: paginatedProducts,
        total: products.length,
        page: page,
        totalPages: Math.ceil(products.length / limit),
      },
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching products:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch products',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!isValidProduct(body)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid product data',
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const success = await createProduct(body)
    
    if (!success) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product with this ID already exists or failed to create',
      }
      return NextResponse.json(response, { status: 409 })
    }
    
    const response: ApiResponse<Product> = {
      success: true,
      data: body,
      message: 'Product created successfully',
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create product',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter(product => {
    if (filters.category && product.category !== filters.category) {
      return false
    }
    
    if (filters.minPrice && product.basePrice < filters.minPrice) {
      return false
    }
    
    if (filters.maxPrice && product.basePrice > filters.maxPrice) {
      return false
    }
    
    if (filters.minRating) {
      const avgRating = product.reviews.length > 0
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        : 0
      if (avgRating < filters.minRating) {
        return false
      }
    }
    
    if (filters.inStock && product.stockQuantity <= 0) {
      return false
    }
    
    return true
  })
}

function sortProducts(products: Product[], sortBy: string | undefined, sortOrder: string | undefined): Product[] {
  const defaultSortBy = sortBy || 'date'
  const defaultSortOrder = sortOrder || 'desc'
  
  return [...products].sort((a, b) => {
    let aValue: number | string
    let bValue: number | string
    
    switch (defaultSortBy) {
      case 'price':
        aValue = a.discountedPrice || a.basePrice
        bValue = b.discountedPrice || b.basePrice
        break
      case 'rating':
        aValue = a.reviews.length > 0
          ? a.reviews.reduce((sum, review) => sum + review.rating, 0) / a.reviews.length
          : 0
        bValue = b.reviews.length > 0
          ? b.reviews.reduce((sum, review) => sum + review.rating, 0) / b.reviews.length
          : 0
        break
      case 'date':
      default:
        aValue = a.id
        bValue = b.id
        break
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return defaultSortOrder === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    return defaultSortOrder === 'asc' 
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue))
  })
}

function isValidProduct(data: any): data is Product {
  return (
    data &&
    typeof data.id === 'string' &&
    typeof data.title === 'string' &&
    typeof data.description === 'string' &&
    Array.isArray(data.images) &&
    typeof data.basePrice === 'number' &&
    typeof data.currency === 'string' &&
    Array.isArray(data.paymentMethods) &&
    data.seller &&
    typeof data.seller.name === 'string' &&
    typeof data.stockQuantity === 'number'
  )
}