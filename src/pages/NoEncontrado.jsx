import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <section className="max-w-xl mx-auto px-4 py-24 text-center">
      <p className="font-mono text-hall-gold tracking-widest mb-3">404</p>
      <h1 className="font-serif text-3xl font-bold text-hall-navy mb-4">Esta página no existe</h1>
      <Link to="/" className="text-hall-navy underline hover:text-hall-gold">Volver al inicio</Link>
    </section>
  )
}
