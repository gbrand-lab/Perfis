import { useMemo } from 'react'
import { upcomingMonths, postIdeas } from '../../data/index.js'
import { usePostsCrud } from '@shared/usePostsCrud.js'
import PostDrawer from '@shared/components/feed/PostDrawer.jsx'
import MonthGrid from './MonthGrid.jsx'

export const CLIENTE = 'risalva-feed'

export default function FeedCalendarTab() {
  const months = upcomingMonths(2, 1)

  const {
    postsByDate,
    postsDoDia,
    selectedDate,
    setSelectedDate,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = usePostsCrud(CLIENTE)

  const ideasByDate = useMemo(() => {
    const map = new Map()
    for (const month of postIdeas) {
      for (const idea of month.ideas) {
        if (idea.selected && idea.date) map.set(idea.date, idea)
      }
    }
    return map
  }, [])

  return (
    <div className="panel">
      <div className="calendar-head">
        <h2>Calendário de feed</h2>
      </div>
      <p className="section-desc">
        Clique em qualquer dia para subir a foto do post com a legenda.
      </p>

      {error && <div className="banner-error">{error}</div>}

      <div className="months-stack">
        {months.map((m) => (
          <MonthGrid
            key={`${m.year}-${m.monthIndex}`}
            year={m.year}
            monthIndex={m.monthIndex}
            postsByDate={postsByDate}
            ideasByDate={ideasByDate}
            onSelectDate={setSelectedDate}
          />
        ))}
      </div>

      {selectedDate && (
        <PostDrawer
          date={selectedDate}
          clientId={CLIENTE}
          posts={postsDoDia}
          onClose={() => setSelectedDate(null)}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onDateChanged={() => setSelectedDate(null)}
        />
      )}
    </div>
  )
}
