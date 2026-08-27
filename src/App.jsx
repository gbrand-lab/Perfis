import { Navigate, Route, Routes } from 'react-router-dom'
import { clients, defaultClientId, getClient } from './clients/index.js'
import Dashboard from './dashboard/Dashboard.jsx'

function ClientRoute({ clientId }) {
  const client = getClient(clientId)
  if (!client) return <Navigate to={`/${defaultClientId}`} replace />
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
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
