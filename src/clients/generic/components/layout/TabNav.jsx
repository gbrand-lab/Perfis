export const TABS = [
  { id: 'feed', label: 'Calendário de Posts' },
  { id: 'captacao', label: 'Checklist de Captação' },
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
