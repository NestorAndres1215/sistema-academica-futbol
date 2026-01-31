export interface Lesion {
    codigo?: string;
    tipoLesion: string;
    fechaLesion: Date;
    gravedad: string;
    tiempoRecuperacion: number;
    comentarios: string;
    usuarioRegistro?: string;
    usuarioActualizacion?: string;
    fechaRecuperacion: Date;
    descripcion: string;
    estudiante: string;
    equipo:string;
}
