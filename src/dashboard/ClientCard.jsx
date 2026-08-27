import { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteClienteApi, updateClienteApi } from '../clients/api.js'

function RenameClientForm({ cliente, onSaved, onCancel }) {
  const [nome, setNome] = useState(cliente.nome)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nome.trim()) {
      setError('Informe o nome do cliente.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const updated = await updateClienteApi(cliente.id, { nome: nome.trim() })
      onSaved(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao renomear cliente.')
      setSubmitting(false)
    }
  }

  return (
    <form className="dash__card-edit-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        autoFocus
      />
      {error && <span className="field-error">{error}</span>}
      <div className="dash__card-edit-actions">
        <button type="button" className="btn-secondary" onClick={onCancel} disabled={submitting}>
          cancelar
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </form>
  )
}

export default function ClientCard({ cliente, editable, onRenamed, onDeleted }) {
  const [editing, setEditing] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirmingDelete) {
      setConfirmingDelete(true)
      setTimeout(() => setConfirmingDelete(false), 4000)
      return
    }
    setDeleting(true)
    try {
      await deleteClienteApi(cliente.id)
      onDeleted(cliente.id)
    } catch {
      setDeleting(false)
      setConfirmingDelete(false)
    }
  }

  if (editing) {
    return (
      <div className="dash__card dash__card--editing">
        <RenameClientForm
          cliente={cliente}
          onSaved={(updated) => {
            onRenamed(updated)
            setEditing(false)
          }}
          onCancel={() => setEditing(false)}
        />
      </div>
    )
  }

  return (
    <Link to={`/${cliente.id}`} className="dash__card">
      <span className="dash__card-icon">{cliente.nome.charAt(0)}</span>
      <div>
        <h2>{cliente.nome}</h2>
        <span className="dash__card-cta">Abrir planejamento →</span>
      </div>
      {editable && (
        <div className="dash__card-actions">
          <button
            type="button"
            className="btn-link"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setEditing(true)
            }}
          >
            editar
          </button>
          <button
            type="button"
            className={confirmingDelete ? 'btn-link btn-danger' : 'btn-link'}
            disabled={deleting}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleDelete()
            }}
          >
            {confirmingDelete ? 'confirmar exclusão?' : 'excluir'}
          </button>
        </div>
      )}
    </Link>
  )
}
