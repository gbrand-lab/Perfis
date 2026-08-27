import { storyTypes } from '../../data/index.js'

export default function TimelineChip({ story }) {
  const typeInfo = storyTypes[story.type]
  return (
    <div className={`timeline-chip ${typeInfo?.className ?? ''}`}>
      {typeInfo && <span className="story-tag">{typeInfo.label}</span>}
      <span className="story-title">{story.title}</span>
    </div>
  )
}
