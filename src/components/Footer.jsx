import { MARCA } from '../config/marca.js'

export const Footer = () => (
  <footer className="bg-hall-dark text-gray-400 text-sm">
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p>© {new Date().getFullYear()} {MARCA.nombreCompleto}. Todos los derechos reservados.</p>
      <a href={MARCA.biblioteca} className="hover:text-hall-gold transition-colors">Biblioteca Digital</a>
    </div>
  </footer>
)
