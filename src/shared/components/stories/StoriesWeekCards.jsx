import StoryChip from './StoryChip.jsx'

export default function StoriesWeekCards({ storiesPlan, storyTypes }) {
  return (
    <div className="stories-week">
      {storiesPlan.map((d) => (
        <div key={d.day} className={`stories-day ${d.pending ? 'stories-day--pending' : ''}`}>
          <div className="stories-day-head">
            <h3>{d.day}</h3>
            <span className="stories-count">{d.stories.length} stories</span>
          </div>
          {d.note && <p className="stories-note">{d.note}</p>}
          <div className="stories-list">
            {d.stories.map((story, idx) => (
              <StoryChip key={idx} story={story} storyTypes={storyTypes} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
