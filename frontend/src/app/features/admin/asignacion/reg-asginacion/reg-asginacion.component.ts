import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CARGOS } from 'src/app/core/constants/cargo';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { CATEGORIAS_EQUIPO } from 'src/app/core/constants/posiciones';
import { CODIGO_ROLE_USER } from 'src/app/core/constants/usuario';
import { Asignacion } from 'src/app/core/model/Asignacion';
import { AlertService } from 'src/app/core/services/alert.service';
import { EquipoService } from 'src/app/core/services/equipo.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { GeneralService } from 'src/app/core/services/general.service';

import { ProfesorService } from 'src/app/core/services/profesor.service';
import { SedeService } from 'src/app/core/services/sede.service';

@Component({
  selector: 'app-reg-asginacion',
  templateUrl: './reg-asginacion.component.html',
  styleUrls: ['./reg-asginacion.component.css']
})
export class RegAsginacionComponent implements OnInit {
  botonesConfigTableEstudiante = {
    cancelar: true,

  };
  botonesConfigTableProfesor = {
    cancelar: true,

  };
  columnasEstudiantes = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Nombre', clave: 'nombre' },

  ];
  columnasProfesor = [
    { etiqueta: 'Código', clave: 'codigo' },
    { etiqueta: 'Nombre', clave: 'nombre' },

  ];
  limpiar() {
    this.formulario.reset();
    this.nombreEquipo = ""
    this.estudiantes = [];
    this.profesores = [];
    this.formulario1.reset()
    this.categoriaSeleccionada = '';
    this.sedeSeleccionada = '';
    this.generoSeleccionado = '';
    this.formulario.enable();
    this.cargos = CARGOS;
  }

  botonesConfig = {
    editar: false,
    volver: true,

  };
  personas: any[] = [];
  personas1: any[] = [];

  formulario: UntypedFormGroup; 
  formulario1: UntypedFormGroup;
  constructor(private generales: GeneralService,
    private sede: SedeService,
    private router: Router,
    private profesor: ProfesorService,
    private equipoService: EquipoService,
    private estudiante: EstudianteService,
    private formBuilder: UntypedFormBuilder,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.fomrulario2()
    this.listaCategoria();
    this.listarDev()
    this.listaGenero();
    this.listarSede();
    this.listaPosicion()
    this.listarEquipo()
    this.formulario.get('sede')?.valueChanges.subscribe((value) => {
      const selectedSede = this.sedes.find((sede) => sede.codigo === value);
      this.formulario1.get('sede')?.setValue(selectedSede?.nombre || '');
    });

  }
  mostrarFormularioDetalle: boolean = false;

  onEquipoSeleccionado(equipo: any): void {
    if (equipo) {
      this.categoriaSeleccionada = equipo.categoria;
      this.sedeSeleccionada = equipo.sede;
      this.generoSeleccionado = equipo.genero;

      this.formulario.patchValue({
        categoria: equipo.categoria,
        sede: equipo.sede,
        genero: equipo.genero
      });
    }
  }

  categoriaSeleccionada: string = '';
  sedeSeleccionada: string = '';
  generoSeleccionado: string = '';
  sedes: any
  genero: any
  datosTabla: any[] = [];
  posiciones: any[] = [];
  listarcategoria: any[] = [];
  roles: string[] = ['Estudiante', 'Profesor'];
  rolSeleccionado: string = 'Estudiante';
  mostrarCamposEstudiante: boolean = true;
  estudiantes: any[] = [];
  profesores: any[] = [];
  cargos = CARGOS;
  isFormEnabled = false;
  nombreEquipo: string
  estu: any[] = [];
  listarEstu: any[] = [];
  listarProfe: any[] = [];
  cantidadPorfesores: any[] = [];
  profesoresActuales: any[] = [];
  estudianteActuales: any[] = [];
  yaEstudianteRegistrado = false;
  profe: any
  listaAsignaciones: any[] = [];

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      sede: [this.sedes, Validators.required],
      genero: [this.genero, Validators.required],
      categoria: ['', Validators.required],
    });
  }

  fomrulario2() {
    this.formulario1 = this.formBuilder.group({
      rol: ['Estudiante', Validators.required],
      estudiante: [''],
      profesor: [''],
      cargo: [''],
    })
  }

  async listarSede() {
    this.sede.listarSedeActivado().subscribe((data) => {
      this.sedes = data;
    })
  }

  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      this.genero = data;
    })
  }

  async listaPosicion() {
    this.generales.listarGeneralDevActivado("0005").subscribe((data) => {
      this.posiciones = data;
    })
  }

  async listaCategoria() {
    this.generales.listarGeneralDevActivado("0004").subscribe((data) => {
      this.listarcategoria = data;
    })
  }

  cambiarRol() {
    const rol = this.formulario1.get('rol')?.value;
    if (rol === CODIGO_ROLE_USER.PROFESOR) {
      this.formulario1.patchValue({
        capitan: '',
        numeroCamiseta: '',
        posicion: ''
      });
    }
  }

  operar() {

    if (!this.formulario.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }

    this.personas.push(this.formulario.value);
    const result = this.cantidadPorfesores.filter(i => i.equipo.codigo === this.formulario.value.nombre.codigo);

    if (result.length > 2) {

      this.formulario1.get('profesor')?.disable();
      this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.CUPOS_PROFESORES_LLENO_MENSAJE)
      this.mostrarFormularioDetalle = true;
      this.isFormEnabled = true;
      this.formulario1.get('rol')?.enable();
      this.formulario1.get('estudiante')?.enable();
      this.formulario1.get('cargo')?.disable();
      this.listarEstudiante()
      this.listarProfesor()
      this.formulario.disable();
    } else {
      this.mostrarFormularioDetalle = true;
      this.isFormEnabled = true;
      this.formulario1.get('rol')?.enable();
      this.formulario1.get('estudiante')?.enable();
      this.formulario1.get('profesor')?.enable();
      this.listarEstudiante()
      this.listarProfesor()
      this.formulario.disable();
      this.nombreEquipo = this.formulario.get('nombre')?.value;
    }
  }

  filtrarProfesoresPorCargo() {
    const cargoSeleccionado = this.formulario1.get('cargo')?.value;
    if (cargoSeleccionado) {
      this.listarProfe = this.profe.filter(item => item.cargo.nombre === cargoSeleccionado);
    }
  }

  async listarProfesor() {
    const sedeSeleccionada = this.formulario.get('sede')?.value;

    this.profesor.listarProfesorActivado().subscribe((data: any[]) => {
      data = data.filter(item => item.codigo !== '0000')
      this.listarProfe = data.filter(estudiante =>
        estudiante.sede.nombre === sedeSeleccionada
      );
      this.profe = data.filter(estudiante =>
        estudiante.sede.nombre === sedeSeleccionada
      );

      const xd = this.cantidadPorfesores.filter(i => i.equipo.codigo === this.formulario.value.nombre.codigo);
      const nombresCargos = xd.map(i => i.profesor.cargo.nombre).join(', ');
      this.cargos = this.cargos.filter(cargo => !nombresCargos.includes(cargo));

    });
  }

  async listarEstudiante() {

    const sedeSeleccionada = this.formulario.get('sede')?.value;
    const generoSeleccionado = this.formulario.get('genero')?.value;
    const categoriaSeleccionada = this.formulario.get('categoria')?.value;
    this.estudiante.listarEstudianteActivado().subscribe((data: any[]) => {

      data = data.filter(item => item.codigo !== '0000' && !this.estudianteActuales.includes(item.codigo));
      this.estu = this.listarEstu = data.filter(estudiante =>
        estudiante.sede.nombre === sedeSeleccionada &&
        estudiante.genero === generoSeleccionado &&
        (
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_8 && (estudiante.edad === 7 || estudiante.edad === 8)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_10 && (estudiante.edad === 9 || estudiante.edad === 10)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_12 && (estudiante.edad === 11 || estudiante.edad === 12)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_16 && (estudiante.edad >= 13 && estudiante.edad <= 16)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_19 && (estudiante.edad >= 17 && estudiante.edad <= 19))
        )
      );
      this.listarEstu = data.filter(estudiante =>
        estudiante.sede.nombre === sedeSeleccionada &&
        estudiante.genero === generoSeleccionado &&
        (
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_8 && (estudiante.edad === 7 || estudiante.edad === 8)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_10 && (estudiante.edad === 9 || estudiante.edad === 10)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_12 && (estudiante.edad === 11 || estudiante.edad === 12)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_16 && (estudiante.edad >= 13 && estudiante.edad <= 16)) ||
          (categoriaSeleccionada === CATEGORIAS_EQUIPO.SUB_19 && (estudiante.edad >= 17 && estudiante.edad <= 19))
        )
      );
    });
  }


  async listarDev() {
    this.equipoService.listarAsignacion().subscribe((data: any[]) => {
      this.cantidadPorfesores = data.filter(item => item.profesor.codigo !== "0000");
      this.profesoresActuales = data.map(item => item.profesor.codigo).filter(codigo => codigo !== '0000');
      this.estudianteActuales = data.map(item => item.estudiante.codigo).filter(codigo => codigo !== '0000');  // Filtrar los códigos que no sean '0000'
    })
  }

  async listarEquipo() {
    this.equipoService.listarActivado().subscribe((data) => {
      this.datosTabla = data;
    });
  }

  eliminarEstudiante(estudianteEliminado: any): void {
    if (!estudianteEliminado) return;

    const primerNombreEliminado = estudianteEliminado.nombre.split(' ')[0];
    this.estudiantes = this.estudiantes.filter(e => e !== estudianteEliminado);
    const estudianteExistente = this.estu.find(e => e.primerNombre === primerNombreEliminado);

    if (estudianteExistente) {
      this.listarEstu.push(estudianteExistente);
      this.listarEstu = [...this.listarEstu];
    }

  }

  eliminarProfesor(profesorEliminado: any): void {
    if (!profesorEliminado) return;

    const primerNombreEliminado = profesorEliminado.nombre.split(' ')[0];
    this.profesores = this.profesores.filter(p => p !== profesorEliminado);
    const profesorExistente = this.profe.find(e => e.primerNombre === primerNombreEliminado);

    if (profesorExistente) {
      this.listarProfe.push(profesorExistente);
      this.cargos.push(profesorEliminado.cargo);
      this.cargos = [...new Set(this.cargos)];
      this.listarProfe = [...this.listarProfe];
    }
  }

  registrar() {

    const nombreEquipo = this.formulario.get('nombre')?.value;
    if (!nombreEquipo) {
      return this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.SELECCIONAR_EQUIPO)
    }

    if (this.formulario1.valid) {
      const rolSeleccionado = this.formulario1.get('rol')?.value;
      const cargoSeleccionado = this.formulario1.get('cargo')?.value;


      if (this.profesores.length >= 2) {
        this.formulario1.get('cargo')?.disable();
        this.formulario1.get('profesor')?.disable();

      }

      if (rolSeleccionado === CODIGO_ROLE_USER.ESTUDIANTE) {
        const estudianteSeleccionado = this.formulario1.get('estudiante')?.value;
        if (!estudianteSeleccionado || estudianteSeleccionado.trim() === "") {
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.SELECCIONAR_ESTUDIANTE);
          return;
        }

        const estudiante = this.listarEstu.find(e => e.codigo === estudianteSeleccionado);

        if (estudiante) {
          const nuevoRegistro = {
            codigo: `E${this.estudiantes.length + 1}`,
            nombre: estudiante.primerNombre + ' ' + estudiante.apellidoPaterno + ' ' + estudiante.apellidoMaterno
          };

          const existe = this.estudiantes.some(e => e.nombre === nuevoRegistro.nombre);
          if (!existe) {
            this.estudiantes.push(nuevoRegistro);
            this.listarEstu = this.listarEstu.filter(e => e.codigo !== estudianteSeleccionado);
          }
        }
      }

      if (rolSeleccionado === CODIGO_ROLE_USER.PROFESOR) {
        const profesorValue = this.formulario1.get('profesor')?.value;
        const cargoValue = this.formulario1.get('cargo')?.value;

        if (!profesorValue) {
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.PROFESOR_VACIO);
          return;
        }

        if (!cargoValue) {
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.CARGO_VACIO);
          return;
        }
        this.cargos = this.cargos.filter(cargo => cargo !== cargoSeleccionado);

        if (this.profesores.length >= 3) {
          this.alertService.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.CUPOS_PROFESORES_LLENO);
          return;
        }

        const profesor = this.listarProfe.find(p => p.codigo === profesorValue);

        if (profesor) {
          const nuevoRegistro = {
            codigo: `P${this.profesores.length + 1}`,
            nombre: `${profesor.primerNombre} ${profesor.apellidoPaterno} ${profesor.apellidoMaterno}`,
            cargo: profesor.cargo.nombre,
          };

          const existe = this.profesores.some(p => p.nombre === nuevoRegistro.nombre);
          if (!existe) {
            this.profesores.push(nuevoRegistro);
            this.listarProfe = this.listarProfe.filter(p => p.codigo !== profesorValue); // Eliminar el profesor de la lista disponible
          }
        }
      }
      this.formulario1.reset();
      this.formulario1.get('rol')?.setValue(rolSeleccionado);
    }
  }


  accionNuevo() {

    const todos = [...this.estudiantes, ...this.profesores];
    const codigo = this.formulario.value.nombre?.codigo || 'Código no disponible';

    if (todos.length > 0) {

      todos.forEach((persona) => {
        if (persona.codigo && persona.codigo.startsWith('P')) {

          const objAsignacion: Asignacion = {
            codigo: codigo,
            profesor: persona.nombre,
            estudiante: "",
          };

          this.listaAsignaciones.push(objAsignacion);

        } else if (persona.codigo && persona.codigo.startsWith('E')) {

          const objAsignacion1: Asignacion = {
            codigo: codigo,
            profesor: "",
            estudiante: persona.nombre,
          };
          this.listaAsignaciones.push(objAsignacion1);

        } 
      });

      this.equipoService.registrarAsignacion(this.listaAsignaciones).subscribe({
        next: () => {
          this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
          window.location.reload();
        },
        error: (err) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, err.message);
        },
      });

    } else {
      this.alertService.error(TITULO_MESAJES.ERROR_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
    }
  }
}