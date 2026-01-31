import { Component, OnInit } from '@angular/core';
import { EditPerfilComponent } from '../edit-perfil/edit-perfil.component';
import { LoginService } from 'src/app/core/services/login.service';
import { ProfesorService } from 'src/app/core/services/profesor.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-datos-personales-profesores',
  templateUrl: './datos-personales-profesores.component.html',
  styleUrls: ['./datos-personales-profesores.component.css']
})
export class DatosPersonalesProfesoresComponent implements OnInit {


 
  datos: any
  user: any

  constructor(
 
    public login: LoginService,
    public profesorService: ProfesorService,
    private router: Router,
    private dialog: MatDialog,
    
  ) { }

  imagenUrlBase = 'data:image/jpeg;base64,';
  lista: any = []
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.listar()
   

  }
  mostrarImagen(perfil: any): string {
    return perfil.perfil ? this.imagenUrlBase + perfil.perfil : '';
  }
 

  volver() {
    this.router.navigate(['/profesor']);
  }

  async listar() {
    this.profesorService.listaUsuarioPorCodigo(this.user.ul_codigo).subscribe(data => {
      this.lista = data;
    });

  }
  operar() {
    console.log(this.lista); // Verifica que lista tenga datos

    const dialogRef = this.dialog.open(EditPerfilComponent, {
      width: '850px',
      height: '600px',
      data: {
        row: this.lista, // Pasamos los datos correctamente
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(() => {
      this.listar(); // Llama al método listar para actualizar los datos
    });
  }

}
