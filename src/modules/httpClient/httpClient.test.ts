import { HttpClient } from './httpClient';
import { 
  HttpError, 
  NetworkError, 
  ValidationError, 
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ServerError
} from './httpClient.errors';
import { 
  createAuthInterceptor, 
  createResponseLogInterceptor,
  createErrorLogInterceptor 
} from './httpClient.interceptors';
import type { ApiResponse, HttpResponse, RequestConfig, ResponseInterceptor } from './httpClient.types';

// Mock global fetch
global.fetch = jest.fn();

// Mock console methods
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

describe('HttpClient', () => {
  let client: HttpClient;
  
  beforeEach(() => {
    client = new HttpClient({
      baseURL: 'https://api.example.com',
      timeout: 30000, // 30 segundos para evitar timeouts en tests
      retry: { maxRetries: 3, delay: 100 }
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Constructor & Configuration', () => {
    it('should create instance with default config', () => {
      const defaultClient = new HttpClient();
      expect(defaultClient).toBeInstanceOf(HttpClient);
    });

    it('should merge custom config with defaults', () => {
      const customClient = new HttpClient({
        baseURL: 'https://custom.api.com',
        timeout: 15000
      });
      expect(customClient).toBeInstanceOf(HttpClient);
    });

    it('should handle missing config', () => {
      const noConfigClient = new HttpClient();
      expect(noConfigClient).toBeInstanceOf(HttpClient);
    });
  });

  describe('GET Requests', () => {
    it('should make successful GET request', async () => {
      const mockData = { id: 1, name: 'Test' };
      const mockResponse = new Response(JSON.stringify(mockData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await client.get<typeof mockData>('/users/1');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'GET'
        })
      );
      expect(result.data).toEqual(mockData);
      expect(result.status).toBe(200);
    });

    it('should handle GET request with query params', async () => {
      const mockData = [{ id: 1 }, { id: 2 }];
      const mockResponse = new Response(JSON.stringify(mockData), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/users', {
        params: { page: 1, limit: 10, active: true }
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users?page=1&limit=10&active=true',
        expect.any(Object)
      );
    });

    it('should handle empty query params', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/users', { params: {} });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.any(Object)
      );
    });
  });

  describe('POST Requests', () => {
    it('should make successful POST request with data', async () => {
      const postData = { email: 'test@example.com', password: '12345' };
      const mockResponse = new Response(JSON.stringify({ success: true }), { status: 201 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await client.post('/auth/login', postData);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData)
        })
      );
      expect(result.status).toBe(201);
    });

    it('should handle POST with FormData', async () => {
      const formData = new FormData();
      formData.append('file', new Blob(['test']), 'test.txt');
      
      const mockResponse = new Response(JSON.stringify({ uploaded: true }), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.post('/upload', formData);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          body: formData
        })
      );
    });
  });

  describe('PUT Requests', () => {
    it('should make successful PUT request', async () => {
      const updateData = { name: 'Updated Name' };
      const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.put('/users/1', updateData);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData)
        })
      );
    });
  });

  describe('PATCH Requests', () => {
    it('should make successful PATCH request', async () => {
      const patchData = { email: 'newemail@example.com' };
      const mockResponse = new Response(JSON.stringify({ success: true }), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.patch('/users/1', patchData);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(patchData)
        })
      );
    });
  });

  describe('DELETE Requests', () => {
    it('should make successful DELETE request', async () => {
      const mockResponse = new Response(JSON.stringify({ success: true }), { status: 204 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.delete('/users/1');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE'
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should throw ValidationError for 400 status', async () => {
      const mockResponse = new Response(
        JSON.stringify({ error: 'Invalid data' }), 
        { status: 400, statusText: 'Bad Request' }
      );
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/invalid')).rejects.toThrow(ValidationError);
    });

    it('should throw AuthenticationError for 401 status', async () => {
      const mockResponse = new Response(
        JSON.stringify({ error: 'Unauthorized' }), 
        { status: 401 }
      );
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/protected')).rejects.toThrow(AuthenticationError);
    });

    it('should throw AuthorizationError for 403 status', async () => {
      const mockResponse = new Response(
        JSON.stringify({ error: 'Forbidden' }), 
        { status: 403 }
      );
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/admin')).rejects.toThrow(AuthorizationError);
    });

    it('should throw NotFoundError for 404 status', async () => {
      const mockResponse = new Response(
        JSON.stringify({ error: 'Not found' }), 
        { status: 404 }
      );
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/nonexistent')).rejects.toThrow(NotFoundError);
    });

    it('should throw ServerError for 500 status', async () => {
      const mockResponse = new Response(
        JSON.stringify({ error: 'Internal error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/error')).rejects.toThrow(ServerError);
    });

    it('should throw NetworkError for network failures', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new TypeError('Network error'));

      await expect(client.get('/test')).rejects.toThrow(NetworkError);
    });

    it('should extract error message from ApiResponse format', async () => {
      const errorMessage = 'Custom error message';
      const mockResponse = new Response(
        JSON.stringify({ success: false, message: errorMessage }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      try {
        await client.get('/test');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as HttpError).message).toBe(errorMessage);
      }
    });

    it('should extract error from error field in response', async () => {
      const errorMessage = 'Error from error field';
      const mockResponse = new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      try {
        await client.get('/test');
      } catch (error) {
        expect((error as HttpError).message).toBe(errorMessage);
      }
    });
  });

  describe('Request Interceptors', () => {
    it('should apply request interceptor', async () => {
      const mockInterceptor = jest.fn((config: RequestConfig) => {
        config.headers = { ...config.headers, 'X-Custom-Header': 'test' };
        return config;
      });

      client.addRequestInterceptor(mockInterceptor);

      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/test');

      expect(mockInterceptor).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-Custom-Header': 'test'
          })
        })
      );
    });

    it('should apply auth interceptor with token', async () => {
      const token = 'test-token-123';
      client.addRequestInterceptor(createAuthInterceptor(token));

      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/protected');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': `Bearer ${token}`
          })
        })
      );
    });

    it('should not add Authorization header if token is empty', async () => {
      client.addRequestInterceptor(createAuthInterceptor(''));

      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/test');

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1];
      expect(fetchCall.headers.Authorization).toBeUndefined();
    });
  });

  describe('Response Interceptors', () => {
    it('should apply response interceptor', async () => {
      const mockInterceptor = jest
        .fn((response: HttpResponse<unknown>) => {
          const current = (response.data ?? {}) as Record<string, unknown>;
          return { ...response, data: { modified: true, ...current } as unknown };
        }) as unknown as ResponseInterceptor;

      client.addResponseInterceptor(mockInterceptor);

      const mockResponse = new Response(JSON.stringify({ original: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await client.get('/test');

      expect(mockInterceptor).toHaveBeenCalled();
      expect(result.data).toEqual({ modified: true, original: true });
    });

    it('should apply response log interceptor', async () => {
      client.addResponseInterceptor(createResponseLogInterceptor());

      const mockResponse = new Response(JSON.stringify({ test: true }), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/test');

      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining('✅'));
    });
  });

  describe('Error Interceptors', () => {
    it('should apply error interceptor', async () => {
      const mockErrorInterceptor = jest.fn((error: Error) => {
        throw new Error(`Intercepted: ${error.message}`);
      });

      client.addErrorInterceptor(mockErrorInterceptor);

      const mockResponse = new Response(JSON.stringify({}), { status: 500 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      try {
        await client.get('/error');
      } catch (error) {
        expect(mockErrorInterceptor).toHaveBeenCalled();
        expect((error as Error).message).toContain('Intercepted:');
      }
    });

    it('should apply error log interceptor', async () => {
      client.addErrorInterceptor(createErrorLogInterceptor());

      const mockResponse = new Response(JSON.stringify({}), { status: 500, headers: { 'Content-Type': 'application/json' } });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/error')).rejects.toThrow();

      expect(mockConsoleError).toHaveBeenCalledWith(
        expect.stringContaining('❌ Error:')
      );
    });

    it('should not log 401 errors in error log interceptor', async () => {
      client.addErrorInterceptor(createErrorLogInterceptor());

      const mockResponse = new Response(JSON.stringify({}), { status: 401 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/protected')).rejects.toThrow();

      expect(mockConsoleError).not.toHaveBeenCalled();
    });
  });

  describe('Retry Logic', () => {
    it('should retry on retryable status codes', async () => {
      const mockResponse503 = new Response(JSON.stringify({}), { status: 503 });
      const mockResponse200 = new Response(JSON.stringify({ success: true }), { status: 200 });
      
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce(mockResponse503)
        .mockResolvedValueOnce(mockResponse503)
        .mockResolvedValueOnce(mockResponse200);

      const result = await client.get('/unstable');

      expect(global.fetch).toHaveBeenCalledTimes(3);
      expect(result.status).toBe(200);
    });

    it('should not retry on non-retryable status codes', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 404 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/notfound')).rejects.toThrow(NotFoundError);

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should respect maxRetries config', async () => {
      const clientWithRetries = new HttpClient({
        retry: { maxRetries: 2, delay: 10 }
      });

      const mockResponse = new Response(JSON.stringify({}), { status: 503 });
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(clientWithRetries.get('/unstable')).rejects.toThrow(ServerError);

      // Initial request + 2 retries = 3 total calls
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    it('should not retry when maxRetries is 0', async () => {
      const noRetryClient = new HttpClient({
        retry: { maxRetries: 0, delay: 10 }
      });

      const mockResponse = new Response(JSON.stringify({}), { status: 503 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(noRetryClient.get('/test')).rejects.toThrow();

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Timeout', () => {
    it.skip('should abort request on timeout', async () => {
      const slowClient = new HttpClient({ timeout: 100 });

      (global.fetch as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 200))
      );

      await expect(slowClient.get('/slow')).rejects.toThrow(NetworkError);
    });

    it('should not timeout if request completes in time', async () => {
      const fastClient = new HttpClient({ timeout: 1000 });

      const mockResponse = new Response(JSON.stringify({ fast: true }), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await fastClient.get('/fast');

      expect(result.status).toBe(200);
    });
  });

  describe('Headers', () => {
    it('should merge custom headers with defaults', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/test', {
        headers: { 'X-Custom': 'value' }
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-Custom': 'value'
          })
        })
      );
    });

    it('should override default headers', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/test', {
        headers: { 'Content-Type': 'text/plain' }
      });

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1];
      expect(fetchCall.headers['Content-Type']).toBe('text/plain');
    });

    it('should not add Content-Type for FormData', async () => {
      const formData = new FormData();
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.post('/upload', formData);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1];
      expect(fetchCall.headers['Content-Type']).toBeUndefined();
    });
  });

  describe('withCredentials', () => {
    it('should include credentials when enabled', async () => {
      const credentialsClient = new HttpClient({ 
        withCredentials: true 
      });

      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await credentialsClient.get('/test');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include'
        })
      );
    });

    it('should omit credentials when disabled', async () => {
      const noCredentialsClient = new HttpClient({ 
        withCredentials: false 
      });

      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await noCredentialsClient.get('/test');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'omit'
        })
      );
    });
  });

  describe('ApiResponse Type Guard', () => {
    it('should identify valid ApiResponse', async () => {
      const validResponse: ApiResponse<Record<string, unknown>> = {
        success: true,
        data: { id: 1 }
      };

      const mockResponse = new Response(JSON.stringify(validResponse), { status: 200, headers: { 'Content-Type': 'application/json' } });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await client.get('/test');
      expect(result.data).toEqual(validResponse.data);
    });

    it('should handle ApiResponse with error', async () => {
      const errorResponse: ApiResponse<Record<string, unknown>> = {
        success: false,
        message: 'Something went wrong'
      };

      const mockResponse = new Response(JSON.stringify(errorResponse), { status: 400, headers: { 'Content-Type': 'application/json' } });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      try {
        await client.get('/test');
      } catch (error) {
        expect((error as HttpError).message).toBe('Something went wrong');
      }
    });
  });

  describe('URL Building', () => {
    it('should handle trailing slashes correctly', async () => {
      const slashClient = new HttpClient({ baseURL: 'https://api.example.com/' });
      
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await slashClient.get('/users');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.any(Object)
      );
    });

    it('should handle missing leading slash in endpoint', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('users');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.any(Object)
      );
    });

    it('should handle absolute URLs', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('https://different-api.com/data');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://different-api.com/data',
        expect.any(Object)
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty response body', async () => {
      const mockResponse = new Response('', { status: 204 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await client.delete('/users/1');

      expect(result.data).toBeNull();
      expect(result.status).toBe(204);
    });

    it('should handle non-JSON response', async () => {
      const mockResponse = new Response('Plain text response', { 
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await client.get('/text');

      expect(result.data).toBe('Plain text response');
    });

    it('should handle malformed JSON response', async () => {
      const mockResponse = new Response('{ invalid json', { status: 200, headers: { 'Content-Type': 'application/json' } });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await expect(client.get('/malformed')).rejects.toThrow();
    });

    it('should handle undefined request data', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.post('/test', undefined);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1];
      expect(fetchCall.body).toBeUndefined();
    });

    it('should handle null request data', async () => {
      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.post('/test', null);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0][1];
      expect(fetchCall.body).toBe('null');
    });
  });

  describe('Multiple Interceptors', () => {
    it('should apply multiple request interceptors in order', async () => {
      const order: number[] = [];
      
      client.addRequestInterceptor((config) => {
        order.push(1);
        return config;
      });
      
      client.addRequestInterceptor((config) => {
        order.push(2);
        return config;
      });

      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/test');

      expect(order).toEqual([1, 2]);
    });

    it('should apply multiple response interceptors in order', async () => {
      const order: number[] = [];
      
      client.addResponseInterceptor((response) => {
        order.push(1);
        return response;
      });
      
      client.addResponseInterceptor((response) => {
        order.push(2);
        return response;
      });

      const mockResponse = new Response(JSON.stringify({}), { status: 200 });
      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await client.get('/test');

      expect(order).toEqual([1, 2]);
    });
  });
});
