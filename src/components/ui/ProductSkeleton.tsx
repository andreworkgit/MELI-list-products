export default function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-300 animate-pulse rounded-lg h-96 w-full" />
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 animate-pulse rounded h-20 w-20"
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="bg-gray-300 animate-pulse rounded h-8 w-3/4" />
              <div className="bg-gray-300 animate-pulse rounded h-4 w-1/2" />
            </div>
            
            <div className="space-y-2">
              <div className="bg-gray-300 animate-pulse rounded h-10 w-1/3" />
              <div className="bg-gray-300 animate-pulse rounded h-6 w-1/4" />
            </div>
            
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-300 animate-pulse rounded h-4 w-full"
                />
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-300 animate-pulse rounded h-12 w-full" />
              <div className="bg-gray-300 animate-pulse rounded h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}