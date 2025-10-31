import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;  // Variable para controlar el estado del menú

  constructor() { }

  ngOnInit(): void {
  }

  // Método para abrir y cerrar el menú
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}