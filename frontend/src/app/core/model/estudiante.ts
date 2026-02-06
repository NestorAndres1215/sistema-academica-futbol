export interface Estudiante {
  codigoEstudiante?: string;
  codigoUsuario?: string;
  primerNombre: string;
  segundoNombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  telefono: string;
  dni: string;
  direccion: string;
  correo: string;
  edad: string;
  nacimiento: string;
  nacionalidad: string | null;
  perfil?: string | null;
  username: string;
  password: string;
  usuarioCreacion?: string;
  usuarioActualizacion?: string;
  sede: string;
  genero: string;
  tipoDoc?: string;
}
