import { useMemo } from 'react'
import { postIdeasByMonth, MONTH_NAME } from '../../data/index.js'
import { usePostsCrud } from '@shared/usePostsCrud.js'
import PostDrawer from '@shared/components/feed/PostDrawer.jsx'
import MonthGrid from './MonthGrid.jsx'

export const CLIENTE = 'styllus-eventos-feed'

export default function FeedCalendarTab() {
  const ideasByDate = useMemo(() => {
    const map = new Map()
    for (const block of postIdeasByMonth ?? []) {
      for (const idea of block.ideas) {
        if (idea.date) map.set(idea.date, idea)
      }
    }
    return map
  }, [])

  const months = useMemo(() => {
    return (postIdeasByMonth ?? [])
      .map((b) => ({ year: b.year, monthIndex: MONTH_NAME.indexOf(b.month) }))
      .filter((m) => m.monthIndex >= 0)
      .sort((a, b) => (a.year - b.year) || (a.monthIndex - b.monthIndex))
  }, [])

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
        />
      )}
    </div>
  )
}
