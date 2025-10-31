export interface Admin {
    codigoUsuario?:string;
    codigoAdmin?:string
    primerNombre: string;
    segundoNombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    telefono: string;
    dni: string;
    direccion: string;
    nacionalidad: string;
    username: string;
    password: string;
    fechaNacimiento: Date;
    edad: string;
    usuarioCreacion?: string;
    usuarioActualizacion?: String
}