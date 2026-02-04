import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HistorialService } from 'src/app/core/services/historial.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-reg-actividades',
  templateUrl: './reg-actividades.component.html',
  styleUrls: ['./reg-actividades.component.css']
})
export class RegActividadesComponent implements OnInit {

  user: any = null;
  datosTabla: any[] = [];
  pagedData: any[] = [];
  pageSizeOptions: number[] = [5, 10, 20, 45, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalItems: number = 0;
  pageSize = 10;

  constructor(
    private loginService: LoginService,
    private historialService: HistorialService,
    private change: ChangeDetectorRef,

  ) {
  }

  ngOnInit(): void {
    this.listarGeneral();
  }

  pageSizeChanged() {
    this.paginator.firstPage();
    this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
  }

  pageChanged(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedData = this.datosTabla.slice(startIndex, endIndex);
  }

  async listarGeneral() {
    this.historialService.listar(this.loginService.getUser().ul_codigo).subscribe((data) => {
      this.datosTabla = data.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
      this.totalItems = this.datosTabla.length;
      this.pagedData = this.datosTabla;
      this.pageChanged({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
      this.change.markForCheck();
    });
  }
}
