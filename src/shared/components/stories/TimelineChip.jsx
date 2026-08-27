export default function TimelineChip({ story, storyTypes }) {
  const typeInfo = storyTypes[story.type]
  return (
    <div className={`timeline-chip ${typeInfo?.className ?? ''}`}>
      {typeInfo && <span className="story-tag">{typeInfo.label}</span>}
      <span className="story-title">{story.title}</span>
    </div>
  )
}
