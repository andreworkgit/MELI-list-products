# MELI Products E-commerce Application

## Project Overview

A full-stack e-commerce application built with Next.js 14+ that mimics MercadoLivre's item detail page functionality. Features a responsive frontend and RESTful API backend with JSON file-based data persistence.

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** (version 8.0 or higher)
- **Git** (for version control)

### System Requirements

- **Operating System**: Windows 10/11, macOS 10.15+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 1GB free space
- **Browser**: Chrome 100+, Firefox 100+, Safari 14+, or Edge 100+

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd MELI-list-products
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Next.js 15.4+
- React 19
- TypeScript
- Tailwind CSS
- Testing libraries (Jest, React Testing Library)

### 3. Environment Setup

Create a `.env.local` file in the root directory (optional):

```bash
# Optional environment variables
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Verify Installation

Check that all dependencies are correctly installed:

```bash
npm list --depth=0
```

## Development Server

### Start the Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: http://localhost:3000
- **Network**: http://[your-ip]:3000

### Available Routes

- **Home Page**: `/` - Welcome page with navigation to products
- **Product Detail**: `/products/[id]` - Detailed product page (e.g., `/products/1`)
- **API Endpoints**:
  - `GET /api/products` - List all products with filtering and pagination
  - `GET /api/products/[id]` - Get specific product with pricing calculations
  - `PUT /api/products/[id]` - Update product information
  - `POST /api/products` - Create new product

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

### Testing Features

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing
- **Coverage Target**: 60%+ code coverage
- **Test Files Location**: `/tests` directory

## Build and Deployment

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Build Verification

After building, verify the application:

1. Check build output for errors
2. Test critical paths manually
3. Verify API endpoints work correctly

## Project Structure

```
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   │   └── products/      # Product API endpoints
│   │   ├── products/          # Product pages
│   │   │   └── [id]/         # Dynamic product detail pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/            # Reusable React components
│   │   ├── ui/               # UI utility components
│   │   ├── ImageGallery.tsx  # Product image gallery
│   │   ├── ProductInfo.tsx   # Product information panel
│   │   ├── SellerInfo.tsx    # Seller information section
│   │   ├── ProductSpecifications.tsx
│   │   └── ProductReviews.tsx
│   ├── lib/                  # Utility libraries
│   │   ├── fileOperations.ts # JSON file operations
│   │   └── discountCalculator.ts # Discount logic
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   └── utils/              # Utility functions
├── data/                   # JSON data files
│   ├── products.json      # Product data
│   └── discounts.json     # Discount rules
├── tests/                 # Test files
└── public/               # Static assets
```

## Features

### Frontend Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product Image Gallery**: Multiple images with thumbnail navigation and zoom
- **Product Information**: Pricing, discounts, payment methods, shipping info
- **Seller Information**: Seller details, ratings, and contact information
- **Product Reviews**: Customer reviews with ratings and verification badges
- **Product Specifications**: Detailed technical specifications
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Graceful error boundaries and user feedback

### Backend Features

- **RESTful API**: Clean API design with proper HTTP status codes
- **JSON Data Persistence**: File-based data storage with concurrent access handling
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Comprehensive error handling with meaningful messages

## API Documentation

### Get All Products

```
GET /api/products
```

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `minRating`: Minimum rating filter
- `inStock`: Filter for items in stock
- `sortBy`: Sort by 'price', 'rating', or 'date'
- `sortOrder`: 'asc' or 'desc'

### Get Product by ID

```
GET /api/products/[id]
```

### Update Product

```
PUT /api/products/[id]
```

Body: Partial product data to update

### Create Product

```
POST /api/products
```

Body: Complete product data

## Troubleshooting

### Common Issues

#### Port 3000 Already in Use

```bash
# Kill process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

#### Module Resolution Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors

```bash
# Check TypeScript configuration
npx tsc --noEmit

# Restart TypeScript service in your editor
```

#### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clean build
npm run build
```

### Performance Issues

#### Slow Development Server

1. Check for large files in the project
2. Disable unnecessary browser extensions
3. Ensure sufficient system resources

#### Slow API Responses

1. Check JSON file sizes in `/data` directory
2. Verify file system permissions
3. Monitor network requests in browser dev tools

### Data Issues

#### Missing Product Data

1. Verify `data/products.json` exists and is valid JSON
2. Check file permissions
3. Ensure product IDs are unique

#### Discount Calculation Errors

1. Verify `data/discounts.json` structure
2. Check discount rule conditions
3. Validate date formats in discount rules

### Testing Issues

#### Test Failures

```bash
# Run tests in verbose mode
npm test -- --verbose

# Run specific test file
npm test -- --testPathPattern=specific-test.test.ts
```

#### Coverage Issues

```bash
# Generate detailed coverage report
npm run test:coverage -- --collectCoverageFrom="src/**/*.{ts,tsx}"
```

## Development Tips

### Code Quality

- Use TypeScript strict mode
- Follow ESLint rules
- Write tests for new features
- Use meaningful commit messages

### Performance

- Optimize images using Next.js Image component
- Implement proper caching strategies
- Monitor bundle size
- Use lazy loading for large components

### Security

- Validate all user inputs
- Sanitize data before storage
- Never expose sensitive information
- Keep dependencies updated

## Support

For issues and questions:

1. Check this documentation first
2. Review error messages carefully
3. Check browser console for client-side errors
4. Verify API responses in Network tab
5. Run tests to ensure functionality

## License

This project is for educational and demonstration purposes.