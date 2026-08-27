import { pillars, brief } from '../../data/index.js'
import PillarCard from './PillarCard.jsx'

export default function PlanningTab() {
  return (
    <div className="panel">
      <section>
        <h2>Briefing</h2>
        <div className="brief-summary">
          <div className="brief-item">
            <span className="brief-label">Cliente</span>
            <p>{brief.client}</p>
          </div>
          <div className="brief-item">
            <span className="brief-label">Estética que queremos trazer</span>
            <p>{brief.aesthetic}</p>
          </div>
          <div className="brief-item">
            <span className="brief-label">Objetivo</span>
            <p>{brief.objective}</p>
          </div>
          <div className="brief-item">
            <span className="brief-label">Referências</span>
            <ul className="brief-refs">
              {brief.references.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noreferrer">{r.name} ({r.handle})</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>Planejamento & Pilares</h2>
        <p className="section-desc">
          Frame vazio, pronto pra receber os pilares de conteúdo do cliente (linhas editoriais,
          cadência de publicação e o que esperar de cada captação).
        </p>

        {pillars.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhum pilar definido ainda</h3>
            <p>Preencha <code>data/pillars.js</code> com os pilares de conteúdo do cliente.</p>
          </div>
        ) : (
          <div className="pillars-grid">
            {pillars.map((p) => (
              <PillarCard key={p.id} pillar={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
