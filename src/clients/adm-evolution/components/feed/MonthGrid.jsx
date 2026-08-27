import IdeaMonthGrid from '@shared/components/feed/IdeaMonthGrid.jsx'

export default function MonthGrid(props) {
  return <IdeaMonthGrid {...props} ideaTooltip={(idea) => `Ideia planejada: ${idea.title}`} />
}
