import RisalvaApp from './risalva/RisalvaApp.jsx'
import StyllusEventosApp from './styllus-eventos/StyllusEventosApp.jsx'

// Cada cliente novo entra aqui: pasta própria em src/clients/<id>/ com seu
// próprio App, dados e componentes, e uma entrada neste registro.
export const clients = [
  { id: 'risalva', name: 'Risalva', Component: RisalvaApp },
  { id: 'styllus-eventos', name: 'Styllus Eventos', Component: StyllusEventosApp },
]

export const defaultClientId = clients[0].id

export function getClient(id) {
  return clients.find((c) => c.id === id)
}
