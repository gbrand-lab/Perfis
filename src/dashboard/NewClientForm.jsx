import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createClienteApi } from '../clients/api.js'

export default function NewClientForm({ onCreated, onCancel }) {
  const [nome, setNome] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nome.trim()) {
      setError('Informe o nome do cliente.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const cliente = await createClienteApi({ nome: nome.trim() })
      onCreated(cliente)
      navigate(`/${cliente.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar cliente.')
      setSubmitting(false)
    }
  }

  return (
    <form className="dash__new-form" onSubmit={handleSubmit}>
      <label htmlFor="novo-cliente-nome">Nome do cliente</label>
      <input
        id="novo-cliente-nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Ex: Clínica Bella"
        autoFocus
      />
      {error && <span className="field-error">{error}</span>}
      <div className="dash__new-form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel} disabled={submitting}>
          cancelar
        </button>
        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Criando…' : 'Criar cliente'}
        </button>
      </div>
      <p className="dash__new-form-hint">
        O cliente entra direto com o calendário de posts. Planejamento e pilares ficam de fora, feitos por fora pelo social.
      </p>
    </form>
  )
}
