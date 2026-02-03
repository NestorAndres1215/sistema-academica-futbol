export function formatearHora(hora: string): string {
  return hora ? hora.substring(0, 5) : '';
}

export function calcularEdad(fechaNacimiento: string | Date): number {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function edadNacimiento(fechaNacimiento: string | Date): string {
  if (!fechaNacimiento) {
    return 'Por favor, ingresa una fecha de nacimiento válida.';
  }

  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);

  if (isNaN(nacimiento.getTime())) {
    return 'Por favor, ingresa una fecha de nacimiento válida.';
  }

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiferencia = hoy.getMonth() - nacimiento.getMonth();

  if (
    mesDiferencia < 0 ||
    (mesDiferencia === 0 && hoy.getDate() < nacimiento.getDate())
  ) {
    edad--;
  }

  return `${edad}`;
}
