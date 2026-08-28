import { useState } from 'react'
import { usePostsCrud } from '../../usePostsCrud.js'
import { useMonthCursor } from '../../useMonthCursor.js'
import MonthNav from '../layout/MonthNav.jsx'

function fmtDateLong(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

// Todo take do checklist: 1 por cena do roteiro (resumido pela ação na
// tela) — os takes extras aparecem à parte, como lista editável direto na
// captação.
function takesDoPost(post) {
  const cenas = post.roteiro?.cenas ?? []
  return cenas.map((c, i) => `Cena ${i + 1} — ${c.acaoNaTela || '(sem descrição)'}`)
}

function ExtraTakes({ post, onUpdateTakes }) {
  const [novoTake, setNovoTake] = useState('')
  const takesExtras = post.roteiro?.takesExtras ?? []

  function addTake() {
    const value = novoTake.trim()
    if (!value) return
    onUpdateTakes(post, [...takesExtras, value])
    setNovoTake('')
  }

  function removeTake(index) {
    onUpdateTakes(post, takesExtras.filter((_, i) => i !== index))
  }

  return (
    <div className="checklist-takes-extras">
      <span className="image-section-label">Takes extras (além de 1 por cena)</span>
      {takesExtras.length > 0 && (
        <ul>
          {takesExtras.map((take, i) => (
            <li key={i}>
              <span>{take}</span>
              <button type="button" className="btn-link btn-danger" onClick={() => removeTake(i)}>
                remover
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="roteiro-take-row">
        <input
          type="text"
          value={novoTake}
          onChange={(e) => setNovoTake(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTake() } }}
          placeholder="Ex: take de b-roll do escritório"
        />
        <button type="button" className="btn-secondary" onClick={addTake}>
          + Adicionar take extra
        </button>
      </div>
    </div>
  )
}

function ChecklistCard({ post, onMarcarCaptado, onUpdateTakes, marking }) {
  const isVideo = post.tipo === 'video'
  const takes = isVideo ? takesDoPost(post) : []

  return (
    <div className="checklist-card">
      <div className="checklist-card-header">
        <div>
          <span className="checklist-card-tag">{isVideo ? 'VÍDEO' : 'IMAGEM'}</span>
          <h3>{post.nome || 'Sem nome definido'}</h3>
        </div>
        <button type="button" className="btn-primary" onClick={onMarcarCaptado} disabled={marking}>
          {marking ? 'Salvando…' : 'Marcar como captado'}
        </button>
      </div>

      {isVideo ? (
        <>
          {post.roteiro?.sobre && <p className="checklist-card-sobre">{post.roteiro.sobre}</p>}
          {(post.roteiro?.cenas ?? []).length > 0 && (
            <div className="table-scroll">
              <table className="checklist-roteiro-table">
                <thead>
                  <tr>
                    <th>Cena</th>
                    <th>Ação na tela</th>
                    <th>Texto / Áudio</th>
                  </tr>
                </thead>
                <tbody>
                  {post.roteiro.cenas.map((cena, i) => (
                    <tr key={i}>
                      <td>{String(i + 1).padStart(2, '0')}</td>
                      <td>{cena.acaoNaTela}</td>
                      <td>{cena.textoAudio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {takes.length > 0 && (
            <div className="checklist-takes">
              <span className="image-section-label">Checklist de takes</span>
              <ul>
                {takes.map((take, i) => (
                  <li key={i}>{take}</li>
                ))}
              </ul>
            </div>
          )}
          <ExtraTakes post={post} onUpdateTakes={onUpdateTakes} />
        </>
      ) : (
        <p className="checklist-card-descricao">
          {post.roteiro?.descricaoImagem || 'Sem descrição da imagem cadastrada.'}
        </p>
      )}
    </div>
  )
}

export default function CaptureChecklistTab({ clientId }) {
  const { posts, error, handleUpdate } = usePostsCrud(clientId)
  const [markingId, setMarkingId] = useState(null)
  const { year, monthIndex, goPrev, goNext, goToday } = useMonthCursor()

  const pendentes = posts
    .filter((p) => p.materialStatus === 'preciso-captar')
    .filter((p) => {
      const [y, m] = p.data.split('-').map(Number)
      return y === year && m - 1 === monthIndex
    })
    .sort((a, b) => a.data.localeCompare(b.data))

  const porData = new Map()
  for (const post of pendentes) {
    if (!porData.has(post.data)) porData.set(post.data, [])
    porData.get(post.data).push(post)
  }

  async function marcarCaptado(post) {
    setMarkingId(post.id)
    try {
      await handleUpdate(post.id, { ...post, materialStatus: 'tenho' })
    } finally {
      setMarkingId(null)
    }
  }

  async function atualizarTakes(post, takesExtras) {
    await handleUpdate(post.id, { ...post, roteiro: { ...post.roteiro, takesExtras } })
  }

  return (
    <div className="panel">
      <div className="calendar-head">
        <h2>Checklist de Captação</h2>
      </div>
      <p className="section-desc">
        Gerado a partir dos posts do calendário marcados "preciso captar". Assim que o material for
        resolvido, marca como captado — o post continua no calendário, só some daqui.
      </p>

      {error && <div className="banner-error">{error}</div>}

      <MonthNav year={year} monthIndex={monthIndex} onPrev={goPrev} onNext={goNext} onToday={goToday} />

      {porData.size === 0 ? (
        <div className="empty-state">
          <h3>Nada pendente</h3>
          <p>Nenhum post desse mês está marcado como "preciso captar" no momento.</p>
        </div>
      ) : (
        <div className="checklist-dates">
          {[...porData.entries()].map(([data, postsDoDia]) => (
            <div key={data} className="checklist-date-group">
              <h3 className="checklist-date-title">{fmtDateLong(data)}</h3>
              <div className="checklist-cards">
                {postsDoDia.map((post) => (
                  <ChecklistCard
                    key={post.id}
                    post={post}
                    onMarcarCaptado={() => marcarCaptado(post)}
                    onUpdateTakes={atualizarTakes}
                    marking={markingId === post.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
