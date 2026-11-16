// Catálogo provisional (etapa 0). En la etapa 2 se mueve a Firestore.
//
// Campus gobierna todo. Los cursos se agrupan en "líneas":
//   - rutas: programas completos de varios niveles, cada nivel con su certificado.
//   - cursos cortos: temas sencillos de una sola pieza (nombre de la línea por decidir).
export const LINEAS = [
  {
    id: 'rutas',
    titulo: 'Rutas de aprendizaje',
    descripcion: 'Programas completos por niveles. Cada nivel se compra por separado y tiene su propio certificado.',
    cursos: [
      {
        id: 'logica-programacion',
        titulo: 'Ruta de Lógica de Programación',
        publico: 'Para estudiantes de prepa y universidad que empiezan a programar.',
        niveles: [
          { n: 1, titulo: 'Lógica y razonamiento', estado: 'proximamente' },
          { n: 2, titulo: 'Algoritmos y resolución de problemas', estado: 'planeado' },
          { n: 3, titulo: 'Pseudocódigo y diagramas de flujo', estado: 'planeado' },
          { n: 4, titulo: 'Programación en Python y depuración', estado: 'planeado' },
        ],
      },
    ],
  },
]

export const ESTADOS = {
  disponible: 'Disponible',
  proximamente: 'Próximamente',
  planeado: 'En preparación',
}
