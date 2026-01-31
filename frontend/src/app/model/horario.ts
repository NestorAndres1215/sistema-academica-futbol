export interface Horario {
    codigo?: string;
    inicioHora: string;
    finHora: string;

    estado?: boolean;
    usuarioRegistro?: string;
    fechaCreacion?:string;
    horaCreacion?: string;
    usuarioActualizacion?: string;
    fechaActualizacion?: Date;
    horaActualizacion?: string;
  }
  