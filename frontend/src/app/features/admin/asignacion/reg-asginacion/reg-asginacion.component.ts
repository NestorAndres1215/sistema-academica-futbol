import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Asignacion } from 'src/app/core/model/Asignacion';

import { EquipoService } from 'src/app/core/services/equipo.service';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { MensajeService } from 'src/app/core/services/mensaje.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { SedeService } from 'src/app/core/services/sede.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reg-asginacion',
  templateUrl: './reg-asginacion.component.html',
  styleUrls: ['./reg-asginacion.component.css']
})
export class RegAsginacionComponent implements OnInit {
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
    this.cargos = ['Entrenador Principal', 'Entrenador Portero', 'Entrenador Asistente'];

  }

  personas: any[] = [];
  personas1: any[] = [];

  volver() {
    throw new Error('Method not implemented.');
  }
  public formulario: UntypedFormGroup;
  public formulario1: UntypedFormGroup;
  constructor(private generales: GeneralService,
    private sede: SedeService,
    private profesor: ProfesorService,
    private equipoService: EquipoService,
    private estudiante: EstudianteService,
    private formBuilder: UntypedFormBuilder,
    private mensaje: MensajeService,
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
      console.log(data)
      this.sedes = data;

    })
  }
  async listaGenero() {
    this.generales.listarGeneralDevActivado("0002").subscribe((data) => {
      console.log(data)
      this.genero = data;

    })
  }
  datosTabla: any[] = [];
  posiciones: any
  async listaPosicion() {
    this.generales.listarGeneralDevActivado("0005").subscribe((data) => {
      console.log(data)
      this.posiciones = data;

    })
  }
  listarcategoria: any
  async listaCategoria() {
    this.generales.listarGeneralDevActivado("0004").subscribe((data) => {
      console.log(data)
      this.listarcategoria = data;

    })
  }
  roles: string[] = ['Estudiante', 'Profesor'];

  rolSeleccionado: string = 'Estudiante'; 
  mostrarCamposEstudiante: boolean = true;
  estudiantes: any[] = []; 
  profesores: any[] = []; 
  cambiarRol() {
    const rol = this.formulario1.get('rol')?.value;
    if (rol === 'Profesor') {
      this.formulario1.patchValue({
        capitan: '',
        numeroCamiseta: '',
        posicion: ''
      });
    }
  }
  cargos = ['Entrenador Principal', 'Entrenador Portero', 'Entrenador Asistente'];

  isFormEnabled = false;
  operar() {
    if (this.formulario.valid) {

      this.personas.push(this.formulario.value);
      console.log(this.formulario.value.nombre.codigo)
      console.log(this.cantidadPorfesores)
      const result = this.cantidadPorfesores.filter(i => i.equipo.codigo === this.formulario.value.nombre.codigo);
      console.log(result);
      if (result.length > 2) {

        this.formulario1.get('profesor')?.disable();
        this.mensaje.MostrarMensaje("Estan llenos los cupos de profesores en este equipo")
        this.mostrarFormularioDetalle = true;
        this.isFormEnabled = true; 
        this.formulario1.get('rol')?.enable();
        this.formulario1.get('estudiante')?.enable();
        this.formulario1.get('cargo')?.disable();
        this.listarEstudiante()
        this.listarProfesor()
        this.formulario.disable();
      } else {
        console.log("hola")
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
    else {
      this.mensaje.MostrarMensaje("TODOS LOS DATOS TIENEN QUE ESTAR COMPLETOS")
    }
  }


  nombreEquipo: string
  estu: any
  listarEstu: any
  listarProfe: any


  filtrarProfesoresPorCargo() {
    console.log(this.profesoresActuales)
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
          (categoriaSeleccionada === 'Sub-8' && (estudiante.edad === 7 || estudiante.edad === 8)) ||
          (categoriaSeleccionada === 'Sub-10' && (estudiante.edad === 9 || estudiante.edad === 10)) ||
          (categoriaSeleccionada === 'Sub-12' && (estudiante.edad === 11 || estudiante.edad === 12)) ||
          (categoriaSeleccionada === 'Sub-16' && (estudiante.edad >= 13 && estudiante.edad <= 16)) ||
          (categoriaSeleccionada === 'Sub-19' && (estudiante.edad >= 17 && estudiante.edad <= 19))
        )
      );
      this.listarEstu = data.filter(estudiante =>
        estudiante.sede.nombre === sedeSeleccionada &&
        estudiante.genero === generoSeleccionado &&
        (
          (categoriaSeleccionada === 'Sub-8' && (estudiante.edad === 7 || estudiante.edad === 8)) ||
          (categoriaSeleccionada === 'Sub-10' && (estudiante.edad === 9 || estudiante.edad === 10)) ||
          (categoriaSeleccionada === 'Sub-12' && (estudiante.edad === 11 || estudiante.edad === 12)) ||
          (categoriaSeleccionada === 'Sub-16' && (estudiante.edad >= 13 && estudiante.edad <= 16)) ||
          (categoriaSeleccionada === 'Sub-19' && (estudiante.edad >= 17 && estudiante.edad <= 19))
        )
      );
    });
  }
  cantidadPorfesores: any
  profesoresActuales: any
  estudianteActuales: any
  async listarDev() {
    this.equipoService.listarAsignacion().subscribe((data: any[]) => {

      console.log(this.profesores.length)
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

  yaEstudianteRegistrado = false;
  profe: any
  eliminarEstudiante(index: number): void {

    const estudianteEliminado = this.estudiantes[index];

    const primerNombreEliminado = estudianteEliminado.nombre.split(' ')[0];

    this.estudiantes.splice(index, 1);


    const estudianteExistente = this.estu.find(e => e.primerNombre === primerNombreEliminado);

    if (estudianteExistente) {

      this.listarEstu.push(estudianteExistente);
      this.listarEstu = [...this.listarEstu];
    }
  }
  eliminarProfesor(index: number): void {

    const profesorEliminado = this.profesores[index];
 
    const primerNombreEliminado = profesorEliminado.nombre.split(' ')[0];
    
    this.profesores.splice(index, 1);

    const profesorExistente = this.profe.find(e => e.primerNombre === primerNombreEliminado);
    console.log(primerNombreEliminado)
    if (profesorExistente) {
    
      this.listarProfe.push(profesorExistente);
      const eliminado = profesorEliminado.cargo;
   
      this.cargos.push(eliminado)
      const cargosUnicos = [];

      this.cargos.forEach(cargo => {
        if (!cargosUnicos.includes(cargo)) {
          cargosUnicos.push(cargo); 
        }
      });

      this.listarProfe = [...this.listarProfe];
    }
  }

  registrar() {
    console.log(this.nombreEquipo)
    const nombreEquipo = this.formulario.get('nombre')?.value;
    console.log(nombreEquipo)
    if (!nombreEquipo) {
      return this.mensaje.MostrarMensajeExito("SE DEBE SELECCIONAR UN EQUIPO")
    }

    if (this.formulario1.valid) {
      const rolSeleccionado = this.formulario1.get('rol')?.value;
      const cargoSeleccionado = this.formulario1.get('cargo')?.value;
      console.log(cargoSeleccionado)

      if (this.profesores.length >= 2) {
        this.formulario1.get('cargo')?.disable();
        this.formulario1.get('profesor')?.disable();

      }

      if (rolSeleccionado === 'Estudiante') {
        const estudianteSeleccionado = this.formulario1.get('estudiante')?.value;
        if (!estudianteSeleccionado || estudianteSeleccionado.trim() === "") {
          this.mensaje.MostrarMensaje("Se debe seleccionar un estudiante");
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

      if (rolSeleccionado === 'Profesor') {
        const profesorValue = this.formulario1.get('profesor')?.value;
        const cargoValue = this.formulario1.get('cargo')?.value;

        if (!profesorValue) {
          this.mensaje.MostrarMensaje("El campo 'profesor' está vacío.");
          return; 
        }

        if (!cargoValue) {
          this.mensaje.MostrarMensaje("El campo 'cargo' está vacío.");
          return; 
        }
        this.cargos = this.cargos.filter(cargo => cargo !== cargoSeleccionado);
       
        if (this.profesores.length >= 3) {
          this.mensaje.MostrarMensaje('Ya se han completado los espacios para profesores.');
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

  listaAsignaciones: any[] = [];
  accionNuevo() {
    console.log(this.estudiantes);
    console.log(this.profesores);
    console.log(this.formulario.value)

    const todos = [...this.estudiantes, ...this.profesores];
    const codigo = this.formulario.value.nombre?.codigo || 'Código no disponible';
    console.log(codigo);

    if (todos.length > 0) {
   
      todos.forEach((persona) => {
        if (persona.codigo && persona.codigo.startsWith('P')) {
          console.log('Es Profesor');
          const objAsignacion: Asignacion = {
            codigo: codigo,
            profesor: persona.nombre,
            estudiante: "",
          };

          this.listaAsignaciones.push(objAsignacion);

        } else if (persona.codigo && persona.codigo.startsWith('E')) {
          console.log('Es Estudiante');
          const objAsignacion1: Asignacion = {
            codigo: codigo,
            profesor: "",
            estudiante: persona.nombre,
          };
          this.listaAsignaciones.push(objAsignacion1);
          console.log(objAsignacion1);

        } else {
          console.log('Código no válido');
        }
      });

      this.equipoService.registrarAsignacion(this.listaAsignaciones).subscribe({
        next: (data) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Las asignaciones se registraron correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          window.location.reload();
        },
        error: (err) => {
          console.error("Error al registrar las asignaciones:", err);
          this.mensaje.MostrarMensajeError("Ocurrió un error al registrar las asignaciones");
        },
      });

    } else {
      this.mensaje.MostrarMensajeError("FORMULARIO FACIO")
    }
  }
}