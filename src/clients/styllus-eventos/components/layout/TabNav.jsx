export const TABS = [
  { id: 'planning', label: 'Planejamento & Pilares' },
  { id: 'post-ideas', label: 'Ideias de Posts' },
  { id: 'feed', label: 'Calendário, Feed' },
  { id: 'stories', label: 'Calendário, Stories' },
]

export default function TabNav({ activeTab, onChange }) {
  return (
    <nav className="tabs">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={`tab-btn ${activeTab === t.id ? 'tab-btn--active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  )
}
