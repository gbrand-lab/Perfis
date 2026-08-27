import { useState } from 'react'
import ImageSection from './ImageSection.jsx'

export default function PostPage({ date, post, clientId, onSave, onDelete, onCancel, onPreview, confirming }) {
  const [dataPost, setDataPost] = useState(post?.data ?? date)
  const [nome, setNome] = useState(post?.nome ?? '')
  const [descricao, setDescricao] = useState(post?.descricao ?? '')
  const [legenda, setLegenda] = useState(post?.legenda ?? '')
  const [referenciaImagens, setReferenciaImagens] = useState(post?.referenciaImagens ?? [])
  const [materialImagens, setMaterialImagens] = useState(post?.materialImagens ?? [])
  const [fotoProntaImagens, setFotoProntaImagens] = useState(post?.fotoProntaImagens ?? [])
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  function addTo(setter) {
    return (novas) => setter((prev) => [...prev, ...novas])
  }

  function removeFrom(setter) {
    return (index) => setter((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSave() {
    if (!nome.trim()) {
      setError('O nome do post é obrigatório.')
      return
    }
    if (!descricao.trim()) {
      setError('A legenda é obrigatória.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      await onSave({
        data: dataPost,
        cliente: clientId,
        nome: nome.trim(),
        descricao: descricao.trim(),
        legenda: legenda.trim(),
        referenciaImagens,
        materialImagens,
        fotoProntaImagens,
      })
    } catch {
      // erro já é exibido pelo componente pai
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="post-page">
      <div className="post-page-header">
        <input
          type="date"
          className="post-page-date"
          value={dataPost}
          onChange={(e) => setDataPost(e.target.value)}
        />
        <div className="post-page-header-actions">
          {post && (
            <button
              className={confirming ? 'btn-link btn-danger' : 'btn-link'}
              onClick={onDelete}
              type="button"
            >
              {confirming ? 'confirmar exclusão?' : 'excluir'}
            </button>
          )}
          {!post && (
            <button className="btn-link" onClick={onCancel} type="button">
              cancelar
            </button>
          )}
        </div>
      </div>

      <div className="post-page-columns">
        <div className="post-page-col">
          <div className="field">
            <label htmlFor={`nome-${post?.id ?? 'new'}`}>Nome do post</label>
            <input
              id={`nome-${post?.id ?? 'new'}`}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Produto - Rótulo IPA"
            />
          </div>

          <div className="field">
            <label htmlFor={`copy-${post?.id ?? 'new'}`}>Copy</label>
            <textarea
              id={`copy-${post?.id ?? 'new'}`}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={5}
              placeholder="Roteiro / texto de trabalho do post"
            />
            {error && <span className="field-error">{error}</span>}
          </div>

          <ImageSection
            label="Referência"
            hint="Arraste a referência aqui ou clique para escolher"
            images={referenciaImagens}
            onAdd={addTo(setReferenciaImagens)}
            onRemove={removeFrom(setReferenciaImagens)}
            onPreview={onPreview}
          />

          <ImageSection
            label="Material"
            hint="Arraste o material aqui ou clique para escolher"
            images={materialImagens}
            onAdd={addTo(setMaterialImagens)}
            onRemove={removeFrom(setMaterialImagens)}
            onPreview={onPreview}
          />
        </div>

        <div className="post-page-col">
          <ImageSection
            label="Material pronto"
            hint="Arraste a foto pronta aqui"
            images={fotoProntaImagens}
            onAdd={addTo(setFotoProntaImagens)}
            onRemove={removeFrom(setFotoProntaImagens)}
            onPreview={onPreview}
            allowPaste
            large
          />

          <div className="field">
            <label htmlFor={`legenda-${post?.id ?? 'new'}`}>Legenda</label>
            <textarea
              id={`legenda-${post?.id ?? 'new'}`}
              value={legenda}
              onChange={(e) => setLegenda(e.target.value)}
              rows={5}
              placeholder="Legenda final pra publicar junto com a foto pronta"
            />
          </div>
        </div>
      </div>

      <div className="post-page-actions">
        <button type="button" className="btn-primary" onClick={handleSave} disabled={submitting}>
          {submitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  )
}
