import { useState } from 'react'
import StoriesWeekCards from './StoriesWeekCards.jsx'
import StoriesTimeline from './StoriesTimeline.jsx'

export default function StoriesTab({ storiesPlan, storyTypes }) {
  const [view, setView] = useState('cards')

  return (
    <div className="panel">
      <section>
        <h2>Modelo de semana, Stories</h2>
        <p className="section-desc">
          Frame vazio, pronto pra receber o padrão de Stories do cliente, dia a dia da semana.
        </p>

        <div className="view-toggle">
          <button className={view === 'cards' ? 'is-active' : ''} onClick={() => setView('cards')}>
            Cards por dia
          </button>
          <button className={view === 'timeline' ? 'is-active' : ''} onClick={() => setView('timeline')}>
            Linha do tempo
          </button>
        </div>

        {view === 'cards' ? (
          <StoriesWeekCards storiesPlan={storiesPlan} storyTypes={storyTypes} />
        ) : (
          <StoriesTimeline storiesPlan={storiesPlan} storyTypes={storyTypes} />
        )}
      </section>
    </div>
  )
}
