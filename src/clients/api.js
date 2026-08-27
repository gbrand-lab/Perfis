export const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '')

export function apiUrl(path) {
  return `${API_BASE}${path}`
}

export async function fetchClientesApi() {
  const res = await fetch(apiUrl('/api/clientes'))
  if (!res.ok) throw new Error('Falha ao carregar clientes.')
  return res.json()
}

export async function createClienteApi({ nome, pilares = [] }) {
  const res = await fetch(apiUrl('/api/clientes'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, pilares }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Falha ao criar cliente.')
  }
  return res.json()
}

export async function updateClienteApi(id, { nome, pilares } = {}) {
  const payload = {}
  if (nome !== undefined) payload.nome = nome
  if (pilares !== undefined) payload.pilares = pilares

  const res = await fetch(apiUrl(`/api/clientes/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Falha ao atualizar cliente.')
  }
  return res.json()
}

export async function deleteClienteApi(id) {
  const res = await fetch(apiUrl(`/api/clientes/${id}`), { method: 'DELETE' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'Falha ao excluir cliente.')
  }
}
