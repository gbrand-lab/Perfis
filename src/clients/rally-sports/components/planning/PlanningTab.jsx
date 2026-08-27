import { pillars } from '../../data/index.js'
import PillarCard from '@shared/components/planning/PillarCard.jsx'

export default function PlanningTab() {
  return (
    <div className="panel">
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
