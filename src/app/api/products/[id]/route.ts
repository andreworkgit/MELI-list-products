import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, readDiscounts } from '@/lib/fileOperations'
import { calculateProductDiscount } from '@/lib/discountCalculator'
import { ApiResponse, Product, ProductUpdateData } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product ID is required',
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const product = await getProductById(id)
    
    if (!product) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found',
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const discounts = await readDiscounts()
    const discountCalculation = await calculateProductDiscount(product, discounts)
    
    const response: ApiResponse<{
      product: Product
      pricing: typeof discountCalculation
    }> = {
      success: true,
      data: {
        product,
        pricing: discountCalculation,
      },
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching product:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch product',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: ProductUpdateData = await request.json()
    
    if (!id) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product ID is required',
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    if (!isValidUpdateData(body)) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Invalid update data',
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const updatedProduct = await updateProduct(id, body)
    
    if (!updatedProduct) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found or failed to update',
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<Product> = {
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully',
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating product:', error)
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update product',
    }
    return NextResponse.json(response, { status: 500 })
  }
}

function isValidUpdateData(data: any): data is ProductUpdateData {
  return (
    data &&
    (data.title === undefined || typeof data.title === 'string') &&
    (data.description === undefined || typeof data.description === 'string') &&
    (data.basePrice === undefined || typeof data.basePrice === 'number') &&
    (data.stockQuantity === undefined || typeof data.stockQuantity === 'number') &&
    (data.specifications === undefined || typeof data.specifications === 'object')
  )
}