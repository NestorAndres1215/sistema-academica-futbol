export interface Estudiante {
    codigoProfesor?: string;
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
    nacimiento: string;  // Puedes usar "string" para una fecha en formato ISO o LocalDate como string
    nacionalidad: string | null;
    perfil?: string | null;  // Puede ser nulo según tu lógica
    username: string;
    password: string;
    usuarioCreacion?: string;
    usuarioActualizacion?: string;
    sede: string;
    genero: string;
    tipoDoc?: string; // Tipo de documento (DNI, Pasaporte, etc.)
  }
  