import { MARCA } from '../config/marca.js'
import { LINEAS, ESTADOS } from '../config/catalogo.js'

const PASOS = [
  { n: '01', titulo: 'Aprende', texto: 'Videos cortos que explican cada tema paso a paso.' },
  { n: '02', titulo: 'Repasa', texto: 'Una guía en PDF por lección, para leer y tener a la mano.' },
  { n: '03', titulo: 'Practica', texto: 'Ejercicios que se califican al momento. Siempre hay otros nuevos para seguir practicando.' },
  { n: '04', titulo: 'Certifícate', texto: 'Al aprobar todas las lecciones recibes tu certificado con folio verificable.' },
]

const etiquetaEstado = (estado) =>
  estado === 'proximamente'
    ? 'bg-hall-gold text-hall-navy'
    : 'border border-hall-navy/20 text-hall-navy/60'

export default function Inicio() {
  return (
    <>
      {/* Portada */}
      <section className="bg-hall-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 grid md:grid-cols-[1fr_auto] items-center gap-10">
          <div>
            <p className="text-hall-gold text-xs tracking-[0.3em] uppercase mb-4">{MARCA.nombreCompleto}</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight mb-5">
              {MARCA.lema}
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mb-8">
              Cursos en línea para aprender a tu ritmo: video, guía y ejercicios que se califican
              al momento. Al terminar, un certificado que cualquiera puede verificar.
            </p>
            <a
              href="#rutas"
              className="inline-block bg-hall-gold text-hall-navy font-semibold px-6 py-3 rounded hover:brightness-110 transition-all"
            >
              Ver cursos
            </a>
          </div>
          <img src={MARCA.logo} alt="" className="hidden md:block w-56 rounded-lg shadow-2xl" />
        </div>
      </section>

      {/* Catálogo */}
      {LINEAS.map((linea) => (
        <section key={linea.id} id={linea.id} className="max-w-6xl mx-auto px-4 py-16 scroll-mt-4">
          <h2 className="font-serif text-3xl font-bold text-hall-navy mb-2">{linea.titulo}</h2>
          <p className="text-hall-dark/70 mb-8 max-w-2xl">{linea.descripcion}</p>

          {linea.cursos.map((curso) => (
            <article key={curso.id} className="bg-white rounded-lg border border-hall-navy/10 shadow-sm p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-bold text-hall-navy mb-1">{curso.titulo}</h3>
              <p className="text-hall-dark/70 mb-6">{curso.publico}</p>
              <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {curso.niveles.map((nivel) => (
                  <li key={nivel.n} className="rounded-md bg-hall-cream/60 border border-hall-navy/10 p-4 flex flex-col">
                    <p className="text-xs tracking-widest uppercase text-hall-gold font-semibold mb-1">Nivel {nivel.n}</p>
                    <p className="font-semibold text-hall-navy flex-1 mb-3">{nivel.titulo}</p>
                    <span className={`self-start text-xs px-2 py-1 rounded ${etiquetaEstado(nivel.estado)}`}>
                      {ESTADOS[nivel.estado]}
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </section>
      ))}

      {/* Cómo funciona */}
      <section id="como-funciona" className="bg-white border-y border-hall-navy/10 scroll-mt-4">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="font-serif text-3xl font-bold text-hall-navy mb-10">Cómo funciona cada lección</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PASOS.map((p) => (
              <div key={p.n}>
                <p className="font-mono text-hall-gold text-sm tracking-widest mb-2">{p.n}</p>
                <h3 className="font-serif text-xl font-bold text-hall-navy mb-2">{p.titulo}</h3>
                <p className="text-hall-dark/70">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
