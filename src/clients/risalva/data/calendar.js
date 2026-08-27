export const MONTH_NAME = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const MONTH_ABBR = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
export const WEEKDAY_HEADERS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']

export function fmtDate(date) {
  return `${String(date.getDate()).padStart(2, '0')} ${MONTH_ABBR[date.getMonth()]}`
}

export function fmtRange(start, end) {
  return `${fmtDate(start)} a ${fmtDate(end)}`
}

// Janela de meses exibida no calendário. `offset` pula meses a partir do atual
// (offset 1 = começa no mês seguinte, tirando o mês corrente da visão).
export function upcomingMonths(count = 2, offset = 0) {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + offset + i, 1)
    return { year: d.getFullYear(), monthIndex: d.getMonth() }
  })
}
