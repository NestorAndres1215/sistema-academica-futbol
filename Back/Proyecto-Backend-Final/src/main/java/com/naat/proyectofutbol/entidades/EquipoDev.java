package com.naat.proyectofutbol.entidades;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "equipodev")
public class EquipoDev {

    @Id
    @Column(name = "ed_codigo")
    private String codigo;
    @Column(name = "ed_numero_camiseta")
    private int numeroCamiseta;

    @Column(name = "ed_posicion")
    private String posicion;

    @Column(name = "ed_capitan")
    private boolean esCapitan;

    @Column(name = "ed_comentarios")
    private String comentarios;

    @Column(name = "ed_estado")
    private boolean estado;

    @Column(name = "ed_fecha_creacion")
    private LocalDate fechaCreacion;

    @Column(name = "ed_hora_creacion")
    private LocalTime horaCreacion;

    @Column(name = "ed_fecha_actualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "ed_hora_actualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "ed_usuario_registro")
    private String usuarioRegistro;

    @Column(name = "ed_usuario_actualizacion", length = 255)
    private String usuarioActualizacion;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ed_entrenador", referencedColumnName = "pr_codigo")
    private Profesor profesor; // Relación con la tabla Profesor

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ed_estudiante", referencedColumnName = "es_codigo")
    private Estudiante estudiante; // Relación con la tabla Estudiante

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ed_equipo", referencedColumnName = "eq_codigo")
    private Equipo equipo; // Relación con la tabla Estudiante

    public EquipoDev(Equipo equipo, Estudiante estudiante, Profesor profesor, String usuarioActualizacion, String usuarioRegistro, LocalTime horaActualizacion, LocalDate fechaActualizacion, LocalTime horaCreacion, LocalDate fechaCreacion, boolean estado, String comentarios, boolean esCapitan, String posicion, int numeroCamiseta, String codigo) {
        this.equipo = equipo;
        this.estudiante = estudiante;
        this.profesor = profesor;
        this.usuarioActualizacion = usuarioActualizacion;
        this.usuarioRegistro = usuarioRegistro;
        this.horaActualizacion = horaActualizacion;
        this.fechaActualizacion = fechaActualizacion;
        this.horaCreacion = horaCreacion;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.comentarios = comentarios;
        this.esCapitan = esCapitan;
        this.posicion = posicion;
        this.numeroCamiseta = numeroCamiseta;
        this.codigo = codigo;
    }

    public EquipoDev() {
    }

    @Override
    public String toString() {
        return "EquipoDev{" +
                "codigo='" + codigo + '\'' +
                ", numeroCamiseta=" + numeroCamiseta +
                ", posicion='" + posicion + '\'' +
                ", esCapitan=" + esCapitan +
                ", comentarios='" + comentarios + '\'' +
                ", estado=" + estado +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", usuarioRegistro='" + usuarioRegistro + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", profesor=" + profesor +
                ", estudiante=" + estudiante +
                ", equipo=" + equipo +
                '}';
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public int getNumeroCamiseta() {
        return numeroCamiseta;
    }

    public void setNumeroCamiseta(int numeroCamiseta) {
        this.numeroCamiseta = numeroCamiseta;
    }

    public String getPosicion() {
        return posicion;
    }

    public void setPosicion(String posicion) {
        this.posicion = posicion;
    }

    public boolean isEsCapitan() {
        return esCapitan;
    }

    public void setEsCapitan(boolean esCapitan) {
        this.esCapitan = esCapitan;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalTime getHoraCreacion() {
        return horaCreacion;
    }

    public void setHoraCreacion(LocalTime horaCreacion) {
        this.horaCreacion = horaCreacion;
    }

    public LocalDate getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDate fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public LocalTime getHoraActualizacion() {
        return horaActualizacion;
    }

    public void setHoraActualizacion(LocalTime horaActualizacion) {
        this.horaActualizacion = horaActualizacion;
    }

    public String getUsuarioRegistro() {
        return usuarioRegistro;
    }

    public void setUsuarioRegistro(String usuarioRegistro) {
        this.usuarioRegistro = usuarioRegistro;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
    }

    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(String codigo) {
        if (codigo != null) {
            Profesor profesor = new Profesor();
            profesor.setCodigo(codigo);
            this.profesor = profesor;

        }
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(String codigo) {
        if (codigo != null) {
            Estudiante estudiante = new Estudiante();
            estudiante.setCodigo(codigo);
            this.estudiante = estudiante;

        }
    }

    public Equipo getEquipo() {
        return equipo;
    }

    public void setEquipo(String codigo) {
        if (codigo != null) {
            Equipo equipo1 = new Equipo();
            equipo1.setCodigo(codigo);
            this.equipo = equipo1;

        }
    }
}
