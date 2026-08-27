import { storiesPlan, storyTypes } from '../../data/index.js'
import StoriesTab from '@shared/components/stories/StoriesTab.jsx'

export default function ClientStoriesTab() {
  return <StoriesTab storiesPlan={storiesPlan} storyTypes={storyTypes} />
}
