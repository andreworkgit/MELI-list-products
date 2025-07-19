import { GET, POST } from '@/app/api/products/route'
import { readProducts, createProduct } from '@/lib/fileOperations'
import { Product } from '@/types'

jest.mock('@/lib/fileOperations')

const mockReadProducts = readProducts as jest.MockedFunction<typeof readProducts>
const mockCreateProduct = createProduct as jest.MockedFunction<typeof createProduct>

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  description: 'Test description',
  images: ['test.jpg'],
  basePrice: 100,
  currency: 'USD',
  paymentMethods: ['Credit Card'],
  seller: {
    name: 'Test Seller',
    rating: 4.5,
    location: 'Test Location',
    contact: 'test@test.com'
  },
  specifications: {},
  reviews: [],
  stockQuantity: 10,
  shippingInfo: {
    freeShipping: true,
    estimatedDays: 3
  }
}

const mockProducts: Product[] = [
  mockProduct,
  {
    ...mockProduct,
    id: '2',
    title: 'Product 2',
    basePrice: 200,
    seller: {
      ...mockProduct.seller,
      rating: 3.5
    },
    reviews: [
      { id: '1', userId: '1', userName: 'User1', rating: 3, comment: 'Good', date: '2023-01-01', verified: true },
      { id: '2', userId: '2', userName: 'User2', rating: 4, comment: 'Very good', date: '2023-01-02', verified: true }
    ]
  },
  {
    ...mockProduct,
    id: '3',
    title: 'Product 3',
    basePrice: 50,
    stockQuantity: 0,
    category: 'Books'
  }
]

describe('/api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all products successfully', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.products).toHaveLength(3)
      expect(data.data.products).toEqual(expect.arrayContaining([
        expect.objectContaining({ id: '1', title: 'Test Product' }),
        expect.objectContaining({ id: '2', title: 'Product 2' }),
        expect.objectContaining({ id: '3', title: 'Product 3' })
      ]))
      expect(data.data.page).toBe(1)
      expect(data.data.total).toBe(3)
      expect(data.data.totalPages).toBe(1)
    })

    it('should handle pagination correctly', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products?page=1&limit=2')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products).toHaveLength(2)
      expect(data.data.page).toBe(1)
      expect(data.data.total).toBe(3)
      expect(data.data.totalPages).toBe(2)
    })

    it('should filter products by category', async () => {
      const electronicsProduct = {
        ...mockProduct,
        id: '4',
        title: 'Electronics Product',
        category: 'Electronics'
      }
      mockReadProducts.mockResolvedValue([...mockProducts, electronicsProduct])

      const request = new Request('http://localhost:3000/api/products?category=Electronics')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products).toHaveLength(1)
      expect(data.data.products[0].category).toBe('Electronics')
    })

    it('should filter products by price range', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products?minPrice=80&maxPrice=150')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products).toHaveLength(1)
      expect(data.data.products[0].basePrice).toBe(100)
    })

    it('should filter products by minimum rating', async () => {
      const highRatedProduct = {
        ...mockProduct,
        id: '4',
        title: 'High Rated Product',
        reviews: [
          { id: '1', userId: '1', userName: 'User1', rating: 5, comment: 'Excellent', date: '2023-01-01', verified: true },
          { id: '2', userId: '2', userName: 'User2', rating: 4, comment: 'Good', date: '2023-01-02', verified: true }
        ]
      }
      mockReadProducts.mockResolvedValue([...mockProducts, highRatedProduct])

      const request = new Request('http://localhost:3000/api/products?minRating=4')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products).toHaveLength(1)
      expect(data.data.products[0].id).toBe('4')
    })

    it('should filter products by stock availability', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products?inStock=true')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products).toHaveLength(2)
      expect(data.data.products.every((product: Product) => product.stockQuantity > 0)).toBe(true)
    })

    it('should sort products by price ascending', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products?sortBy=price&sortOrder=asc')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products[0].basePrice).toBe(50)
      expect(data.data.products[1].basePrice).toBe(100)
      expect(data.data.products[2].basePrice).toBe(200)
    })

    it('should sort products by price descending', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products?sortBy=price&sortOrder=desc')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products[0].basePrice).toBe(200)
      expect(data.data.products[1].basePrice).toBe(100)
      expect(data.data.products[2].basePrice).toBe(50)
    })

    it('should sort products by rating', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products?sortBy=rating&sortOrder=desc')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.products[0].id).toBe('2')
      expect(data.data.products[0].seller.rating).toBe(3.5)
    })

    it('should handle file read errors', async () => {
      // Suppress console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      mockReadProducts.mockRejectedValue(new Error('File read error'))

      const request = new Request('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to fetch products')

      // Restore console.error
      console.error = originalError
    })

    it('should handle invalid parameters gracefully', async () => {
      mockReadProducts.mockResolvedValue(mockProducts)

      const request = new Request('http://localhost:3000/api/products?page=invalid&limit=invalid&minPrice=invalid&minRating=invalid')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.page).toBe(1)
      expect(data.data.products).toHaveLength(3)
    })
  })

  describe('POST', () => {
    const newProduct = {
      id: '4',
      title: 'New Product',
      description: 'New description',
      images: ['new.jpg'],
      basePrice: 150,
      currency: 'USD',
      paymentMethods: ['Credit Card'],
      seller: {
        name: 'New Seller',
        rating: 5,
        location: 'New Location',
        contact: 'new@test.com'
      },
      specifications: {},
      reviews: [],
      stockQuantity: 5,
      shippingInfo: {
        freeShipping: false,
        estimatedDays: 5
      }
    }

    it('should create a new product successfully', async () => {
      mockCreateProduct.mockResolvedValue(newProduct)

      const request = new Request('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(newProduct)
      expect(mockCreateProduct).toHaveBeenCalledWith(newProduct)
    })

    it('should handle missing required fields', async () => {
      const invalidProduct = {
        description: 'Missing title'
      }

      const request = new Request('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidProduct)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid product data')
    })

    it('should handle invalid JSON body', async () => {
      // Suppress console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      const request = new Request('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to create product')

      // Restore console.error
      console.error = originalError
    })

    it('should handle product creation failure', async () => {
      mockCreateProduct.mockResolvedValue(null)

      const request = new Request('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Product with this ID already exists or failed to create')
    })

    it('should handle server errors during product creation', async () => {
      // Suppress console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      mockCreateProduct.mockRejectedValue(new Error('Database error'))

      const request = new Request('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to create product')

      // Restore console.error
      console.error = originalError
    })
  })
})