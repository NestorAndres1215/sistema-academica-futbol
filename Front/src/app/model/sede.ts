export interface Sede {
    codigo?: string;
    nombre: string;
    direccion: string;
    telefono: string;
    estado?: boolean;
    usuarioCreacion?: string;
    fechaCreacion?:string;
    horaCreacion?: string;
    usuarioActualizacion?: string;
    fechaActualizacion?: Date;
    horaActualizacion?: string;
  }
  