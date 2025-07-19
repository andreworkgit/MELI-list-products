import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          MELI Products E-commerce
        </h1>
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Welcome to our e-commerce platform. View our product details:
          </p>
          <Link 
            href="/products/1" 
            className="btn-primary inline-block"
          >
            View Sample Product
          </Link>
        </div>
      </div>
    </main>
  )
}