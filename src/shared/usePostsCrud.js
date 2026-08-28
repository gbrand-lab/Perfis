import { useCallback, useEffect, useMemo, useState } from 'react'
import { apiUrl } from './api.js'

// CRUD de posts do calendário, compartilhado por todos os clientes (fixos e
// os criados pela UI). Cada FeedCalendarTab só cuida do que é específico
// dele (meses exibidos, ideias planejadas); o resto é sempre igual.
export function usePostsCrud(clientId) {
  const [posts, setPosts] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [error, setError] = useState(null)

  const loadPosts = useCallback(async () => {
    try {
      const res = await fetch(apiUrl('/api/posts'))
      if (!res.ok) throw new Error('Falha ao carregar os posts.')
      const data = await res.json()
      setPosts(data.filter((p) => p.cliente === clientId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar posts.')
    }
  }, [clientId])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const postsByDate = useMemo(() => {
    const map = new Map()
    for (const post of posts) {
      if (!map.has(post.data)) map.set(post.data, [])
      map.get(post.data).push(post)
    }
    return map
  }, [posts])

  const postsDoDia = selectedDate ? postsByDate.get(selectedDate) ?? [] : []

  async function handleCreate(input) {
    setError(null)
    try {
      const res = await fetch(apiUrl('/api/posts'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Falha ao criar o post.')
      }
      const created = await res.json()
      setPosts((prev) => [...prev, created])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao criar post.')
      throw err
    }
  }

  async function handleUpdate(id, input) {
    setError(null)
    try {
      const res = await fetch(apiUrl(`/api/posts/${id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Falha ao atualizar o post.')
      }
      const updated = await res.json()
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao atualizar post.')
      throw err
    }
  }

  async function handleDelete(id) {
    setError(null)
    try {
      const res = await fetch(apiUrl(`/api/posts/${id}`), { method: 'DELETE' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Falha ao excluir o post.')
      }
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao excluir post.')
    }
  }

  return {
    posts,
    postsByDate,
    postsDoDia,
    selectedDate,
    setSelectedDate,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}
