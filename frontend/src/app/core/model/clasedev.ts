export interface ClaseDev {
    codigo?: string;
    titulo:string;
    descripcion  :string;
    objetivo:string;
    dia:string
    clase: string;
    estado?: boolean;
    usuarioCreacion?: string;
    fechaCreacion?: string;
    horaCreacion?: string;
    usuarioActualizacion?: string;
    fechaActualizacion?: Date;
    horaActualizacion?: string;
}
