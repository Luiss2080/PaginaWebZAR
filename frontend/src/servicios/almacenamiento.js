export function leer(clave, porDefecto) {
  try {
    const valor = window.localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : porDefecto;
  } catch {
    return porDefecto;
  }
}

export function guardar(clave, valor) {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    /* almacenamiento no disponible: el estado vive solo en memoria */
  }
}
