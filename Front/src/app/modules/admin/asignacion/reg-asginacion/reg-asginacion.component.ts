import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Asignacion } from 'src/app/model/Asignacion';
import { EquipoService } from 'src/app/services/equipo.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { GeneralService } from 'src/app/services/general.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { SedeService } from 'src/app/services/sede.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reg-asginacion',
  templateUrl: './reg-asginacion.component.html',
  styleUrls: ['./reg-asginacion.component.css']
})
export class RegAsginacionComponent implements OnInit {
  limpiar() {
    this.formulario.reset();
    ///this.formulario1.reset();
this.nombreEquipo=""
    // Limpiar las listas de estudiantes y profesores
    this.estudiantes = [];
    this.profesores = [];
    this.formulario1.reset()
    // Limpiar cualquier otra variable que necesites restablecer
    this.categoriaSeleccionada = '';
    this.sedeSeleccionada = '';
    this.generoSeleccionado = '';
    this.formulario.enable();
    this.cargos = ['Entrenador Principal', 'Entrenador Portero', 'Entrenador Asistente'];

  }



  personas: any[] = [];
  personas1: any[] = []; // Arreglo para almacenar los registros

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

      // Si deseas establecer estos valores también en el formulario
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
  roles: string[] = ['Estudiante', 'Profesor']; // Roles disponibles

  rolSeleccionado: string = 'Estudiante'; // Rol seleccionado por defecto
  mostrarCamposEstudiante: boolean = true;
  estudiantes: any[] = []; // Lista de estudiantes
  profesores: any[] = []; // Lista de profesores
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
  // Registrar persona

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
        this.isFormEnabled = true; // Al hacer clic en Registrar, habilitas el formulario
        this.formulario1.get('rol')?.enable();
        this.formulario1.get('estudiante')?.enable();
        this.formulario1.get('cargo')?.disable();
        // Deshabilitar los campos del formulario
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
        // Deshabilitar los campos del formulario
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
  nombreEquipo:string
  estu: any
  listarEstu: any
  listarProfe: any


  filtrarProfesoresPorCargo() {
    console.log(this.profesoresActuales)
    const cargoSeleccionado = this.formulario1.get('cargo')?.value;
    console.log(cargoSeleccionado);



    if (cargoSeleccionado) {
      // Filtra la lista de profesores según el cargo seleccionado
      this.listarProfe = this.profe.filter(item => item.cargo.nombre === cargoSeleccionado);

      // Elimina el cargo seleccionado de la lista de cargos disponibles
      //this.cargos = this.cargos.filter(cargo => cargo !== cargoSeleccionado);

      console.log("Profesores filtrados:", this.listarProfe);
      console.log("Cargos disponibles después de filtrar:", this.cargos);
    }
  }


  async listarProfesor() {
    const sedeSeleccionada = this.formulario.get('sede')?.value;
    console.log(this.formulario.value)
    this.profesor.listarProfesorActivado().subscribe((data: any[]) => {
      data = data.filter(item => item.codigo !== '0000')
      this.listarProfe = data.filter(estudiante =>
        estudiante.sede.nombre === sedeSeleccionada
      );
      this.profe = data.filter(estudiante =>
        estudiante.sede.nombre === sedeSeleccionada
      );
      console.log(this.listarProfe);
      const xd = this.cantidadPorfesores.filter(i => i.equipo.codigo === this.formulario.value.nombre.codigo);
      const nombresCargos = xd.map(i => i.profesor.cargo.nombre).join(', ');
      this.cargos = this.cargos.filter(cargo => !nombresCargos.includes(cargo));
      console.log(this.listarProfe);
    });
  }

  async listarEstudiante() {
    console.log(this.estudianteActuales)
    console.log(this.profesoresActuales)
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
      console.log(this.listarEstu);

      console.log(this.listarEstu);
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
      console.log(this.cantidadPorfesores)
      // Filtrar los códigos que no sean '0000'
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
    // Obtener el estudiante eliminado de la lista 'estudiantes'
    const estudianteEliminado = this.estudiantes[index];
    console.log(this.estudiantes[index]);

    // Extraer el primer nombre del estudiante eliminado
    const primerNombreEliminado = estudianteEliminado.nombre.split(' ')[0];
    console.log(primerNombreEliminado)
    // Eliminar el estudiante de la lista 'estudiantes'
    this.estudiantes.splice(index, 1);

    // Buscar el estudiante por su primer nombre en 'estu'
    const estudianteExistente = this.estu.find(e => e.primerNombre === primerNombreEliminado);

    if (estudianteExistente) {
      // Si el estudiante existe en 'estu', agregarlo de nuevo a 'listarEstu'
      this.listarEstu.push(estudianteExistente);
      // Refrescar el array para que Angular detecte el cambio
      this.listarEstu = [...this.listarEstu];
    }
  }
  eliminarProfesor(index: number): void {
    // Obtener el estudiante eliminado de la lista 'estudiantes'
    const profesorEliminado = this.profesores[index];
    console.log(this.profesores[index]);

    // Extraer el primer nombre del estudiante eliminado
    const primerNombreEliminado = profesorEliminado.nombre.split(' ')[0];
    console.log(primerNombreEliminado)
    // Eliminar el estudiante de la lista 'estudiantes'
    this.profesores.splice(index, 1);

    // Buscar el estudiante por su primer nombre en 'estu'
    const profesorExistente = this.profe.find(e => e.primerNombre === primerNombreEliminado);
    console.log(primerNombreEliminado)
    if (profesorExistente) {
      // Si el estudiante existe en 'estu', agregarlo de nuevo a 'listarEstu'
      this.listarProfe.push(profesorExistente);
      const eliminado = profesorEliminado.cargo;
      console.log(eliminado)
      this.cargos.push(eliminado)
      const cargosUnicos = [];

      this.cargos.forEach(cargo => {
        if (!cargosUnicos.includes(cargo)) {
          cargosUnicos.push(cargo); // Agrega el cargo si no está en la lista de únicos
        }
      });

      console.log(cargosUnicos);
      console.log(this.cargos)
      this.listarProfe = [...this.listarProfe];
    }
  }

