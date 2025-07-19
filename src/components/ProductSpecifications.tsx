interface ProductSpecificationsProps {
  specifications: Record<string, string>
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  const entries = Object.entries(specifications)

  if (entries.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
      
      <div className="space-y-3">
        {entries.map(([key, value], index) => (
          <div 
            key={key}
            className={`flex justify-between py-2 ${
              index !== entries.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <span className="text-gray-600 font-medium">{key}</span>
            <span className="text-gray-900 text-right max-w-xs">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}