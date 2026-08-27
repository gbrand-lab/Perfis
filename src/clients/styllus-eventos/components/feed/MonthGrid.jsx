import IdeaMonthGrid from '@shared/components/feed/IdeaMonthGrid.jsx'

export default function MonthGrid(props) {
  return (
    <IdeaMonthGrid
      {...props}
      ideaTooltip={(idea) => `${idea.type.toUpperCase()} · ${idea.pillar} — ${idea.title}`}
    />
  )
}
