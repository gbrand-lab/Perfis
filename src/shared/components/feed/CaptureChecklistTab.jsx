import { useState } from 'react'
import { usePostsCrud } from '../../usePostsCrud.js'

function fmtDateLong(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

// Todo take do checklist: 1 por cena do roteiro (resumido pela ação na
// tela) + os takes extras que quem planejou adicionou à mão.
function takesDoPost(post) {
  const cenas = post.roteiro?.cenas ?? []
  const daseCenas = cenas.map((c, i) => `Cena ${i + 1} — ${c.acaoNaTela || '(sem descrição)'}`)
  const extras = post.roteiro?.takesExtras ?? []
  return [...daseCenas, ...extras]
}

function ChecklistCard({ post, onMarcarCaptado, marking }) {
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

  const pendentes = posts
    .filter((p) => p.materialStatus === 'preciso-captar')
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

      {porData.size === 0 ? (
        <div className="empty-state">
          <h3>Nada pendente</h3>
          <p>Nenhum post do calendário está marcado como "preciso captar" no momento.</p>
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
