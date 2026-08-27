import { Link } from 'react-router-dom'
import { clients } from '../clients/index.js'
import './Dashboard.css'

export default function Dashboard() {
  return (
    <div className="dash">
      <div className="dash__inner">
        <header className="dash__header">
          <div>
            <div className="dash__eyebrow">Planejamento de conteúdo</div>
            <h1>Clientes</h1>
          </div>
        </header>
        <main>
          <div className="dash__grid">
            {clients.map((c) => (
              <Link key={c.id} to={`/${c.id}`} className="dash__card">
                <span className="dash__card-icon">{c.name.charAt(0)}</span>
                <div>
                  <h2>{c.name}</h2>
                  <span className="dash__card-cta">Abrir planejamento →</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
