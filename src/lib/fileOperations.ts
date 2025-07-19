import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { Product, DiscountRule } from '@/types'

const DATA_DIR = join(process.cwd(), 'data')
const PRODUCTS_FILE = join(DATA_DIR, 'products.json')
const DISCOUNTS_FILE = join(DATA_DIR, 'discounts.json')

export async function readProducts(): Promise<Product[]> {
  try {
    const data = await readFile(PRODUCTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

export async function readDiscounts(): Promise<DiscountRule[]> {
  try {
    const data = await readFile(DISCOUNTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading discounts:', error)
    return []
  }
}

export async function writeProducts(products: Product[]): Promise<boolean> {
  try {
    await writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
    return true
  } catch (error) {
    console.error('Error writing products:', error)
    return false
  }
}

export async function writeDiscounts(discounts: DiscountRule[]): Promise<boolean> {
  try {
    await writeFile(DISCOUNTS_FILE, JSON.stringify(discounts, null, 2))
    return true
  } catch (error) {
    console.error('Error writing discounts:', error)
    return false
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await readProducts()
  return products.find(product => product.id === id) || null
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await readProducts()
  const index = products.findIndex(product => product.id === id)
  
  if (index === -1) {
    return null
  }
  
  products[index] = { ...products[index], ...updates }
  const success = await writeProducts(products)
  
  return success ? products[index] : null
}

export async function createProduct(product: Product): Promise<boolean> {
  const products = await readProducts()
  
  const existingProduct = products.find(p => p.id === product.id)
  if (existingProduct) {
    return false
  }
  
  products.push(product)
  return await writeProducts(products)
}