import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="top">
      <div className="heading-block">
        <div className="eyebrow">Planejamento de conteúdo</div>
        <h1>ADM Evolution</h1>
      </div>
      <Link to="/dashboard" className="back-btn">← Voltar ao dashboard</Link>
    </header>
  )
}
