export default function PillarCard({ pillar }) {
  return (
    <div className="pillar-card">
      {pillar.cadence && <span className="tag">{pillar.cadence}</span>}
      <h3>{pillar.name}</h3>
      {pillar.desc && <p className="pillar-desc">{pillar.desc}</p>}
      {pillar.expectation && (
        <div className="pillar-expect">
          <span className="pillar-expect-label">O que esperamos captar</span>
          <p>{pillar.expectation}</p>
        </div>
      )}
    </div>
  )
}
