import { useState } from 'react'
import Header from './components/layout/Header.jsx'
import TabNav from './components/layout/TabNav.jsx'
import PlanningTab from './components/planning/PlanningTab.jsx'
import IdeasTab from './components/ideas/IdeasTab.jsx'
import FeedCalendarTab from './components/feed/FeedCalendarTab.jsx'
import StoriesTab from './components/stories/StoriesTab.jsx'

const TAB_COMPONENTS = {
  planning: PlanningTab,
  ideas: IdeasTab,
  feed: FeedCalendarTab,
  stories: StoriesTab,
}

export default function RisalvaApp() {
  const [tab, setTab] = useState('planning')
  const ActiveTab = TAB_COMPONENTS[tab]

  return (
    <div className="app">
      <Header />
      <TabNav activeTab={tab} onChange={setTab} />
      <main className="content">
        <ActiveTab />
      </main>
    </div>
  )
}
