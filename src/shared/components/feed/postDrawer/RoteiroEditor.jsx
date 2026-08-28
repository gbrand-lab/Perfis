// Editor de roteiro cena a cena, no molde usado na GBrand (ação na tela +
// texto/áudio, por cena) — é o que alimenta o checklist de captação
// automaticamente quando o post tá marcado "preciso captar".
export default function RoteiroEditor({ roteiro, onChange, idPrefix }) {
  const sobre = roteiro.sobre ?? ''
  const cenas = roteiro.cenas ?? []
  const takesExtras = roteiro.takesExtras ?? []

  function updateCena(index, patch) {
    const next = cenas.map((c, i) => (i === index ? { ...c, ...patch } : c))
    onChange({ ...roteiro, cenas: next })
  }

  function addCena() {
    onChange({ ...roteiro, cenas: [...cenas, { acaoNaTela: '', textoAudio: '' }] })
  }

  function removeCena(index) {
    onChange({ ...roteiro, cenas: cenas.filter((_, i) => i !== index) })
  }

  function updateTake(index, value) {
    onChange({ ...roteiro, takesExtras: takesExtras.map((t, i) => (i === index ? value : t)) })
  }

  function addTake() {
    onChange({ ...roteiro, takesExtras: [...takesExtras, ''] })
  }

  function removeTake(index) {
    onChange({ ...roteiro, takesExtras: takesExtras.filter((_, i) => i !== index) })
  }

  return (
    <div className="roteiro-editor">
      <div className="field">
        <label htmlFor={`${idPrefix}-sobre`}>Sobre este roteiro</label>
        <input
          id={`${idPrefix}-sobre`}
          type="text"
          value={sobre}
          onChange={(e) => onChange({ ...roteiro, sobre: e.target.value })}
          placeholder="Formato, tom, pra quem é (contexto rápido de 1 linha)"
        />
      </div>

      <div className="roteiro-cenas">
        <span className="image-section-label">Roteiro, cena a cena</span>
        {cenas.map((cena, i) => (
          <div key={i} className="roteiro-cena-row">
            <span className="roteiro-cena-num">{String(i + 1).padStart(2, '0')}</span>
            <div className="roteiro-cena-fields">
              <textarea
                value={cena.acaoNaTela}
                onChange={(e) => updateCena(i, { acaoNaTela: e.target.value })}
                rows={2}
                placeholder="Ação na tela"
              />
              <textarea
                value={cena.textoAudio}
                onChange={(e) => updateCena(i, { textoAudio: e.target.value })}
                rows={2}
                placeholder="Texto / áudio"
              />
            </div>
            <button type="button" className="btn-link btn-danger" onClick={() => removeCena(i)}>
              remover
            </button>
          </div>
        ))}
        <button type="button" className="btn-secondary" onClick={addCena}>
          + Adicionar cena
        </button>
      </div>

      <div className="roteiro-takes">
        <span className="image-section-label">Takes extras (além de 1 por cena)</span>
        {takesExtras.map((take, i) => (
          <div key={i} className="roteiro-take-row">
            <input
              type="text"
              value={take}
              onChange={(e) => updateTake(i, e.target.value)}
              placeholder="Ex: take de b-roll do escritório"
            />
            <button type="button" className="btn-link btn-danger" onClick={() => removeTake(i)}>
              remover
            </button>
          </div>
        ))}
        <button type="button" className="btn-secondary" onClick={addTake}>
          + Adicionar take extra
        </button>
      </div>
    </div>
  )
}
