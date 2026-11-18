// Sala de avances: vista privada para mostrar el trabajo de los cursos antes de
// abrirlos. Solo existe en el canal de vista previa "avances": ahí se sube
// /avances/indice.json junto con los archivos. En el sitio normal ese archivo no
// existe y esta página muestra "no existe".
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NoEncontrado from './NoEncontrado.jsx'

function useIndice() {
  const [estado, setEstado] = useState({ cargando: true, indice: null })
  useEffect(() => {
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    fetch('/avances/indice.json')
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((indice) => setEstado({ cargando: false, indice }))
    return () => robots.remove()
  }, [])
  return estado
}

function Aviso() {
  return (
    <div className="bg-hall-gold text-hall-navy text-sm text-center px-4 py-2 font-semibold">
      Vista privada de avances: material en desarrollo. No compartir.
    </div>
  )
}

function Boton({ href, children, primario }) {
  const clase = primario
    ? 'bg-hall-navy text-white hover:bg-hall-dark'
    : 'border border-hall-navy/30 text-hall-navy hover:bg-hall-cream'
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`inline-block text-sm px-4 py-2 rounded transition-colors ${clase}`}>
      {children}
    </a>
  )
}

function Leccion({ l }) {
  const piezas = [l.video && 'video', (l.pdfCarta || l.pdfCelular) && 'guía', l.ejercicios && 'ejercicios'].filter(Boolean)
  return (
    <article className="bg-white rounded-lg border border-hall-navy/10 shadow-sm overflow-hidden">
      {l.video?.url && (
        <video src={`${l.video.url}#t=1`} controls preload="metadata" className="w-full bg-black aspect-video" />
      )}
      <div className="p-5 sm:p-6">
        <p className="text-xs tracking-widest uppercase text-hall-gold font-semibold mb-1">Lección {l.n}</p>
        <h3 className="font-serif text-2xl font-bold text-hall-navy mb-1">{l.titulo}</h3>
        <p className="text-sm text-hall-dark/60 mb-4">
          {l.video?.nota ?? 'Sin video todavía'} · Listo: {piezas.join(', ')}
        </p>
        <div className="flex flex-wrap gap-2">
          {l.ejercicios && <Boton href={l.ejercicios} primario>Hacer los ejercicios</Boton>}
          {l.pdfCelular && <Boton href={l.pdfCelular}>Guía PDF (celular)</Boton>}
          {l.pdfCarta && <Boton href={l.pdfCarta}>Guía PDF (carta)</Boton>}
        </div>
      </div>
    </article>
  )
}

export default function Avances() {
  const { curso: cursoId } = useParams()
  const { cargando, indice } = useIndice()

  if (cargando) return <p className="text-center py-24 text-hall-dark/60">Cargando…</p>
  if (!indice) return <NoEncontrado />

  const curso = cursoId && indice.cursos.find((c) => c.id === cursoId)
  if (cursoId && !curso) return <NoEncontrado />

  if (!curso) {
    return (
      <>
        <Aviso />
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-hall-navy mb-2">Avances de los cursos</h1>
          <p className="text-hall-dark/70 mb-10">Lo más reciente de cada curso. Toca uno para ver sus lecciones.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {indice.cursos.map((c) => (
              <Link
                key={c.id}
                to={`/avances/${c.id}`}
                className="block bg-white rounded-lg border border-hall-navy/10 shadow-sm p-6 hover:border-hall-gold hover:shadow-md transition-all"
              >
                <h2 className="font-serif text-2xl font-bold text-hall-navy mb-1">{c.titulo}</h2>
                <p className="text-hall-dark/70 mb-4">{c.subtitulo}</p>
                <p className="text-sm text-hall-dark/60">Presenta: {c.presenta}</p>
                <p className="text-sm text-hall-gold font-semibold mt-3">
                  {c.lecciones.length} {c.lecciones.length === 1 ? 'lección' : 'lecciones'} con avance →
                </p>
              </Link>
            ))}
          </div>
          <p className="text-xs text-hall-dark/40 mt-10">
            Actualizado: {new Date(indice.generado).toLocaleString('es-MX')}
          </p>
        </section>
      </>
    )
  }

  return (
    <>
      <Aviso />
      <section className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/avances" className="text-sm text-hall-navy/70 hover:text-hall-gold">← Todos los cursos</Link>
        <h1 className="font-serif text-4xl font-bold text-hall-navy mt-4 mb-1">{curso.titulo}</h1>
        <p className="text-hall-dark/70 mb-1">{curso.subtitulo}</p>
        <p className="text-sm text-hall-dark/60 mb-10">Presenta: {curso.presenta}</p>

        {curso.extras.length > 0 && (
          <div className="mb-10 grid gap-5">
            {curso.extras.map((x) =>
              x.tipo === 'video' ? (
                <article key={x.url} className="bg-white rounded-lg border border-hall-navy/10 shadow-sm overflow-hidden">
                  <video src={`${x.url}#t=1`} controls preload="metadata" className="w-full bg-black aspect-video" />
                  <div className="p-5">
                    <h2 className="font-serif text-xl font-bold text-hall-navy">{x.titulo}</h2>
                    <p className="text-sm text-hall-dark/60">{x.nota}</p>
                  </div>
                </article>
              ) : (
                <div key={x.url} className="flex items-center justify-between gap-4 bg-white rounded-lg border border-hall-navy/10 p-5">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-hall-navy">{x.titulo}</h2>
                    <p className="text-sm text-hall-dark/60">{x.nota}</p>
                  </div>
                  <Boton href={x.url}>Abrir</Boton>
                </div>
              ),
            )}
          </div>
        )}

        <div className="grid gap-8">
          {curso.lecciones.map((l) => <Leccion key={l.n} l={l} />)}
        </div>
      </section>
    </>
  )
}
