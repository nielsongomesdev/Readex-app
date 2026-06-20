const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

interface ApiOptions {
  method?: string
  body?: Record<string, unknown>
  headers?: Record<string, string>
}

export async function api<T = unknown>(
  endpoint: string,
  { method = 'GET', body, headers = {} }: ApiOptions = {},
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  // Attach JWT token when available
  const token = localStorage.getItem('token')
  if (token) {
    ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      (data as Record<string, string> | null)?.error ||
      `Erro ${response.status}: ${response.statusText}`
    throw new Error(message)
  }

  return data as T
}
