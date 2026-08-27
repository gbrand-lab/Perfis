import { useEffect, useState } from 'react'
import { clients } from '../clients/index.js'
import { fetchClientesApi } from '../clients/api.js'
import ClientCard from './ClientCard.jsx'
import NewClientForm from './NewClientForm.jsx'
import './Dashboard.css'

export default function Dashboard() {
  const [apiClientes, setApiClientes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loadError, setLoadError] = useState(null)

  useEffect(() => {
    fetchClientesApi()
      .then(setApiClientes)
      .catch((err) => setLoadError(err instanceof Error ? err.message : 'Falha ao carregar clientes.'))
  }, [])

  const staticIds = new Set(clients.map((c) => c.id))
  const editableApiClientes = apiClientes.filter((c) => !staticIds.has(c.id))

  return (
    <div className="dash">
      <div className="dash__inner">
        <header className="dash__header">
          <div>
            <div className="dash__eyebrow">Planejamento de conteúdo</div>
            <h1>Clientes</h1>
          </div>
          <button type="button" className="btn-primary" onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'fechar' : '+ Novo cliente'}
          </button>
        </header>

        {showForm && (
          <NewClientForm
            onCreated={(c) => setApiClientes((prev) => [...prev, c])}
            onCancel={() => setShowForm(false)}
          />
        )}

        {loadError && <div className="banner-error">{loadError}</div>}

        <main>
          <div className="dash__grid">
            {clients.map((c) => (
              <ClientCard key={c.id} cliente={{ id: c.id, nome: c.name }} editable={false} />
            ))}
            {editableApiClientes.map((c) => (
              <ClientCard
                key={c.id}
                cliente={c}
                editable
                onRenamed={(updated) =>
                  setApiClientes((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
                }
                onDeleted={(id) => setApiClientes((prev) => prev.filter((p) => p.id !== id))}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
