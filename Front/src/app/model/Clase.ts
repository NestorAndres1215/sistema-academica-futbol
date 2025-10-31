export interface Clase {
    codigo?: string; 
    nombre: string;
    equipo: string;
    horario:string;
    dia:string;
    inicio: Date;
    fin: Date;
    descripcion?:string;
    estado?: boolean;
    usuarioCreacion?: string;
    fechaCreacion?:string;
    horaCreacion?: string;
    usuarioActualizacion?: string;
    fechaActualizacion?: Date;
    horaActualizacion?: string;
  }
  