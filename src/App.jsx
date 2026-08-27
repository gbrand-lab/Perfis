import { Navigate, Route, Routes } from 'react-router-dom'
import { clients, getClient } from './clients/index.js'
import Dashboard from './dashboard/Dashboard.jsx'
import GenericClientApp from './clients/generic/GenericClientApp.jsx'

function ClientRoute({ clientId }) {
  const client = getClient(clientId)
  const { Component } = client
  return <Component />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {clients.map((c) => (
        <Route key={c.id} path={`/${c.id}/*`} element={<ClientRoute clientId={c.id} />} />
      ))}
      {/* Clientes criados pela UI não têm pasta de código própria: a config
          (nome, pilares) vem do backend e o app é montado dinamicamente. */}
      <Route path="/:clientId" element={<GenericClientApp />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
