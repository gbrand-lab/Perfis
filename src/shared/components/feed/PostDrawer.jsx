import { useState } from 'react'
import { formatDateLong, downloadImage } from './postDrawer/imageUtils.js'
import PostPage from './postDrawer/PostPage.jsx'

export default function PostDrawer({ date, clientId, posts, onClose, onCreate, onUpdate, onDelete, onDateChanged }) {
  const [addingNew, setAddingNew] = useState(posts.length === 0)
  const [confirmingId, setConfirmingId] = useState(null)
  const [fullscreenImage, setFullscreenImage] = useState(null)

  async function handleCreateNew(input) {
    await onCreate(input)
    setAddingNew(false)
    if (input.data !== date) onDateChanged?.(input.data)
  }

  async function handleUpdatePost(id, input) {
    await onUpdate(id, input)
    if (input.data !== date) onDateChanged?.(input.data)
  }

  function handleDeleteClick(id) {
    if (confirmingId === id) {
      onDelete(id)
      setConfirmingId(null)
      return
    }
    setConfirmingId(id)
    setTimeout(() => setConfirmingId((current) => (current === id ? null : current)), 4000)
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer drawer--wide" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{formatDateLong(date)}</h2>
          <button className="btn-secondary" onClick={onClose}>fechar</button>
        </div>

        <div className="drawer-posts">
          {posts.map((post) => (
            <PostPage
              key={post.id}
              date={date}
              post={post}
              clientId={clientId}
              onSave={(input) => handleUpdatePost(post.id, input)}
              onDelete={() => handleDeleteClick(post.id)}
              onPreview={setFullscreenImage}
              confirming={confirmingId === post.id}
            />
          ))}

          {addingNew && (
            <PostPage
              date={date}
              post={null}
              clientId={clientId}
              onSave={handleCreateNew}
              onCancel={() => setAddingNew(false)}
              onPreview={setFullscreenImage}
            />
          )}
        </div>

        {!addingNew && (
          <button className="btn-primary drawer-add-btn" onClick={() => setAddingNew(true)}>
            + Adicionar post neste dia
          </button>
        )}
      </div>

      {fullscreenImage && (
        <div
          className="image-fullscreen-overlay"
          onClick={(e) => {
            e.stopPropagation()
            setFullscreenImage(null)
          }}
        >
          <button
            className="btn-secondary image-fullscreen-download"
            onClick={(e) => {
              e.stopPropagation()
              downloadImage(fullscreenImage, 'foto.png')
            }}
          >
            baixar
          </button>
          <button
            className="btn-secondary image-fullscreen-close"
            onClick={(e) => {
              e.stopPropagation()
              setFullscreenImage(null)
            }}
          >
            fechar
          </button>
          <img src={fullscreenImage} alt="Foto em tela cheia" className="image-fullscreen-img" />
        </div>
      )}
    </div>
  )
}
