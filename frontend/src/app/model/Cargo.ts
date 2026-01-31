export interface Cargo {
    codigo?: string;  // Identificador único del cargo (Primary Key)
    nombre: string; 
    descripcion: string,

    estado?: boolean;
    usuarioCreacion?: string;
    fechaCreacion?:string;
    horaCreacion?: string;
    usuarioActualizacion?: string;
    fechaActualizacion?: Date;
    horaActualizacion?: string;
  }
  