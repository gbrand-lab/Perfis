import { usePostsCrud } from '../../usePostsCrud.js'
import { useMonthCursor } from '../../useMonthCursor.js'
import MonthNav from '../layout/MonthNav.jsx'
import MonthGrid from './MonthGrid.jsx'
import PostDrawer from './PostDrawer.jsx'

export default function FeedCalendarTab({ clientId }) {
  const { year, monthIndex, goPrev, goNext, goToday, goToDate } = useMonthCursor()

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

      <MonthNav year={year} monthIndex={monthIndex} onPrev={goPrev} onNext={goNext} onToday={goToday} />

      <div className="months-stack">
        <MonthGrid
          year={year}
          monthIndex={monthIndex}
          postsByDate={postsByDate}
          onSelectDate={setSelectedDate}
        />
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
          onDateChanged={(newDate) => {
            setSelectedDate(null)
            goToDate(newDate)
          }}
        />
      )}
    </div>
  )
}
