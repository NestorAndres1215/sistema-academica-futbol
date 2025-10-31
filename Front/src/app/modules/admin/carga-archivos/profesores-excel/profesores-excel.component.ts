import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historial } from 'src/app/model/historial';
import { Profesor } from 'src/app/model/profesor';
import { CargoService } from 'src/app/services/cargo.service';
import { HistorialService } from 'src/app/services/historial.service';
import { LoginService } from 'src/app/services/login.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { SedeService } from 'src/app/services/sede.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-profesores-excel',
  templateUrl: './profesores-excel.component.html',
  styleUrls: ['./profesores-excel.component.css']
})
export class ProfesoresExcelComponent implements OnInit {
  nombre: string
  cargarExcel() :void{
    if (!this.data || this.data.length === 0) {  
      this.mensaje.MostrarMensaje("⚠️ LOS DATOS ESTÁN VACÍOS");
      console.warn("❌ No hay datos disponibles.");
      return;
    }
    const result = this.data.map(item => {
      const rowData = item.row; // Array de datos que está dentro de 'row'

      // Obtener valores específicos
      const sede = rowData[12];  // Sede, se encuentra en la posición 15
      const cargo = rowData[11]; // Cargo, se encuentra en la posición 12

      // Buscar la sede y el cargo en las listas correspondientes
      const sedeExistente = this.sedes.find(s => s.nombre === sede);
      const cargoExistente = this.cargos.find(c => c.nombre === cargo);

      // Obtener el código de la sede y cargo si existen, o un valor por defecto
      const codigoSede = sedeExistente ? sedeExistente.codigo : 'Sede no válida';
      const codigoCargo = cargoExistente ? cargoExistente.codigo : 'Cargo no válido';

      // Fecha de nacimiento (índice 9 en el array 'row')
      const nacimientoRaw = rowData[9]; // '12/12/1900'

      // Si la fecha está en formato string, podemos convertirla a un objeto Date
      let nacimiento: Date;
      if (nacimientoRaw && !isNaN(Date.parse(nacimientoRaw))) {
        nacimiento = new Date(nacimientoRaw);  // Convertimos la fecha en formato string
      } else {
        nacimiento = new Date();  // Valor por defecto si la fecha no es válida
      }
      const usuario = "P" +rowData[6];
      const apellidoPaterno =  rowData[2]; // Obtén el valor
      const primerCaracter = apellidoPaterno.charAt(0); // O también apellidoPaterno[0]
      const contra = rowData[6] + primerCaracter
      // Devolvemos el objeto con los datos procesados
      return {
        primerNombre: rowData[0],  // 'Juan'
        segundoNombre: rowData[1], // 'Carlos'
        apellidoPaterno: rowData[2], // 'Pérez'
        apellidoMaterno: rowData[3], // 'Rodríguez'
        correo: rowData[4], // 'juan.perez@mail.com'
        telefono: rowData[5], // 987554377
        dni: rowData[6], // 44345674
        direccion: rowData[7], // 'Av. Siempre Viva 123'
        edad: rowData[8], // 30
        nacimiento: nacimiento,  // Fecha convertida
        nacionalidad: rowData[10], // 'Perú'
        cargo: codigoCargo,  // Código de cargo encontrado o valor por defecto
        username: usuario, // 'j_perez'
        password:contra, // 'j_perez'
        sede: codigoSede,  // Código de sede encontrado o valor por defecto
        genero: rowData[13], // 'Masculino'
        tipoDoc: rowData[14] // 'DNI'
      };
    });

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró un nuevo profesor.`
    };
    console.log(result)
    this.historialService.registrar(historial).subscribe(
      () => {
        this.profesorService.guardarProfesorExcel(result).subscribe(
          response => {
            this.mensaje.MostrarMensajeExito("SE REGISTRO  PROFESOR");
            this.data = [];  // Limpiar los datos de la tabla
          },
          error => {
            this.mensaje.MostrarBodyError(error);
          }
        );
      })
  }
  sedes: any
  async listarSede() {
    this.sede.listarSedeActivado().subscribe((data) => {
      console.log(data)
      this.sedes = data;

    })
  }
  cargos: any
  async listarCargo() {
    this.cargo.listarCargoActivado().subscribe((data) => {
      console.log(data)
      this.cargos = data;

    })
  }
  data: any[];
  seleccionarArchivo(): void {
    document.getElementById('fileInput')?.click();
  }

  importExcel(event: any): void {
    const file = event.target.files[0];


    if (file) {
      this.data = [];
      const reader = new FileReader();
      reader.onload = (e: any) => {

        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        this.data = jsonData.slice(1).map((row, rowIndex) => {
          console.log(row)
          //CORREO
          const correosProfesores: string[] = this.profesoresActuales.map(profesor => profesor.correo);
          const isCorreoValido = correosProfesores.includes(row[4]);

          //TELEFONO
          const telefonosProfesores: string[] = this.profesoresActuales.map(profesor => profesor.telefono);
          const telefonoExcel = String(row[5]).trim().replace(/\D/g, '');
          const telefonosLimpios = telefonosProfesores.map(telefono => telefono.trim().replace(/\D/g, ''));
          const isTelefonoValido = telefonosLimpios.includes(telefonoExcel);

          //NUMERO DE DOCUMENTO
          const numeroProfesores: string[] = this.profesoresActuales.map(profesor => profesor.dni);
          const numeroExcel = String(row[6]).trim().replace(/\D/g, '');
          const numerosLimpios = numeroProfesores.map(numero => numero.trim().replace(/\D/g, ''));
          const isNumeroValido = numerosLimpios.includes(numeroExcel);
          //FECHA NACIMIENTO
          const excelSerialDate = row[9];
          const excelBaseDate = new Date(1900, 0, 1);
          const fecha = new Date(excelBaseDate.getTime() + (excelSerialDate - 2) * 24 * 60 * 60 * 1000);
          row[9] = fecha.toLocaleDateString();

          //SEDE
          const sedeProfesores: string[] = this.profesoresActuales.map(profesor => profesor.sede);
          const sedes: string[] = this.sedes.map(sede => sede.nombre);
          const sedeNoExiste = !sedes.includes(row[13]);

          const cg: string[] = this.cargos.map(cg => cg.nombre);
          const cgNoExiste = !sedes.includes(row[11]);
          return {
            row: row,
            isCorreoValido: isCorreoValido,
            isNumeroValido: isNumeroValido,
            sedeNoExiste: sedeNoExiste,
            isTelefonoValido: isTelefonoValido,


          };
        });
      };
      reader.readAsBinaryString(file);
    }
  }


  generarFormato(): void {
    const tablaDatos = [
      ['Robert', 'John', 'Downey', 'Jr.', 'robert.downey@example.com', '1112233445', '123456789', 'Calle Hollywood 123', 59, new Date(1965, 3, 4), 'Argentina', '1', 'Entrenador arquero', 'robertdowney', 'robert123', 'RIMAC', 'Masculino', 'DNI'],
      ['Brad', '', 'Pitt', '', 'brad.pitt@example.com', '922334455', '876543210', 'Avenida Sunset 789', 60, new Date(1963, 11, 18), 'Argentina', '1', 'Entrenador arquero', 'bradpitt', 'brad456', 'RIMAC', 'Masculino', 'DNI'],
      ['Leonardo', 'Wilhelm', 'DiCaprio', '', 'leonardo.dicaprio@example.com', '911223344', '112233445', 'Avenida Famosos 102', 49, new Date(1974, 10, 11), 'Chile', '1', 'Entrenador arquero', 'leonardodicaprio', 'leo12345', 'RIMAC', 'Masculino', 'DNI'],
      ['Tom', '', 'Cruise', '', 'tom.cruise@example.com', '944556677', '998877665', 'Calle Estrella 999', 61, new Date(1962, 6, 3), 'Colombia', '1', 'Entrenador arquero', 'tomcruise', 'tom123', 'RIMAC', 'Masculino', 'DNI'],
      ['Chris', '', 'Hemsworth', '', 'chris.hemsworth@example.com', '956677889', '887766554', 'Avenida Victoria 234', 40, new Date(1983, 7, 11), 'Ecuador', '1', 'Entrenador arquero', 'chrishemsworth', 'chris12345', 'SMP', 'Masculino', 'Pasaporte']
    ];

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ['Primer Nombre', 'Segundo Nombre', 'Apellido Paterno', 'Apellido Materno', 'Correo', 'Teléfono', 'DNI', 'Dirección', 'Edad', 'Fecha de Nacimiento', 'Nacionalidad', 'Estado', 'Cargo', 'Usuario', 'Contraseña', 'Sede', 'Género', 'Tipo de Documento'], // Cabeceras
      ...tablaDatos
    ]);

    const wscols = [
      { wch: 10 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 10 }, { wch: 20 }, { wch: 15 }, { wch: 15 }
    ];

    const range = XLSX.utils.decode_range(ws['!ref'] || "A1:K1");
    for (let row = range.s.r; row <= range.e.r; ++row) {
      for (let col = range.s.c; col <= range.e.c; ++col) {
        const cell = ws[XLSX.utils.encode_cell({ r: row, c: col })];
        if (cell) {

          cell.s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } },
            border: {
              top: { style: 'thin', color: { rgb: "000000" } },
              left: { style: 'thin', color: { rgb: "000000" } },
              bottom: { style: 'thin', color: { rgb: "000000" } },
              right: { style: 'thin', color: { rgb: "000000" } }
            }
          };
        }
      }
    }

    ws['!cols'] = wscols; // Establecer el ancho de las columnas

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Descargar el archivo Excel
    XLSX.writeFile(wb, 'datos_generados.xlsx');
  }
  volver() {
    this.router.navigate(['/administrador']);
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
    private historialService: HistorialService,
    private sede: SedeService,
    private profesorService: ProfesorService,
    private cargo: CargoService,
    private mensaje: MensajeService) { }

  ngOnInit(): void {
    this.listarSede()
    this.listarCargo()
    this.listarProfesores()
  }
  profesoresActuales: any
  async listarProfesores() {
    this.profesorService.listar().subscribe((data) => {
      console.log(data)
      data = data.filter(item => item.codigo !== '0000');
      this.profesoresActuales = data;

    })
  }
}
