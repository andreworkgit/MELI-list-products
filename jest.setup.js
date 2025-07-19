import '@testing-library/jest-dom'

// Mock Next.js globals for tests
if (!global.Request) {
  global.Request = class MockRequest {
    constructor(url, options = {}) {
      this._url = url
      this.method = options.method || 'GET'
      this.headers = new Map(Object.entries(options.headers || {}))
      this.body = options.body
    }
    
    get url() {
      return this._url
    }
    
    async json() {
      try {
        return JSON.parse(this.body || '{}')
      } catch (error) {
        throw new SyntaxError('Invalid JSON body')
      }
    }
  }
}

if (!global.Response) {
  global.Response = class MockResponse {
    constructor(body, options = {}) {
      this.body = body
      this.status = options.status || 200
      this.headers = new Map(Object.entries(options.headers || {}))
    }
    
    async json() {
      return JSON.parse(this.body || '{}')
    }
  }
}

if (!global.Headers) {
  global.Headers = class MockHeaders extends Map {}
}

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: (data, options = {}) => {
      return new global.Response(JSON.stringify(data), {
        status: options.status || 200,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      })
    }
  }
}))