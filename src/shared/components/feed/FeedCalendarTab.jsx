import { usePostsCrud } from '../../usePostsCrud.js'
import MonthGrid from './MonthGrid.jsx'
import PostDrawer from './PostDrawer.jsx'

// Janela de meses exibida no calendário. `offset` pula meses a partir do
// atual (offset 1 = começa no mês seguinte, tirando o mês corrente da visão).
function upcomingMonths(count = 2, offset = 0) {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + offset + i, 1)
    return { year: d.getFullYear(), monthIndex: d.getMonth() }
  })
}

export default function FeedCalendarTab({ clientId, monthsCount = 2, monthsOffset = 0 }) {
  const months = upcomingMonths(monthsCount, monthsOffset)

  const {
    postsByDate,
    postsDoDia,
    selectedDate,
    setSelectedDate,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
  } = usePostsCrud(clientId)

  return (
    <div className="panel">
      <div className="calendar-head">
        <h2>Calendário de posts</h2>
      </div>
      <p className="section-desc">
        Clique em qualquer dia para agendar o post: legenda, referência, material e foto pronta.
      </p>

      {error && <div className="banner-error">{error}</div>}

      <div className="months-stack">
        {months.map((m) => (
          <MonthGrid
            key={`${m.year}-${m.monthIndex}`}
            year={m.year}
            monthIndex={m.monthIndex}
            postsByDate={postsByDate}
            onSelectDate={setSelectedDate}
          />
        ))}
      </div>

      {selectedDate && (
        <PostDrawer
          date={selectedDate}
          clientId={clientId}
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
