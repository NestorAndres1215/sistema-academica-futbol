import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { Historial } from 'src/app/core/model/historial';
import { AlertService } from 'src/app/core/services/alert.service';
import { CargoService } from 'src/app/core/services/cargo.service';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { SedeService } from 'src/app/core/services/sede.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-profesores-excel',
  templateUrl: './profesores-excel.component.html',
  styleUrls: ['./profesores-excel.component.css']
})
export class ProfesoresExcelComponent implements OnInit {
  nombre: string

  cargarExcel(): void {
    if (!this.data || this.data.length === 0) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      return;
    }
    const result = this.data.map(item => {
      const rowData = item.row;
      const sede = rowData[12];
      const cargo = rowData[11];

      const sedeExistente = this.sedes.find(s => s.nombre === sede);
      const cargoExistente = this.cargos.find(c => c.nombre === cargo);

      const codigoSede = sedeExistente ? sedeExistente.codigo : 'Sede no válida';
      const codigoCargo = cargoExistente ? cargoExistente.codigo : 'Cargo no válido';

      const nacimientoRaw = rowData[9];

      let nacimiento: Date;
      if (nacimientoRaw && !isNaN(Date.parse(nacimientoRaw))) {
        nacimiento = new Date(nacimientoRaw);
      } else {
        nacimiento = new Date();
      }
      const usuario = "P" + rowData[6];
      const apellidoPaterno = rowData[2];
      const primerCaracter = apellidoPaterno.charAt(0);
      const contra = rowData[6] + primerCaracter

      return {
        primerNombre: rowData[0],
        segundoNombre: rowData[1],
        apellidoPaterno: rowData[2],
        apellidoMaterno: rowData[3],
        correo: rowData[4],
        telefono: rowData[5],
        dni: rowData[6],
        direccion: rowData[7],
        edad: rowData[8],
        nacimiento: nacimiento,
        nacionalidad: rowData[10],
        cargo: codigoCargo,
        username: usuario,
        password: contra,
        sede: codigoSede,
        genero: rowData[13],
        tipoDoc: rowData[14]
      };
    });

    const historial: Historial = {
      usuario: this.loginService.getUser().username,
      detalle: `El usuario ${this.loginService.getUser().username} registró un nuevo profesor.`
    };

    this.profesorService.guardarProfesorExcel(result).subscribe({
      next: async () => {
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.data = [];
        await firstValueFrom(this.historialService.registrar(historial));
      },
      error: (error) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO,error.error.message);
      }
    });

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

    ws['!cols'] = wscols;

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    XLSX.writeFile(wb, 'datos_generados.xlsx');
  }


  constructor(
    private loginService: LoginService,
    private historialService: HistorialService,
    private sede: SedeService,
    private profesorService: ProfesorService,
    private cargo: CargoService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.listarSede()
    this.listarCargo()
    this.listarProfesores()
  }

  profesoresActuales: any

  async listarProfesores() {
    this.profesorService.listar().subscribe((data) => {
      data = data.filter(item => item.codigo !== '0000');
      this.profesoresActuales = data;
    })
  }
}
