// Arma la sala de avances (vista privada) a partir de la lista que vive en el
// repo privado de cursos: ../administracion/avances.json.
//
// Copia videos, PDF y ejercicios a avances-build/avances/ (ignorado por git) y
// escribe avances-build/avances/indice.json. Nada de esto entra al repo público
// ni a la publicación normal: solo se sube con `npm run avances` a un canal de
// vista previa de Firebase.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const taller = resolve(raiz, '..')
const lista = join(taller, 'administracion', 'avances.json')
const cursos = join(taller, 'cursos')
const salida = join(raiz, 'avances-build', 'avances')

if (!existsSync(lista)) {
  console.error(`No encuentro ${lista}. La sala de avances solo se arma desde el taller de cursos.`)
  process.exit(1)
}

const { cursos: lista_cursos } = JSON.parse(readFileSync(lista, 'utf8'))
rmSync(join(raiz, 'avances-build'), { recursive: true, force: true })

let faltan = 0
let bytes = 0
function copiar(origen, destinoRel) {
  const de = join(cursos, origen)
  if (!existsSync(de)) {
    console.warn(`  ⚠ falta: ${origen}`)
    faltan++
    return null
  }
  const a = join(salida, destinoRel)
  mkdirSync(dirname(a), { recursive: true })
  copyFileSync(de, a)
  bytes += statSync(de).size
  return `/avances/${destinoRel}`
}

const indice = {
  generado: new Date().toISOString(),
  cursos: lista_cursos.map((c) => {
    console.log(`• ${c.titulo}`)
    const extras = (c.extras ?? []).map((x, i) => {
      const ext = x.archivo.split('.').pop()
      return { ...x, url: copiar(x.archivo, `${c.id}/extra-${i + 1}.${ext}`) }
    }).filter((x) => x.url)
    const lecciones = c.lecciones.map((l) => {
      const base = `${c.id}/${l.n}`
      return {
        n: l.n,
        titulo: l.titulo,
        video: l.video ? { nota: l.video.nota, url: copiar(l.video.archivo, `${base}/video.mp4`) } : null,
        pdfCarta: l.pdfCarta ? copiar(l.pdfCarta, `${base}/guia-carta.pdf`) : null,
        pdfCelular: l.pdfCelular ? copiar(l.pdfCelular, `${base}/guia-celular.pdf`) : null,
        ejercicios: l.ejercicios ? copiar(l.ejercicios, `${base}/ejercicios.html`) : null,
      }
    })
    return { id: c.id, titulo: c.titulo, subtitulo: c.subtitulo, presenta: c.presenta, extras, lecciones }
  }),
}

mkdirSync(salida, { recursive: true })
writeFileSync(join(salida, 'indice.json'), JSON.stringify(indice, null, 2))
console.log(`\nListo: ${(bytes / 1e6).toFixed(1)} MB en avances-build/avances/${faltan ? ` (${faltan} archivos faltantes)` : ''}`)
