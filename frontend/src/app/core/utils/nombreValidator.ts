export function NombreCompleto(item: any): string {
    return [item.primerNombre, item.segundoNombre, item.apellidoPaterno, item.apellidoMaterno]
      .filter(Boolean)
      .join(' ');
  }