const MONTH_NAME = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export default function MonthNav({ year, monthIndex, onPrev, onNext, onToday }) {
  return (
    <div className="month-nav">
      <button type="button" className="month-nav-btn" onClick={onPrev} aria-label="Mês anterior">
        ‹
      </button>
      <div className="month-nav-label">
        <span>{MONTH_NAME[monthIndex]}</span>
        <span className="month-nav-year">{year}</span>
      </div>
      <button type="button" className="month-nav-btn" onClick={onNext} aria-label="Próximo mês">
        ›
      </button>
      {onToday && (
        <button type="button" className="btn-link month-nav-today" onClick={onToday}>
          hoje
        </button>
      )}
    </div>
  )
}
