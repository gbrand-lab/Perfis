import { downloadImage } from './imageUtils.js'

export default function ImageThumb({ img, label, index, onRemove, onPreview }) {
  return (
    <div className="image-grid-item">
      <img
        src={img}
        alt={`${label} ${index + 1}`}
        className="image-grid-thumb image-preview-clickable"
        onClick={() => onPreview(img)}
      />
      <button
        type="button"
        className="image-grid-download"
        onClick={(e) => {
          e.stopPropagation()
          downloadImage(img, `${label.toLowerCase().replace(/\s+/g, '-')}-${index + 1}.png`)
        }}
        aria-label={`Baixar ${label.toLowerCase()}`}
        title="Baixar"
      >
        ⬇
      </button>
      {onRemove && (
        <button
          type="button"
          className="image-grid-remove"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(index)
          }}
          aria-label={`Remover ${label.toLowerCase()}`}
        >
          ×
        </button>
      )}
    </div>
  )
}
