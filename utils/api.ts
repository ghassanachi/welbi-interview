export async function fetcher(resource: string, init: RequestInit, token?: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${resource}`, {
    ...init,
    headers: {
      ...init.headers,
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then((res) => res.json())
}
