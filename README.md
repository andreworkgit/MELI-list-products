# MELI Products E-commerce Platform

A modern, full-stack e-commerce application built with Next.js 14+ that replicates MercadoLivre's item detail page functionality. Features a responsive frontend, RESTful API backend, and flexible discount system with JSON-based data persistence.

## 🌟 Features

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Image Gallery**: Multiple images with thumbnail navigation and zoom functionality
- **Detailed Product Information**: Pricing, discounts, payment methods, shipping details
- **Seller Information**: Comprehensive seller profiles with ratings and contact details
- **Customer Reviews**: Review system with ratings, verification badges, and detailed feedback
- **Product Specifications**: Technical details in an organized format
- **Loading States**: Skeleton loaders and smooth loading indicators
- **Error Handling**: Graceful error boundaries and user-friendly error messages

### Backend
- **RESTful API**: Clean, well-documented API with proper HTTP status codes
- **JSON Data Persistence**: File-based storage with concurrent access handling
- **Input Validation**: Comprehensive request validation and data sanitization
- **Error Handling**: Robust error handling with meaningful error messages

### Technical Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Testing**: Jest + React Testing Library
- **Data Storage**: JSON files with custom file operations
- **API**: Next.js API Routes

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm 8.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MELI-list-products
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📱 Demo

Visit the application to explore:
- **Home Page**: `/` - Welcome page with navigation
- **Product Detail**: `/products/1` - Sample product page
- **API Endpoints**: 
  - `GET /api/products` - List all products
  - `GET /api/products/1` - Get specific product

## 🛠 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Code Quality
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript checks
```

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/products/      # API endpoints
│   ├── products/[id]/     # Product detail pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # UI utilities
│   ├── ImageGallery.tsx  # Product gallery
│   ├── ProductInfo.tsx   # Product details
│   └── ...
├── lib/                  # Utility libraries
│   ├── discountCalculator.ts
│   └── fileOperations.ts
├── types/               # TypeScript definitions
└── utils/              # Helper functions

data/
├── products.json       # Product data
└── discounts.json     # Discount rules

tests/                 # Test files
```

## 📊 API Documentation

### Products API

#### Get All Products
```http
GET /api/products
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `sortBy` (string): Sort by 'price', 'rating', or 'date'
- `sortOrder` (string): 'asc' or 'desc'

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "total": 5,
    "page": 1,
    "totalPages": 1
  }
}
```

#### Get Product by ID
```http
GET /api/products/{id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "product": {...},
    "pricing": {
      "originalPrice": 1199.99,
      "discountedPrice": 999.99,
      "discountAmount": 200,
      "discountPercentage": 17,
      "appliedDiscounts": [...]
    }
  }
}
```

#### Update Product
```http
PUT /api/products/{id}
```

**Body:**
```json
{
  "title": "Updated Product Title",
  "basePrice": 899.99,
  "stockQuantity": 50
}
```

#### Create Product
```http
POST /api/products
```

**Body:** Complete product object (see types/index.ts for schema)

## 🧪 Testing

The project includes comprehensive tests with 60%+ coverage:

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing
- **Coverage Reports**: Detailed coverage analysis

```bash
npm run test:coverage
```

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Breakpoint optimization
- Touch-friendly interactions

### Interactive Elements
- Image zoom and gallery navigation
- Loading skeletons
- Hover effects and animations
- Accessible keyboard navigation

### Error Handling
- Error boundaries for React components
- Graceful API error handling
- User-friendly error messages
- Offline state handling

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### TypeScript Configuration
The project uses strict TypeScript configuration for enhanced type safety.

### ESLint and Prettier
Code quality tools are configured for consistent code style.

## 📈 Performance

### Optimization Features
- Next.js Image optimization
- Code splitting and lazy loading
- Efficient bundle sizes
- Proper caching strategies

### Monitoring
- Error tracking
- Performance metrics
- User analytics ready

## 🔐 Security

### Data Validation
- Input sanitization
- Type checking
- SQL injection prevention

### Error Handling
- Secure error messages
- No sensitive data exposure
- Proper status codes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- Use TypeScript for all new code
- Follow ESLint rules
- Write tests for new features
- Use conventional commit messages

## 📖 Documentation

- **[Setup Guide](./run.md)**: Detailed installation and setup instructions
- **[Enhancement Roadmap](./enhanced.md)**: Future improvements and scalability plans
- **API Documentation**: Available in the code comments

## 🐛 Troubleshooting

### Common Issues

**Port 3000 in use:**
```bash
npx kill-port 3000
# or
npm run dev -- -p 3001
```

**Module resolution errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
rm -rf .next
npm run build
```

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- Inspired by MercadoLivre's design patterns
- Built with modern React and Next.js best practices
- Uses Unsplash for sample product images

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**