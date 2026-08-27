import { MONTH_NAME, WEEKDAY_HEADERS } from './MonthGrid.jsx'

function toDateKey(year, monthIndex, day) {
  const m = String(monthIndex + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

// Igual ao MonthGrid genérico, mas com overlay de ideias planejadas
// (usado pelos clientes com aba de Ideias/Post Ideas). `ideaTooltip` deixa
// cada cliente customizar o texto do title do dia.
export default function IdeaMonthGrid({
  year,
  monthIndex,
  postsByDate = new Map(),
  ideasByDate = new Map(),
  onSelectDate,
  ideaTooltip = (idea) => `Ideia planejada: ${idea.title}`,
}) {
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
          const idea = ideasByDate.get(dateKey)
          return (
            <button
              key={idx}
              type="button"
              className={`calendar-cell calendar-cell--clickable ${dayPosts.length > 0 ? 'calendar-cell--filled' : ''} ${idea ? 'calendar-cell--idea' : ''}`}
              onClick={() => onSelectDate?.(dateKey)}
              title={idea ? ideaTooltip(idea) : undefined}
            >
              <span className="cell-day">
                {day}
                {dayPosts.length > 0 && <span className="cell-photo-dot" title={`${dayPosts.length} foto(s) anexada(s)`} />}
              </span>
              {idea && <span className="idea-cell-label">{idea.title}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
