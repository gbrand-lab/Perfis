import { storiesPlan } from '../../data/index.js'
import TimelineChip from './TimelineChip.jsx'

export default function StoriesTimeline() {
  return (
    <div className="stories-timeline">
      {storiesPlan.map((d) => (
        <div key={d.day} className={`timeline-row ${d.pending ? 'timeline-row--pending' : ''}`}>
          <div className="timeline-day">
            <h3>{d.day}</h3>
            <span>{d.stories.length} stories</span>
          </div>
          <div className="timeline-strip">
            {d.stories.map((story, idx) => (
              <TimelineChip key={idx} story={story} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
