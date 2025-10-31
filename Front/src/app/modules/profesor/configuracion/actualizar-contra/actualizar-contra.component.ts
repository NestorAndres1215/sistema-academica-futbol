import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditPartidoComponent } from 'src/app/modules/admin/partido/edit-partido/edit-partido.component';
import { LoginService } from 'src/app/services/login.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UserService } from 'src/app/services/usuario.service';
import { EditContraComponent } from '../edit-contra/edit-contra.component';

@Component({
  selector: 'app-actualizar-contra',
  templateUrl: './actualizar-contra.component.html',
  styleUrls: ['./actualizar-contra.component.css']
})
export class ActualizarContraComponent implements OnInit {
editar(row: any) {
    const dialogRef = this.dialog.open(EditContraComponent, {
      width: '550px',
      disableClose: true,
      height: '550px',
      data: {
        row,
      },
    });

    // Escucha el cierre del modal para actualizar la tabla
    dialogRef.afterClosed().subscribe(data => {
      this.listar()
    })
  }

volver() {
throw new Error('Method not implemented.');
}

  constructor(    private dialog: MatDialog,private loginService:LoginService,private fb: UntypedFormBuilder, private profesorService :ProfesorService,private usuarioService:UserService,    private cdRef: ChangeDetectorRef) { }
usuario:any
ngOnInit(): void {
this.listar()

}

async listar(){
  this.usuarioService.findAll().subscribe({
    next: (data) => {
      this.usuario = data.filter(i => i.codigo === this.loginService.getUser().ul_codigo);
      console.log(this.usuario)
    },
  });
}






}
