const MONTH_NAME = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const WEEKDAY_HEADERS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

function toDateKey(year, monthIndex, day) {
  const m = String(monthIndex + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

export default function MonthGrid({ year, monthIndex, postsByDate = new Map(), onSelectDate }) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const leadingBlanks = new Date(year, monthIndex, 1).getDay() // 0 dom
  const totalCells = leadingBlanks + daysInMonth
  const trailingBlanks = (7 - (totalCells % 7)) % 7

  const cells = [
    ...Array(leadingBlanks).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(trailingBlanks).fill(null),
  ]

  return (
    <div className="month-block">
      <div className="month-banner">
        <span className="month-name">{MONTH_NAME[monthIndex]}</span>
        <span className="month-year">{year}</span>
      </div>
      <div className="calendar-grid">
        {WEEKDAY_HEADERS.map((h) => (
          <div key={h} className="calendar-weekday">{h}</div>
        ))}
        {cells.map((day, idx) => {
          if (day === null) return <div key={idx} className="calendar-cell calendar-cell--blank" />
          const dateKey = toDateKey(year, monthIndex, day)
          const dayPosts = postsByDate.get(dateKey) ?? []
          return (
            <button
              key={idx}
              type="button"
              className={`calendar-cell calendar-cell--clickable ${dayPosts.length > 0 ? 'calendar-cell--filled' : ''}`}
              onClick={() => onSelectDate?.(dateKey)}
            >
              <span className="cell-day">
                {day}
                {dayPosts.length > 0 && <span className="cell-photo-dot" title={`${dayPosts.length} foto(s) anexada(s)`} />}
              </span>
              {dayPosts.map((post) => (
                <span key={post.id} className="cell-chip">{post.nome || 'Sem nome definido'}</span>
              ))}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { MONTH_NAME, WEEKDAY_HEADERS }
