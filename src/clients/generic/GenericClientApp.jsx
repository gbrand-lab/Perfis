import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import FeedCalendarTab from '@shared/components/feed/FeedCalendarTab.jsx'
import CaptureChecklistTab from '@shared/components/feed/CaptureChecklistTab.jsx'
import Header from './components/layout/Header.jsx'
import TabNav from './components/layout/TabNav.jsx'
import { useCliente } from './useCliente.js'

// App renderizado para qualquer cliente criado pela UI (não tem pasta de
// código própria — a config vem do backend). Sem planejamento/pilares aqui:
// isso o social faz por fora, o cliente novo entra com calendário +
// checklist de captação (derivado do próprio calendário).
export default function GenericClientApp() {
  const { clientId } = useParams()
  const { cliente, loading, error } = useCliente(clientId)
  const [tab, setTab] = useState('feed')

  if (loading) return <div className="app-loading">Carregando cliente…</div>
  if (error || !cliente) return <Navigate to="/dashboard" replace />

  return (
    <div className="app">
      <Header nome={cliente.nome} />
      <TabNav activeTab={tab} onChange={setTab} />
      <main className="content">
        {tab === 'captacao' ? (
          <CaptureChecklistTab clientId={cliente.id} />
        ) : (
          <FeedCalendarTab clientId={cliente.id} />
        )}
      </main>
    </div>
  )
}
