export const MAX_IMAGE_BYTES = 4 * 1024 * 1024

export function formatDateLong(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
}

export function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Falha ao ler a imagem.'))
    reader.readAsDataURL(file)
  })
}

export function downloadImage(dataUri, filename) {
  const link = document.createElement('a')
  link.href = dataUri
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}
