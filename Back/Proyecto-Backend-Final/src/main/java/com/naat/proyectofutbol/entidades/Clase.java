package com.naat.proyectofutbol.entidades;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "clase")
public class Clase {

    @Id
    @Column(name = "cl_codigo")
    private String codigo;

    @Column(name = "cl_nombre")
    private String nombre;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cl_equipo", referencedColumnName = "eq_codigo")
    private Equipo equipo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cl_horario", referencedColumnName = "hor_codigo")
    private Horario horario;

    @Column(name = "cl_estado")
    private boolean estado;  // Mapping tinyint(1) to boolean

    @Column(name = "cl_usuariocreacion")
    private String usuarioCreacion;

    @Column(name = "cl_usuarioactualizacion")
    private String usuarioActualizacion;

    @Column(name = "cl_fechacreacion")
    private LocalDate fechaCreacion;

    @Column(name = "cl_horacreacion")
    private LocalTime horaCreacion;

    @Column(name = "cl_fechaactualizacion")
    private LocalDate fechaActualizacion;

    @Column(name = "cl_horaactualizacion")
    private LocalTime horaActualizacion;

    @Column(name = "cl_inicio")
    private LocalDate inicio;
    @Column(name = "cl_dia")
    private String dia;
    @Column(name = "cl_fin")
    private LocalDate fin;
    @Column(name = "cl_descripcion")
    private String descripcion;
    public Clase() {
    }


    @Override
    public String toString() {
        return "Clase{" +
                "codigo='" + codigo + '\'' +
                ", nombre='" + nombre + '\'' +
                ", equipo=" + equipo +
                ", horario=" + horario +
                ", estado=" + estado +
                ", usuarioCreacion='" + usuarioCreacion + '\'' +
                ", usuarioActualizacion='" + usuarioActualizacion + '\'' +
                ", fechaCreacion=" + fechaCreacion +
                ", horaCreacion=" + horaCreacion +
                ", fechaActualizacion=" + fechaActualizacion +
                ", horaActualizacion=" + horaActualizacion +
                ", inicio=" + inicio +
                ", fin=" + fin +
                '}';
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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

    public Horario getHorario() {
        return horario;
    }

    public void setHorario(String codigo) {
        if (codigo != null) {
            Horario horario1 = new Horario();
            horario1.setCodigo(codigo);
            this.horario =horario1 ;

        }
    }
    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

    public String getUsuarioCreacion() {
        return usuarioCreacion;
    }

    public void setUsuarioCreacion(String usuarioCreacion) {
        this.usuarioCreacion = usuarioCreacion;
    }

    public String getUsuarioActualizacion() {
        return usuarioActualizacion;
    }

    public void setUsuarioActualizacion(String usuarioActualizacion) {
        this.usuarioActualizacion = usuarioActualizacion;
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

    public LocalDate getInicio() {
        return inicio;
    }

    public void setInicio(LocalDate inicio) {
        this.inicio = inicio;
    }

    public LocalDate getFin() {
        return fin;
    }

    public void setFin(LocalDate fin) {
        this.fin = fin;
    }
}
