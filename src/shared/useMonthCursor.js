import { useMemo, useState } from 'react'

// Cursor de mês compartilhado pelo calendário e pelo checklist de captação,
// pra navegar mês a mês com as mesmas setas/atalho "hoje".
export function useMonthCursor() {
  const now = new Date()
  const [cursor, setCursor] = useState({ year: now.getFullYear(), monthIndex: now.getMonth() })

  function goPrev() {
    setCursor((c) => {
      const d = new Date(c.year, c.monthIndex - 1, 1)
      return { year: d.getFullYear(), monthIndex: d.getMonth() }
    })
  }

  function goNext() {
    setCursor((c) => {
      const d = new Date(c.year, c.monthIndex + 1, 1)
      return { year: d.getFullYear(), monthIndex: d.getMonth() }
    })
  }

  function goToday() {
    const n = new Date()
    setCursor({ year: n.getFullYear(), monthIndex: n.getMonth() })
  }

  // Pula o cursor pro mês de uma data "YYYY-MM-DD" (ex: post movido pro mês seguinte).
  function goToDate(dateKey) {
    const [year, month] = dateKey.split('-').map(Number)
    setCursor({ year, monthIndex: month - 1 })
  }

  return useMemo(
    () => ({ year: cursor.year, monthIndex: cursor.monthIndex, goPrev, goNext, goToday, goToDate }),
    [cursor]
  )
}
