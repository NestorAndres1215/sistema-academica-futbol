export interface Partido {
    codigo: string;
    marcadorLocal?: string;
    equipoRival: string;
    fecha: Date;  // Se usa string porque en JSON las fechas suelen manejarse como ISO strings
    hora: string;   // También string para compatibilidad con formularios y JSON
    lugar: string;
    tipoPartido: string;
    comentarios?: string;
    usuarioCreacion?: string;
    usuarioActualizacion?: string;
    derrota?: string;
    victoria?: string;
    marcadorVisita?: string;
    equipo: string;

}
