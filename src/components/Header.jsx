import { Link } from 'react-router-dom'
import { MARCA } from '../config/marca.js'

export const Header = () => (
  <header className="bg-hall-navy text-white shadow-md">
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
      <Link to="/" className="flex items-center gap-3">
        <img src={MARCA.logo} alt={MARCA.nombre} className="h-12 w-auto" />
        <div className="leading-tight">
          <p className="text-hall-gold font-serif font-bold text-lg tracking-wide">{MARCA.nombre}</p>
          <p className="text-gray-300 text-xs tracking-widest uppercase">{MARCA.plataforma}</p>
        </div>
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        <a href="#rutas" className="text-gray-300 hover:text-hall-gold transition-colors">Cursos</a>
        <a href="#como-funciona" className="text-gray-300 hover:text-hall-gold transition-colors hidden sm:inline">Cómo funciona</a>
        <a href={MARCA.biblioteca} className="text-gray-300 hover:text-hall-gold transition-colors">Biblioteca</a>
      </nav>
    </div>
  </header>
)
