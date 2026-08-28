// Editor de roteiro cena a cena, no molde usado na GBrand (ação na tela +
// texto/áudio, por cena) — é o que alimenta o checklist de captação
// automaticamente quando o post tá marcado "preciso captar".
// Takes extras não entram aqui: são adicionados direto na tela de Captação,
// já em cima do roteiro definido.
export default function RoteiroEditor({ roteiro, onChange, idPrefix }) {
  const sobre = roteiro.sobre ?? ''
  const cenas = roteiro.cenas ?? []

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
    </div>
  )
}
