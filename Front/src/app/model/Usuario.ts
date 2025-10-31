export interface Usuario {
    us_codigo: string;             // Código único del usuario
    us_usuario: string;            // Nombre completo del usuario
    us_correo: string;             // Correo electrónico único
    us_contra: string;             // Contraseña encriptada
    us_estado: boolean;            // Estado del usuario (TRUE para activo, FALSE para inactivo)
    us_fechacreacion?: Date;      // Fecha de creación del usuario
    us_horacreacion?: string;     // Hora de creación
    us_fechaactualizacion?: Date; // Fecha de última actualización
    us_horaactualizacion?: string; // Hora de última actualización
    us_rol: string;               // Relación con la tabla rol (clave foránea)
  }
  