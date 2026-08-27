import { useRef, useState } from 'react'
import { MAX_IMAGE_BYTES, readImageFile } from './imageUtils.js'
import ImageThumb from './ImageThumb.jsx'

export default function ImageSection({ label, hint, images, onAdd, onRemove, onPreview, allowPaste, large }) {
  const [dragActive, setDragActive] = useState(false)
  const [imageError, setImageError] = useState(null)
  const fileInputRef = useRef(null)

  async function addImageFiles(fileList) {
    const files = Array.from(fileList)
    if (files.length === 0) return
    setImageError(null)

    const validos = []
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setImageError('Selecione apenas arquivos de imagem.')
        continue
      }
      if (file.size > MAX_IMAGE_BYTES) {
        setImageError('Cada imagem deve ter no máximo 4MB.')
        continue
      }
      validos.push(file)
    }
    if (validos.length === 0) return

    try {
      const novas = await Promise.all(validos.map(readImageFile))
      onAdd(novas)
    } catch {
      setImageError('Falha ao ler uma ou mais imagens.')
    }
  }

  function handleInputChange(e) {
    if (e.target.files) addImageFiles(e.target.files)
    e.target.value = ''
  }

  function handleDragOver(e) {
    e.preventDefault()
    setDragActive(true)
  }

  function handleDragLeave(e) {
    e.preventDefault()
    setDragActive(false)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files) addImageFiles(e.dataTransfer.files)
  }

  function handlePaste(e) {
    if (!allowPaste) return
    const items = e.clipboardData?.items
    if (!items) return
    const files = []
    for (const item of items) {
      if (item.type && item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) files.push(file)
      }
    }
    if (files.length > 0) {
      e.preventDefault()
      addImageFiles(files)
    }
  }

  return (
    <div className={`image-section ${large ? 'image-section--large' : ''}`}>
      <span className="image-section-label">{label}</span>
      <div
        className={dragActive ? 'dropzone dropzone-active' : 'dropzone'}
        tabIndex={allowPaste ? 0 : undefined}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={allowPaste ? handlePaste : undefined}
      >
        <span>{hint}{allowPaste ? ' — ou clique aqui e cole (Ctrl+V)' : ''}</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputChange}
          className="dropzone-input"
        />
      </div>
      {imageError && <span className="field-error">{imageError}</span>}

      {images.length > 0 && (
        <div className="image-grid">
          {images.map((img, index) => (
            <ImageThumb
              key={index}
              img={img}
              label={label}
              index={index}
              onRemove={onRemove ? (i) => onRemove(i) : null}
              onPreview={onPreview}
            />
          ))}
        </div>
      )}
    </div>
  )
}
