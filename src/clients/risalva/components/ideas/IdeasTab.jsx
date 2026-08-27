import { useState } from 'react'
import { postIdeas, pillars } from '../../data/index.js'

const FORMAT_LABEL = { video: 'Vídeo', foto: 'Foto' }

function fmtDayMonth(dateKey) {
  if (!dateKey) return ''
  const [, m, d] = dateKey.split('-')
  return `${d}/${m}`
}

export default function IdeasTab() {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="panel">
      <section>
        <h2>Ideias de Posts</h2>
        <p className="section-desc">
          Pesquisamos post a post nos perfis de referência (@esteticaup, @fernandadiazer), no
          próprio perfil da Risalva e em benchmarks de nicho (@dra.denisewerlich, @endolaser.br) e
          em artigos de mercado. Levantamos 24 ideias e selecionamos as 12 melhores pra setembro —
          já agendadas no Calendário de Feed.
        </p>

        {postIdeas.map((month) => {
          const selected = month.ideas.filter((i) => i.selected)
          const rest = month.ideas.filter((i) => !i.selected)
          const list = showAll ? month.ideas : selected
          const sortedList = [...list].sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))

          return (
            <div key={month.monthKey} className="ideas-month">
              <div className="ideas-month-head">
                <h3>{month.monthLabel}</h3>
                <div className="view-toggle">
                  <button
                    className={!showAll ? 'is-active' : ''}
                    onClick={() => setShowAll(false)}
                  >
                    12 selecionadas
                  </button>
                  <button
                    className={showAll ? 'is-active' : ''}
                    onClick={() => setShowAll(true)}
                  >
                    Todas as 24 pesquisadas
                  </button>
                </div>
              </div>

              <div className="pillars-grid">
                {sortedList.map((idea) => {
                  const pillar = pillars.find((p) => p.id === idea.pillarId)
                  return (
                    <div key={idea.id} className="idea-card">
                      <div className="idea-card-tags">
                        <span className={`tag idea-tag idea-tag--${idea.format}`}>{FORMAT_LABEL[idea.format]}</span>
                        {idea.date && <span className="post-idea-date">{fmtDayMonth(idea.date)}</span>}
                        {pillar && <span className="tag">{pillar.name}</span>}
                      </div>
                      <h3>{idea.title}</h3>
                      <p className="idea-desc">{idea.desc}</p>
                      <a className="idea-ref" href={idea.reference.url} target="_blank" rel="noreferrer">
                        <span className="idea-ref-label">Referência usada</span>
                        <span className="idea-ref-name">{idea.reference.name} ({idea.reference.handle})</span>
                        <span className="idea-ref-note">{idea.reference.note}</span>
                      </a>
                    </div>
                  )
                })}
              </div>

              {showAll && (
                <p className="section-desc idea-not-selected-note">
                  As {rest.length} ideias sem destaque acima ficaram de fora das 12 escolhidas, mas
                  seguem como banco de ideias pros próximos meses.
                </p>
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}
