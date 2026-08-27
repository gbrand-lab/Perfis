import { postIdeasByMonth } from '../../data/index.js'

function fmtDayMonth(dateKey) {
  if (!dateKey) return ''
  const [, m, d] = dateKey.split('-')
  return `${d}/${m}`
}

export default function PostIdeasTab() {
  return (
    <div className="panel">
      <section>
        <h2>Ideias de Posts</h2>
        <p className="section-desc">
          Ideias de conteúdo por pilar, definidas no Briefing & Brainstorm e distribuídas no
          calendário do mês.
        </p>

        {(!postIdeasByMonth || postIdeasByMonth.length === 0) ? (
          <div className="empty-state">
            <h3>Nenhuma ideia definida ainda</h3>
            <p>Preencha <code>data/postIdeas.js</code> com as ideias de conteúdo por pilar.</p>
          </div>
        ) : (
          postIdeasByMonth.map((monthBlock) => {
            const sortedIdeas = [...monthBlock.ideas].sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))

            return (
              <div key={monthBlock.id} className="post-ideas-month">
                {monthBlock.month && (
                  <div className="month-banner">
                    <span className="month-name">{monthBlock.month}</span>
                    {monthBlock.year && <span className="month-year">{monthBlock.year}</span>}
                  </div>
                )}

                <div className="post-ideas-grid">
                  {sortedIdeas.map((idea) => (
                    <article key={idea.id} className="post-idea-card">
                      <div className="post-idea-head">
                        <span className={`tag tag--${idea.type}`}>{idea.type}</span>
                        {idea.date && <span className="post-idea-date">{fmtDayMonth(idea.date)}</span>}
                        <span className="post-idea-pillar">{idea.pillar}</span>
                      </div>
                      <h3>{idea.title}</h3>
                      <p className="post-idea-desc">{idea.desc}</p>

                      {idea.reference && (
                        <div className="post-idea-ref">
                          <span className="pillar-expect-label">Referência</span>
                          <div className="post-idea-ref-body">
                            <div className="post-idea-ref-text">
                              <a href={idea.reference.url} target="_blank" rel="noreferrer">
                                {idea.reference.handle}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </section>
    </div>
  )
}
