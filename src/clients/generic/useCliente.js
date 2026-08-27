import { useEffect, useState } from 'react'
import { fetchClientesApi } from '../api.js'

export function useCliente(clientId) {
  const [cliente, setCliente] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchClientesApi()
      .then((clientes) => {
        if (cancelled) return
        setCliente(clientes.find((c) => c.id === clientId) ?? null)
      })
      .catch((err) => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [clientId])

  return { cliente, loading, error }
}
