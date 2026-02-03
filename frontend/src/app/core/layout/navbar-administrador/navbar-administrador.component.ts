import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-navbar-administrador',
  templateUrl: './navbar-administrador.component.html',
  styleUrls: ['./navbar-administrador.component.css']
})
export class NavbarAdministradorComponent implements OnInit {


  isLoggedIn = false;
  user: any = null;
  contenido: any;
  isRouteActive: boolean = true;
  rolMenu: any
  datosmenuPrimero: any
  menuxd: any
  menu2FiltradoPorCategoria: { [categoria: string]: any[] } = {};


  constructor(
    public login: LoginService,
    private router: Router,
    private menu: MenuService) { }

  ngOnInit(): void {
    this.listarRolMenu()


    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      () => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )

  }

  async listarRolMenu() {
    this.menu.listarPorRol("ROL", "0001").subscribe(data => {
      this.rolMenu = data
      this.listarMenuPrimero();
      this.listarMenuSegundo('');
    })
  }


  async listarMenuPrimero() {
    this.menu.listarmenuPrimero().subscribe(
      data => {
        this.menuxd = data

        this.datosmenuPrimero = this.menuxd.filter(
          (item: { rol: { codigo: string } | null }) =>
            item.rol && (item.rol.codigo === 'ROL' || item.rol.codigo === '0001')
        );

      }
    );
  }

  toggleSubMenu(menuItem: any): void {
    menuItem.mostrarSubMenu = !menuItem.mostrarSubMenu;

    if (menuItem.mostrarSubMenu) {
      this.menu2FiltradoPorCategoria[menuItem.categoria] = this.menu2.filter((i: { categoria: any; }) => i.categoria === menuItem.categoria);
      if (this.menu2FiltradoPorCategoria[menuItem.categoria].length === 0) {
        this.router.navigate(['/administrador']);
      }
    } else {
      this.menu2FiltradoPorCategoria[menuItem.categoria] = [];
    }
  }

  menu2: any
  async listarMenuSegundo(categoria: any) {
    this.menu.listarmenuSegundo(categoria).subscribe(
      data => {
        this.menu2 = data
      }
    );
  }

  logout() {
    this.login.logout();
    this.router.navigate(['/login']);
  }

  status = false;
  addToggle() {
    this.status = !this.status;
  }
  
  @ViewChild(MatMenuTrigger) mainMenuTrigger!: MatMenuTrigger;
  closeMainMenu() {
    this.mainMenuTrigger.closeMenu();
  }

}
