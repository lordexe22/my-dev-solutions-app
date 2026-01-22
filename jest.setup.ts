import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock fetch if not available
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Minimal polyfills for Web APIs used in tests
class MockHeaders {
  private readonly map: Record<string, string>;
  constructor(init?: Record<string, string>) {
    this.map = {};
    if (init) {
      for (const [k, v] of Object.entries(init)) {
        this.map[k.toLowerCase()] = v;
      }
    }
  }
  get(name: string): string | null {
    return this.map[name.toLowerCase()] ?? null;
  }
}

class MockResponse {
  private readonly _body: unknown;
  status: number;
  statusText: string;
  headers: MockHeaders;
  ok: boolean;
  constructor(body: unknown, init: { status?: number; statusText?: string; headers?: Record<string, string> } = {}) {
    this._body = body;
    this.status = init.status ?? 200;
    this.statusText = init.statusText ?? 'OK';
    this.headers = new MockHeaders(init.headers);
    this.ok = this.status >= 200 && this.status < 300;
  }
  async json(): Promise<unknown> {
    try {
      if (typeof this._body === 'string') {
        return JSON.parse(this._body);
      }
      return this._body;
    } catch (err) {
      // Propagar errores de parse JSON para que sean manejados por executeRequest
      throw err;
    }
  }
  async text(): Promise<string> {
    if (typeof this._body === 'string') {
      return this._body;
    }
    return JSON.stringify(this._body);
  }
}

class MockFormData {
  // Minimal stub for instanceof checks and append usage
  private store: Array<[string, unknown]> = [];
  append(name: string, value: unknown): void {
    this.store.push([name, value]);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).Response = MockResponse as unknown as Response;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).Headers = MockHeaders as unknown as Headers;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).FormData = MockFormData as unknown as FormData;
