import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClaseService } from 'src/app/core/services/clase.service';
import { AdminCargaClaseComponent } from '../admin-carga-clase/admin-carga-clase.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminCargaEditClaseComponent } from '../admin-carga-edit-clase/admin-carga-edit-clase.component';

@Component({
  selector: 'app-admin-clase-dia',
  templateUrl: './admin-clase-dia.component.html',
  styleUrls: ['./admin-clase-dia.component.css']
})
export class AdminClaseDiaComponent implements OnInit {
  editar() {
    const dialogRef = this.dialog.open(AdminCargaEditClaseComponent, {
      width: '1050px',
      disableClose: true,
      height: '750px',
      data: {
        codigo: this.codigo,
        dia: this.dias,
        titulo: this.titulo,
        objetivo: this.objetivo,
        descripcion: this.descripcion,
        codigoClase: this.codigoClase

      },
    });

    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
    })
  }
  registrar() {
    const dialogRef = this.dialog.open(AdminCargaClaseComponent, {
      width: '1050px',
      disableClose: true,
        height: '750px',
      data: {
        codigo: this.codigo,
        dia: this.dias,

      },
    });
    dialogRef.afterClosed().subscribe(data => {
      this.listarClase()
    })
  }
  
  @Input() dias: string = '';
  constructor(private claseService: ClaseService, private route: ActivatedRoute, private dialog: MatDialog) { }
  codigo: string
  ngOnInit(): void {

    this.codigo = this.route.snapshot.params['codigo']
    this.listarClase()
  }
  claseListar: any
  titulo: string
  objetivo: string
  descripcion: string
  codigoClase: string

  async listarClase() {
    this.claseService.listarClaseDevActivado().subscribe((data) => {
      data = data.filter(index => index.clase.codigo == this.codigo)
      const claseEncontrada = data.filter(index => index.dia == this.dias);

      this.claseListar = claseEncontrada
      const claseEncontrada2 = claseEncontrada.find(index => index.dia == this.dias);
      this.titulo = claseEncontrada2.titulo
      this.descripcion = claseEncontrada2.descripcion
      this.objetivo = claseEncontrada2.objetivo
      this.codigoClase = claseEncontrada2.codigo
    })
  }

  formatTexto(texto: string): string {
    return texto.replace(/\n/g, '<br>');
  }


}