  registrar() {
    console.log(this.nombreEquipo)
    const nombreEquipo = this.formulario.get('nombre')?.value;
    console.log(nombreEquipo)
    if (!nombreEquipo ) {
      return this.mensaje.MostrarMensajeExito("SE DEBE SELECCIONAR UN EQUIPO")
      console.log("El nombre del equipo no es válido");
    } 
    
    if (this.formulario1.valid) {
      const rolSeleccionado = this.formulario1.get('rol')?.value;
      const cargoSeleccionado = this.formulario1.get('cargo')?.value;
      console.log(cargoSeleccionado)

      if (this.profesores.length >= 2) {
        this.formulario1.get('cargo')?.disable();
        this.formulario1.get('profesor')?.disable();

      }
      let nuevoRegistro: any;

      // Registrar un estudiante

      if (rolSeleccionado === 'Estudiante') {
        const estudianteSeleccionado = this.formulario1.get('estudiante')?.value;
        if (!estudianteSeleccionado || estudianteSeleccionado.trim() === "") {
          this.mensaje.MostrarMensaje("Se debe seleccionar un estudiante");
          return;
        }
        console.log(estudianteSeleccionado);


        const estudiante = this.listarEstu.find(e => e.codigo === estudianteSeleccionado);

        if (estudiante) {
          const nuevoRegistro = {
            codigo: `E${this.estudiantes.length + 1}`, // Genera el código incremental
            nombre: estudiante.primerNombre + ' ' + estudiante.apellidoPaterno + ' ' + estudiante.apellidoMaterno
          };
          // Verificar si ya está en la lista de estudiantes antes de agregarlo
          const existe = this.estudiantes.some(e => e.nombre === nuevoRegistro.nombre);
          if (!existe) {
            this.estudiantes.push(nuevoRegistro);
            console.log(this.estudiantes)
            // Filtrar el estudiante registrado para que no aparezca nuevamente
            this.listarEstu = this.listarEstu.filter(e => e.codigo !== estudianteSeleccionado);
          }
        }
      }
      // Registrar un profesor
      if (rolSeleccionado === 'Profesor') {
        const profesorValue = this.formulario1.get('profesor')?.value;
        const cargoValue = this.formulario1.get('cargo')?.value;

        // Validar si los campos están vacíos
        if (!profesorValue) {
          this.mensaje.MostrarMensaje("El campo 'profesor' está vacío.");
          return; // Detiene la ejecución si el campo está vacío
        }

        if (!cargoValue) {
          this.mensaje.MostrarMensaje("El campo 'cargo' está vacío.");
          return; // Detiene la ejecución si el campo está vacío
        }
        this.cargos = this.cargos.filter(cargo => cargo !== cargoSeleccionado);
        // Validar límite de profesores
        if (this.profesores.length >= 3) {
          this.mensaje.MostrarMensaje('Ya se han completado los espacios para profesores.');
          return; // Detiene la ejecución si ya hay 3 profesores
        }

        // Buscar el profesor seleccionado en la lista de profesores disponibles
        const profesor = this.listarProfe.find(p => p.codigo === profesorValue);

        if (profesor) {
          const nuevoRegistro = {
            codigo: `P${this.profesores.length + 1}`,
            nombre: `${profesor.primerNombre} ${profesor.apellidoPaterno} ${profesor.apellidoMaterno}`,
            cargo: profesor.cargo.nombre,
          };
          console.log(nuevoRegistro)
          // Verificar si el profesor ya está en la lista
          const existe = this.profesores.some(p => p.nombre === nuevoRegistro.nombre);
          if (!existe) {
            this.profesores.push(nuevoRegistro); // Agregar el profesor a la lista

            this.listarProfe = this.listarProfe.filter(p => p.codigo !== profesorValue); // Eliminar el profesor de la lista disponible
          }
        }
      }
      // Limpiar el formulario después de registrar
      this.formulario1.reset();
      this.formulario1.get('rol')?.setValue(rolSeleccionado);
    }
  }

  listaAsignaciones: any[] = [];
  accionNuevo() {
    console.log(this.estudiantes);
    console.log(this.profesores);
    console.log(this.formulario.value)
    // Unir los dos arrays en uno solo
    const todos = [...this.estudiantes, ...this.profesores];
    const codigo = this.formulario.value.nombre?.codigo || 'Código no disponible';
    console.log(codigo);

    if (todos.length > 0) {
      // Comprobar si alguno tiene código con "S" o "P"
      todos.forEach((persona) => {
        if (persona.codigo && persona.codigo.startsWith('P')) {
          console.log('Es Profesor');
          const objAsignacion: Asignacion = {
            codigo: codigo,
            profesor: persona.nombre,
            estudiante: "",
          };
          console.log(typeof objAsignacion);
          this.listaAsignaciones.push(objAsignacion);
          console.log(this.listaAsignaciones);
          // Esto recarga la página
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

      // Una vez que se haya procesado todo, enviar el array completo al backend
      this.equipoService.registrarAsignacion(this.listaAsignaciones).subscribe({
        next: (data) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Las asignaciones se registraron correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          window.location.reload();
          // this.mensaje.MostrarMensajeExito("Se registraron correctamente");
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