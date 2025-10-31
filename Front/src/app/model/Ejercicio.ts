export interface Ejercicio {
    codigo?: string;  
    nombre: string;  
    duracion: string;  
    descripcion: string;  
    tipo: string;  
    intensidad: string;  
    usuarioCreacion?: string;
    fechaCreacion?:string;
    horaCreacion?: string;
    usuarioActualizacion?: string;
    fechaActualizacion?: Date;
    horaActualizacion?: string;
    clase:string
}
