export interface Equipo {
    codigo?: string;
    nombre: string;
    categoria: string;
    sede: string;
    genero?: string;
    estado?: boolean;
    fechaCreacion?: string; // Fecha en formato ISO (YYYY-MM-DD)
    horaCreacion?: string;  // Hora en formato ISO (HH:mm:ss.SSS)
    fechaActualizacion?: string | null;
    horaActualizacion?: string | null;
    usuarioRegistro?: string;
    usuarioActualizacion?: string | null;
    equipoDev?: string | null;
  }
  