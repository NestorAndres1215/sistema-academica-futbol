import { Component, OnInit } from '@angular/core';
import { EditPerfilEstudianteComponent } from '../edit-perfil-estudiante/edit-perfil-estudiante.component';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-dp-estduante',
  templateUrl: './dp-estduante.component.html',
  styleUrls: ['./dp-estduante.component.css']
})
export class DpEstduanteComponent implements OnInit {

    botonesConfig = {
    editar: true,
    volver: true,

  };
  datos: any
  user: any

  constructor(

    public login: LoginService,
    public estudianteService: EstudianteService,
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
    this.router.navigate(['/estudiante']);
  }

  async listar() {
    this.estudianteService.listaUsuarioPorCodigo(this.user.ul_codigo).subscribe(data => {
      this.lista = data;
    });

  }
  operar() {


    const dialogRef = this.dialog.open(EditPerfilEstudianteComponent, {
        width: '1050px',
      height: '650px',
      data: {
        row: this.lista,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.listar(); 
    });
  }

}
