// Sala de avances: vista privada para mostrar el trabajo de los cursos antes de
// abrirlos. Solo existe en el canal de vista previa "avances": ahí se sube
// /avances/indice.json junto con los archivos. En el sitio normal ese archivo no
// existe y esta página muestra "no existe".
//
// La página de cada curso es también el prototipo de la página de curso real.
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

// Celular = pantalla angosta. Decide qué versión del PDF se ofrece primero.
function useEsCelular() {
  const consulta = '(max-width: 767px)'
  const [celular, setCelular] = useState(() => window.matchMedia(consulta).matches)
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const cambio = () => setCelular(mq.matches)
    mq.addEventListener('change', cambio)
    return () => mq.removeEventListener('change', cambio)
  }, [])
  return celular
}

const ICONOS = {
  lecciones: 'M4 5h16M4 12h16M4 19h10',
  piezas: 'M4 6h11v12H4zM15 10l5-3v10l-5-3',
  ritmo: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
  nivel: 'M5 20v-5M12 20V9M19 20V4',
  aprobar: 'M5 13l4 4L19 7',
  examen: 'M8 4h8l3 3v13H5V4h3M9 12h6M9 16h4',
  certificado: 'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM9 14l-2 7 5-3 5 3-2-7',
  persona: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
}

function Icono({ nombre, className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={ICONOS[nombre]} />
    </svg>
  )
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

function Video({ url }) {
  return <video src={`${url}#t=1`} controls preload="metadata" className="w-full bg-black aspect-video" />
}

// Muestra un solo PDF: el de celular en pantallas angostas y el carta en la
// computadora. El otro queda como enlace pequeño, por si lo quieren.
function BotonesGuia({ carta, celular }) {
  const esCelular = useEsCelular()
  if (!carta && !celular) return null
  const principal = esCelular ? celular ?? carta : carta ?? celular
  const otro = principal === carta ? celular : carta
  return (
    <>
      <Boton href={principal}>Guía en PDF</Boton>
      {otro && (
        <a href={otro} target="_blank" rel="noreferrer" className="self-center text-xs text-hall-dark/60 underline hover:text-hall-gold">
          {otro === carta ? 'Versión para imprimir (carta)' : 'Versión para celular'}
        </a>
      )}
    </>
  )
}

function MuestraLeccion({ l }) {
  return (
    <div className="mt-4 rounded-lg overflow-hidden border border-hall-navy/10 bg-white">
      {l.video?.url && <Video url={l.video.url} />}
      <div className="p-4 sm:p-5">
        <p className="text-sm text-hall-dark/60 mb-3">{l.video?.nota ?? 'Video en producción'}</p>
        <div className="flex flex-wrap gap-3">
          {l.ejercicios && <Boton href={l.ejercicios} primario>Hacer los ejercicios</Boton>}
          <BotonesGuia carta={l.pdfCarta} celular={l.pdfCelular} />
        </div>
      </div>
    </div>
  )
}

function Temario({ curso, abrirPrimera }) {
  const muestras = Object.fromEntries(curso.lecciones.map((l) => [l.n, l]))
  const temario = curso.pagina?.temario ?? curso.lecciones.map((l) => ({ n: l.n, titulo: l.titulo, idea: '' }))
  return (
    <ol className="divide-y divide-hall-navy/10 border-y border-hall-navy/10">
      {temario.map((t) => {
        const muestra = muestras[t.n]
        const cabeza = (
          <div className="flex items-start gap-4 py-4">
            <span className="font-mono text-hall-gold text-sm pt-1 w-6 shrink-0">{t.n}</span>
            <div className="flex-1">
              <p className="font-semibold text-hall-navy">{t.titulo}</p>
              {t.idea && <p className="text-sm text-hall-dark/60">{t.idea}</p>}
            </div>
            {muestra ? (
              <span className="shrink-0 text-xs bg-hall-gold text-hall-navy font-semibold px-2 py-1 rounded">Ver avance</span>
            ) : (
              <span className="shrink-0 text-xs text-hall-dark/40 px-2 py-1">En preparación</span>
            )}
          </div>
        )
        return (
          <li key={t.n} id={`leccion-${t.n}`}>
            {muestra ? (
              <details open={abrirPrimera && t.n === '01'} className="group">
                <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">{cabeza}</summary>
                <div className="pb-6 pl-10">
                  <MuestraLeccion l={muestra} />
                </div>
              </details>
            ) : (
              cabeza
            )}
          </li>
        )
      })}
    </ol>
  )
}

function Ficha({ curso }) {
  const p = curso.pagina ?? {}
  const n = p.temario?.length ?? curso.lecciones.length
  const datos = [
    ['lecciones', `${n} lecciones`],
    ['piezas', 'Video, guía en PDF y ejercicios en cada lección'],
    ['ritmo', 'En línea y a tu ritmo'],
    p.nivel && ['nivel', `Nivel: ${p.nivel}`],
    ['aprobar', 'Se aprueba con 90 % en cada lección'],
    ['examen', 'Examen final abierto'],
    ['certificado', 'Certificado Hall con folio verificable'],
  ].filter(Boolean)
  return (
    <div className="bg-white rounded-lg border border-hall-navy/10 shadow-sm p-6">
      <button disabled className="w-full bg-hall-navy/80 text-white font-semibold py-3 rounded cursor-not-allowed">
        Inscripciones próximamente
      </button>
      <a href="#leccion-01" onClick={() => document.querySelector('#leccion-01 details')?.setAttribute('open', '')} className="block text-center mt-3 text-sm text-hall-navy underline hover:text-hall-gold">
        Ver la lección 1 de muestra
      </a>
      <ul className="mt-6 space-y-3 text-sm text-hall-dark/80">
        {datos.map(([icono, texto]) => (
          <li key={texto} className="flex items-start gap-3">
            <Icono nombre={icono} className="w-5 h-5 shrink-0 text-hall-gold" />
            <span>{texto}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-5 border-t border-hall-navy/10 flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-hall-cream text-hall-navy flex items-center justify-center">
          <Icono nombre="persona" />
        </span>
        <p className="text-sm">
          <span className="text-hall-dark/60">Presenta</span>
          <br />
          <span className="font-semibold text-hall-navy">{curso.presenta}</span>
        </p>
      </div>
    </div>
  )
}

function PaginaCurso({ curso }) {
  const p = curso.pagina ?? {}
  const trailer = curso.extras.find((x) => x.tipo === 'video')
  const avance = trailer ?? curso.lecciones.find((l) => l.video)?.video
  const recursos = curso.extras.filter((x) => x.tipo !== 'video')

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
      <nav className="text-sm text-hall-dark/60 mb-6">
        <Link to="/avances" className="hover:text-hall-gold">Avances</Link>
        <span className="mx-2">›</span>
        <span>{curso.titulo}</span>
      </nav>

      <div className="grid lg:grid-cols-[1fr_340px] gap-x-10 gap-y-8">
        {/* Encabezado y video */}
        <div className="lg:col-start-1 lg:row-start-1">
          {p.tipo && (
            <span className="inline-block text-xs font-semibold tracking-wide uppercase bg-hall-gold text-hall-navy px-3 py-1 rounded-full mb-4">
              {p.tipo}
            </span>
          )}
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-hall-navy leading-tight">{curso.titulo}</h1>
          <p className="text-lg text-hall-dark/70 mt-2">{curso.subtitulo}</p>
          <nav className="flex gap-6 mt-6 border-b border-hall-navy/10 text-sm">
            <a href="#informacion" className="pb-2 border-b-2 border-hall-navy text-hall-navy font-semibold">Información</a>
            <a href="#temario" className="pb-2 text-hall-dark/70 hover:text-hall-navy">Temario</a>
          </nav>
          <div className="mt-6 rounded-lg overflow-hidden shadow-md">
            {avance?.url ? (
              <Video url={avance.url} />
            ) : (
              <div className="aspect-video bg-hall-navy flex flex-col items-center justify-center text-center px-6">
                <img src="/logoHall.png" alt="" className="w-20 rounded mb-4" />
                <p className="font-serif text-white text-xl">Video de presentación en producción</p>
              </div>
            )}
          </div>
          {avance?.nota && <p className="text-xs text-hall-dark/50 mt-2">{avance.titulo ?? 'Avance'} · {avance.nota}</p>}
        </div>

        {/* Ficha lateral: en celular queda debajo del video */}
        <aside className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="lg:sticky lg:top-6">
            <Ficha curso={curso} />
          </div>
        </aside>

        {/* Información y temario */}
        <div className="lg:col-start-1 lg:row-start-2 space-y-12">
          <div id="informacion" className="scroll-mt-6">
            {p.lema && <h2 className="font-serif text-2xl sm:text-3xl font-bold text-hall-navy mb-4">{p.lema}</h2>}
            {p.descripcion && <p className="text-hall-dark/80 leading-relaxed">{p.descripcion}</p>}
          </div>

          {p.aprenderas?.length > 0 && (
            <div className="bg-white rounded-lg border border-hall-navy/10 p-6">
              <h2 className="font-serif text-2xl font-bold text-hall-navy mb-4">Lo que aprenderás</h2>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {p.aprenderas.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-hall-dark/80">
                    <Icono nombre="aprobar" className="w-5 h-5 shrink-0 text-hall-gold mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {p.paraQuien && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-hall-navy mb-3">Para quién es</h2>
              <p className="text-hall-dark/80 leading-relaxed">{p.paraQuien}</p>
            </div>
          )}

          <div id="temario" className="scroll-mt-6">
            <h2 className="font-serif text-2xl font-bold text-hall-navy mb-1">Temario</h2>
            <p className="text-sm text-hall-dark/60 mb-4">Toca una lección con avance para ver su video, su guía y sus ejercicios.</p>
            <Temario curso={curso} abrirPrimera={Boolean(trailer)} />
          </div>

          {recursos.length > 0 && (
            <div>
              <h2 className="font-serif text-2xl font-bold text-hall-navy mb-4">Recursos</h2>
              <div className="grid gap-3">
                {recursos.map((x) => (
                  <div key={x.url} className="flex items-center justify-between gap-4 bg-white rounded-lg border border-hall-navy/10 p-5">
                    <div>
                      <p className="font-semibold text-hall-navy">{x.titulo}</p>
                      <p className="text-sm text-hall-dark/60">{x.nota}</p>
                    </div>
                    <Boton href={x.url}>Abrir</Boton>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Avances() {
  const { curso: cursoId } = useParams()
  const { cargando, indice } = useIndice()

  if (cargando) return <p className="text-center py-24 text-hall-dark/60">Cargando…</p>
  if (!indice) return <NoEncontrado />

  const curso = cursoId && indice.cursos.find((c) => c.id === cursoId)
  if (cursoId && !curso) return <NoEncontrado />

  if (curso) {
    return (
      <>
        <Aviso />
        <PaginaCurso curso={curso} />
      </>
    )
  }

  return (
    <>
      <Aviso />
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold text-hall-navy mb-2">Avances de los cursos</h1>
        <p className="text-hall-dark/70 mb-10">Lo más reciente de cada curso. Toca uno para ver su página.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {indice.cursos.map((c) => (
            <Link
              key={c.id}
              to={`/avances/${c.id}`}
              className="flex flex-col bg-white rounded-lg border border-hall-navy/10 shadow-sm p-6 hover:border-hall-gold hover:shadow-md transition-all"
            >
              {c.pagina?.tipo && <p className="text-xs tracking-widest uppercase text-hall-gold font-semibold mb-2">{c.pagina.tipo}</p>}
              <h2 className="font-serif text-2xl font-bold text-hall-navy mb-1">{c.titulo}</h2>
              <p className="text-hall-dark/70 mb-4 flex-1">{c.pagina?.lema ?? c.subtitulo}</p>
              <p className="text-sm text-hall-dark/60">Presenta: {c.presenta}</p>
              <p className="text-sm text-hall-gold font-semibold mt-3">
                {c.lecciones.length} de {c.pagina?.temario?.length ?? c.lecciones.length} lecciones con avance →
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
