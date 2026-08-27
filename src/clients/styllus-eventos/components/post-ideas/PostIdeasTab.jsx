import { useState } from 'react'
import { postIdeasByMonth } from '../../data/index.js'

function fmtDayMonth(dateKey) {
  if (!dateKey) return ''
  const [, m, d] = dateKey.split('-')
  return `${d}/${m}`
}

export default function PostIdeasTab() {
  const [zoom, setZoom] = useState(null) // { images: [], index: number }

  const openZoom = (images, index) => setZoom({ images, index })
  const close = () => setZoom(null)
  const prev = (e) => {
    e.stopPropagation()
    setZoom((z) => ({ ...z, index: (z.index - 1 + z.images.length) % z.images.length }))
  }
  const next = (e) => {
    e.stopPropagation()
    setZoom((z) => ({ ...z, index: (z.index + 1) % z.images.length }))
  }

  return (
    <div className="panel">
      <section>
        <h2>Ideias de Posts</h2>
        <p className="section-desc">
          Ideias de conteúdo por mês, baseadas nos pilares definidos no Briefing & Brainstorm e em
          pesquisa real nos perfis de referência (posts, legendas e formatos observados).
        </p>

        {(!postIdeasByMonth || postIdeasByMonth.length === 0) ? (
          <div className="empty-state">
            <h3>Nenhuma ideia definida ainda</h3>
            <p>Preencha <code>data/postIdeas.js</code> com as ideias de conteúdo por mês.</p>
          </div>
        ) : (
          postIdeasByMonth.map((monthBlock) => {
            const images = monthBlock.ideas.filter((i) => i.reference?.image).map((i) => i.reference.image)
            const sortedIdeas = [...monthBlock.ideas].sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''))

            return (
              <div key={monthBlock.id} className="post-ideas-month">
                <div className="month-banner">
                  <span className="month-name">{monthBlock.month}</span>
                  <span className="month-year">{monthBlock.year}</span>
                </div>

                <div className="post-ideas-grid">
                  {sortedIdeas.map((idea) => (
                    <article
                      key={idea.id}
                      className="post-idea-card"
                    >
                      <div className="post-idea-head">
                        <span className={`tag tag--${idea.type}`}>{idea.type}</span>
                        {idea.date && <span className="post-idea-date">{fmtDayMonth(idea.date)}</span>}
                        <span className="post-idea-pillar">{idea.pillar}</span>
                      </div>
                      <h3>{idea.title}</h3>
                      <p className="post-idea-desc">{idea.desc}</p>

                      {idea.copy && (
                        <details className="post-idea-copy">
                          <summary>Ver copy sugerida</summary>
                          <pre>{idea.copy}</pre>
                        </details>
                      )}

                      {idea.reference && (
                        <div className="post-idea-ref">
                          <span className="pillar-expect-label">Referência</span>
                          <div className="post-idea-ref-body">
                            {idea.reference.image && (
                              <img
                                src={idea.reference.image}
                                alt={idea.reference.handle}
                                className="post-idea-ref-thumb"
                                loading="lazy"
                                onClick={() => openZoom(images, images.indexOf(idea.reference.image))}
                              />
                            )}
                            <div className="post-idea-ref-text">
                              <a href={idea.reference.url} target="_blank" rel="noreferrer">
                                {idea.reference.handle}
                              </a>
                              {!idea.reference.image && (
                                <span className="post-idea-ref-note">post real, sem print salvo</span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      {!idea.reference && (
                        <span className="post-idea-ref-note post-idea-ref-note--authorial">conteúdo autoral do cliente</span>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )
          })
        )}
      </section>

      {zoom && (
        <div className="image-fullscreen-overlay" onClick={close}>
          <button className="btn-secondary image-fullscreen-close" onClick={(e) => { e.stopPropagation(); close() }}>
            fechar
          </button>
          {zoom.images.length > 1 && (
            <button className="btn-secondary image-fullscreen-nav image-fullscreen-nav--prev" onClick={prev}>
              ‹
            </button>
          )}
          <img
            src={zoom.images[zoom.index]}
            alt="Referência"
            className="image-fullscreen-img"
            onClick={(e) => e.stopPropagation()}
          />
          {zoom.images.length > 1 && (
            <button className="btn-secondary image-fullscreen-nav image-fullscreen-nav--next" onClick={next}>
              ›
            </button>
          )}
          <span className="image-fullscreen-caption">{zoom.index + 1}/{zoom.images.length}</span>
        </div>
      )}
    </div>
  )
}
