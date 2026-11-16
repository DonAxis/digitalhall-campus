// Nombre y textos de la marca. El nombre definitivo aún no está decidido:
// cuando se elija, se cambia SOLO aquí y se actualiza en todo el sitio.
export const MARCA = {
  nombre: 'HALL',
  plataforma: 'Campus',
  get nombreCompleto() {
    return `${this.nombre} ${this.plataforma}`
  },
  lema: 'Tu sala de estudio digital',
  logo: '/logoHall.png',
  biblioteca: 'https://digitalhall.com.mx',
}
