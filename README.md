# HALL Campus

Plataforma de cursos en línea de HALL: catálogo, registro de alumnos, lecciones (video, guía en PDF y ejercicios calificados) y certificados verificables.

Sitio: **https://campus.digitalhall.com.mx**

## Stack

- React + Vite + Tailwind CSS
- Firebase, proyecto **`biblioteca-digital-ub`**, compartido con la Biblioteca Digital (desde 2026-11-17) para que una sola cuenta sirva en los dos sitios:
  - **Hosting:** sitio `hall-campus` (https://hall-campus.web.app).
  - **Auth:** compartido con la biblioteca.
  - **Firestore y Storage:** Campus usará **su propia base de Firestore con nombre** y **su propio bucket**, cada uno con sus reglas.
  - ⚠️ **Nunca** desplegar desde este repo reglas a la base `(default)` ni al bucket por defecto: son de la biblioteca y se sobrescribirían.
  - El proyecto viejo `digitalhall-campus` queda en desuso.
- Rutas con `BrowserRouter` (Firebase Hosting reescribe todo a `index.html`)

## Desarrollo

```bash
npm install
npm run dev       # vista local en http://localhost:5173
npm run build     # genera dist/
npm run deploy    # build + publica en Firebase Hosting (requiere autorización)
```

### Sala de avances (vista privada)

`npm run avances` publica en un **canal de vista previa** de Firebase (dirección no listada, vence a los 30 días) lo más reciente de cada curso: videos, guías y ejercicios de prueba.
- Qué se muestra se decide en `../administracion/avances.json`, en el repo privado de cursos. Solo funciona desde el taller.
- El contenido se copia a `avances-build/`, que git ignora. **Nunca entra al repo público ni a la publicación normal.**
- En el sitio normal, `/avances` responde "no existe".

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
2. Catálogo y compra: el alumno ve la CLABE, el monto y una referencia única, y sube su comprobante en Campus. Al dueño le llega un aviso por WhatsApp; él revisa su banco y aprueba a mano en el panel (nunca se da acceso solo por recibir la imagen). Lección gratis programable.
3. Lección: video, PDF y ejercicios calificados en el servidor.
4. Certificado: emisión, folio y `/verificar`.
5. Pulido: correos con la marca, buscadores y enlace desde la biblioteca.

Todos los derechos reservados. Que el código sea visible no concede permiso para usarlo.
