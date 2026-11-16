# HALL Campus

Plataforma de cursos en línea de HALL: catálogo, registro de alumnos, lecciones (video, guía en PDF y ejercicios calificados) y certificados verificables.

Sitio: **https://campus.digitalhall.com.mx**

## Stack

- React + Vite + Tailwind CSS
- Firebase: Hosting (ya activo); Auth, Firestore, Storage y Cloud Functions en etapas siguientes
- Rutas con `BrowserRouter` (Firebase Hosting reescribe todo a `index.html`)

## Desarrollo

```bash
npm install
npm run dev       # vista local en http://localhost:5173
npm run build     # genera dist/
npm run deploy    # build + publica en Firebase Hosting (requiere autorización)
```

## Dónde se cambia qué

| Qué | Archivo |
|---|---|
| Nombre de la marca, lema, logo | `src/config/marca.js` |
| Catálogo provisional (hasta pasar a Firestore) | `src/config/catalogo.js` |
| Colores | `tailwind.config.js` (los mismos de la Biblioteca Digital) |

## Reglas del repo

- Este repo es **público**: solo lleva código.
- **Nunca** subir contenido de pago, respuestas de ejercicios, datos de alumnos ni claves. Eso vive en Firestore y Storage, protegido por reglas.
- Ningún commit ni publicación sin autorización del dueño.

## Etapas

0. **Base**: portada y publicación. ← actual
1. Cuentas: registro, aviso de privacidad, permiso de tutor, "Mi cuenta".
2. Catálogo y compra: comprobante de depósito, panel de aprobación, lección gratis programable.
3. Lección: video, PDF y ejercicios calificados en el servidor.
4. Certificado: emisión, folio y `/verificar`.
5. Pulido: correos con la marca, buscadores y enlace desde la biblioteca.

Todos los derechos reservados. Que el código sea visible no concede permiso para usarlo.
