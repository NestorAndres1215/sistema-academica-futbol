import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-navbar-estudiante',
  templateUrl: './navbar-estudiante.component.html',
  styleUrls: ['./navbar-estudiante.component.css']
})
export class NavbarEstudianteComponent implements OnInit {


  isLoggedIn = false;
  user: any = null;
  contenido: any;
  isRouteActive: boolean = true;
  rolMenu: any




  constructor(
    public login: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private menu: MenuService) { }

  ngOnInit(): void {
    this.listarRolMenu()
   
    
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
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

 datosmenuPrimero: any
  menuxd: any
  async listarMenuPrimero() {
    this.menu.listarmenuPrimero().subscribe(
      data => {
        this.menuxd = data

      this.datosmenuPrimero = this.menuxd.filter(
          (item: { rol: { codigo: string } | null }) =>
            item.rol && (item.rol.codigo === 'ROL' || item.rol.codigo === '0002')
        );

      }
    );
  }
  menu2FiltradoPorCategoria: { [categoria: string]: any[] } = {};
  toggleSubMenu(menuItem: any): void {
    menuItem.mostrarSubMenu = !menuItem.mostrarSubMenu;

    if (menuItem.mostrarSubMenu) {

      this.menu2FiltradoPorCategoria[menuItem.categoria] = this.menu2.filter((i: { categoria: any; }) => i.categoria === menuItem.categoria);
      if (this.menu2FiltradoPorCategoria[menuItem.categoria].length === 0) {
        this.router.navigate(['/admin']);
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

  public logout() {
    this.login.logout();
    window.location.href = '/login';
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
