export default function StoryChip({ story, storyTypes }) {
  const typeInfo = storyTypes[story.type]
  return (
    <div className={`story-chip ${typeInfo?.className ?? ''}`}>
      <div className="story-chip-head">
        {typeInfo && <span className="story-tag">{typeInfo.label}</span>}
      </div>
      <span className="story-title">{story.title}</span>
      {story.detail && <span className="story-detail">{story.detail}</span>}
    </div>
  )
}
