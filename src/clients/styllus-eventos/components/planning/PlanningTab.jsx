import { useState } from 'react'
import { pillars, brief } from '../../data/index.js'
import PillarCard from './PillarCard.jsx'

export default function PlanningTab() {
  const [activeIndex, setActiveIndex] = useState(null)
  const images = brief.referenceImages || []
  const hasActive = activeIndex !== null
  const active = hasActive ? images[activeIndex] : null

  const close = () => setActiveIndex(null)
  const prev = (e) => {
    e.stopPropagation()
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setActiveIndex((i) => (i + 1) % images.length)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev(e)
    if (e.key === 'ArrowRight') next(e)
  }

  return (
    <div className="panel">
      <section>
        <h2>Briefing & Brainstorm</h2>
        <div className="brief-summary">
          <div className="brief-item">
            <span className="brief-label">Quem é o cliente</span>
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
          {brief.references?.length > 0 && (
            <div className="brief-item">
              <span className="brief-label">Referências</span>
              <ul className="brief-refs">
                {brief.references.map((ref) => (
                  <li key={ref.url}>
                    <a href={ref.url} target="_blank" rel="noreferrer">{ref.handle}</a>
                    {ref.note && <span className="brief-ref-note"> — {ref.note}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {images.length > 0 && (
          <div className="ref-gallery">
            {images.map((img, i) => (
              <figure
                key={img.src}
                className="ref-gallery-item"
                onClick={() => setActiveIndex(i)}
              >
                <img src={img.src} alt={img.label} loading="lazy" />
                <figcaption>{img.label}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Planejamento & Pilares</h2>
        <p className="section-desc">
          Pilares de conteúdo definidos no Briefing & Brainstorm: linhas editoriais, cadência de
          publicação e o que esperar de cada captação.
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

      {hasActive && (
        <div
          className="image-fullscreen-overlay"
          onClick={close}
          onKeyDown={onKeyDown}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          <button className="btn-secondary image-fullscreen-close" onClick={(e) => { e.stopPropagation(); close() }}>
            fechar
          </button>
          {images.length > 1 && (
            <button className="btn-secondary image-fullscreen-nav image-fullscreen-nav--prev" onClick={prev}>
              ‹
            </button>
          )}
          <img src={active.src} alt={active.label} className="image-fullscreen-img" onClick={(e) => e.stopPropagation()} />
          {images.length > 1 && (
            <button className="btn-secondary image-fullscreen-nav image-fullscreen-nav--next" onClick={next}>
              ›
            </button>
          )}
          <span className="image-fullscreen-caption">{active.label} · {activeIndex + 1}/{images.length}</span>
        </div>
      )}
    </div>
  )
}
