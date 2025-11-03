import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
//importaciones de angular material
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDividerModule } from '@angular/material/divider';
import { MatSortModule } from '@angular/material/sort';
//importacion del component
import { authInterceptorProviders } from './interceptor/auth.interceptor';
import { PrincipalComponent } from './modules/principal/principal.component';
import { CommonModule, registerLocaleData } from '@angular/common';
//PAGES
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { SedesComponent } from './pages/sedes/sedes.component';
//COMPONENTES
import { NavbarComponent } from './pages/components/navbar/navbar.component';
import { FooterComponent } from './pages/components/footer/footer.component';
//ADMIN
import { NavbarAdministradorComponent } from './modules/admin/components/navbar-administrador/navbar-administrador.component';
import { HomeAdminComponent } from './modules/admin/home-admin/home-admin.component';
import { DatosPersonalesComponent } from './modules/admin/datos-personales/datos-personales.component';
import { LoginComponent } from './modules/config/login/login.component';
import { HomeEstudianteComponent } from './modules/estudiante/home-estudiante/home-estudiante.component';
import { HomeProfesorComponent } from './modules/profesor/home-profesor/home-profesor.component';
import { NavbarEstudianteComponent } from './modules/estudiante/navbar-estudiante/navbar-estudiante.component';
import { NavbarProfesorComponent } from './modules/profesor/components/navbar-profesor/navbar-profesor.component';
import { PrincipalEstudianteComponent } from './modules/estudiante/principal-estudiante/principal-estudiante.component';
import { PrincipalProfesorComponent } from './modules/profesor/principal-profesor/principal-profesor.component';
import { RegUsuarioComponent } from './modules/admin/usuario/reg-usuario/reg-usuario.component';
import { UsuarioAdministradorComponent } from './modules/admin/usuario/usuario-administrador/usuario-administrador.component';
import { LstUsuarioComponent } from './modules/admin/usuario/lst-usuario/lst-usuario.component';
import { VisorUsuarioComponent } from './modules/admin/usuario/visor-usuario/visor-usuario.component';
import { EditUsuarioComponent } from './modules/admin/usuario/edit-usuario/edit-usuario.component';
import { DtUsuarioComponent } from './modules/admin/usuario/dt-usuario/dt-usuario.component';
import { EdtDatosComponent } from './modules/admin/datos-personales/edt-datos/edt-datos.component';
import { ModalEliminacionComponent } from './modules/admin/components/modal-eliminacion/modal-eliminacion.component';
import { LsDesUsuarioComponent } from './modules/admin/usuario/ls-des-usuario/ls-des-usuario.component';
import { ModalRestaurancionComponent } from './modules/admin/components/modal-restaurancion/modal-restaurancion.component';
import { RegistrarProfesorComponent } from './modules/admin/profesor/registrar-profesor/registrar-profesor.component';
import { SedeComponent } from './modules/admin/configuracion/sede/sede/sede.component';
import { EditSedeComponent } from './modules/admin/configuracion/sede/edit-sede/edit-sede.component';
import { RegSedeComponent } from './modules/admin/configuracion/sede/reg-sede/reg-sede.component';
import { VisorSedeComponent } from './modules/admin/configuracion/sede/visor-sede/visor-sede.component';
import { LstDesSedeComponent } from './modules/admin/configuracion/sede/lst-des-sede/lst-des-sede.component';
import { CargoComponent } from './modules/admin/configuracion/cargo/cargo/cargo.component';
import { VisorCargoComponent } from './modules/admin/configuracion/cargo/visor-cargo/visor-cargo.component';
import { EditCargoComponent } from './modules/admin/configuracion/cargo/edit-cargo/edit-cargo.component';
import { RegCargoComponent } from './modules/admin/configuracion/cargo/reg-cargo/reg-cargo.component';
import { LstDesCargoComponent } from './modules/admin/configuracion/cargo/lst-des-cargo/lst-des-cargo.component';
import { ProfesorComponent } from './modules/admin/profesor/profesor/profesor.component';
import { VisorProfesorComponent } from './modules/admin/profesor/visor-profesor/visor-profesor.component';
import { EditProfesorComponent } from './modules/admin/profesor/edit-profesor/edit-profesor.component';
import { LstDesProfesorComponent } from './modules/admin/profesor/lst-des-profesor/lst-des-profesor.component';
import { LstProfesoresComponent } from './modules/admin/profesor/lst-profesores/lst-profesores.component';
import { LsTablaGeneralComponent } from './modules/admin/configuracion/tabla-generales/ls-tabla-general/ls-tabla-general.component';
import { RegTbGeneralComponent } from './modules/admin/configuracion/tabla-generales/reg-tb-general/reg-tb-general.component';
import { EditTbGeneralComponent } from './modules/admin/configuracion/tabla-generales/edit-tb-general/edit-tb-general.component';
import { VisorTbGeneralComponent } from './modules/admin/configuracion/tabla-generales/visor-tb-general/visor-tb-general.component';
import { LtDevComponent } from './modules/admin/configuracion/tabla-generales/lt-dev/lt-dev.component';
import { EditDevComponent } from './modules/admin/configuracion/tabla-generales/edit-dev/edit-dev.component';
import { RegDevComponent } from './modules/admin/configuracion/tabla-generales/reg-dev/reg-dev.component';
import { DvProPerfilComponent } from './modules/admin/profesor/dv-pro-perfil/dv-pro-perfil.component';
import { ListEstudianteComponent } from './modules/admin/estudiante/list-estudiante/list-estudiante.component';
import { RegEstudianteComponent } from './modules/admin/estudiante/reg-estudiante/reg-estudiante.component';
import { LstDesEstudianteComponent } from './modules/admin/estudiante/lst-des-estudiante/lst-des-estudiante.component';
import { EditEstudianteComponent } from './modules/admin/estudiante/edit-estudiante/edit-estudiante.component';
import { VisorEstudianteComponent } from './modules/admin/estudiante/visor-estudiante/visor-estudiante.component';
import { EstudianteComponent } from './modules/admin/estudiante/estudiante/estudiante.component';
import { DvEstPerfilComponent } from './modules/admin/estudiante/dv-est-perfil/dv-est-perfil.component';
import { LstDesTbGeneralComponent } from './modules/admin/configuracion/tabla-generales/lst-des-tb-general/lst-des-tb-general.component';
import { LstDesLtDevComponent } from './modules/admin/configuracion/tabla-generales/lst-des-lt-dev/lst-des-lt-dev.component';
import { ActividadesComponent } from './modules/admin/configuracion/registro/actividades/actividades.component';
import localeEs from '@angular/common/locales/es';
import { ProfesoresExcelComponent } from './modules/admin/carga-archivos/profesores-excel/profesores-excel.component';
import { EstudianteExcelComponent } from './modules/admin/carga-archivos/estudiante-excel/estudiante-excel.component';
import { RegAsginacionComponent } from './modules/admin/asignacion/reg-asginacion/reg-asginacion.component';
import { MantEquipoComponent } from './modules/admin/asignacion/mant-equipo/mant-equipo.component';
import { EditEquipoComponent } from './modules/admin/asignacion/edit-equipo/edit-equipo.component';
import { VisorEqupoComponent } from './modules/admin/asignacion/visor-equpo/visor-equpo.component';
import { LsDesEquipoComponent } from './modules/admin/asignacion/ls-des-equipo/ls-des-equipo.component';
import { RegERquipoComponent } from './modules/admin/asignacion/reg-erquipo/reg-erquipo.component';
import { EquipoComponent } from './modules/admin/asignacion/equipo/equipo.component';
import { EquipoPerfilComponent } from './modules/admin/asignacion/equipo-perfil/equipo-perfil.component';
import { LsLesionesComponent } from './modules/admin/lesiones/ls-lesiones/ls-lesiones.component';
import { VisorLesionComponent } from './modules/admin/lesiones/visor-lesion/visor-lesion.component';
import { VisorLesiondetComponent } from './modules/admin/lesiones/visor-lesiondet/visor-lesiondet.component';
import { CalendarioComponent } from './modules/admin/calendario/calendario/calendario.component';  // Importar el locale español
import { CalendarModule } from 'angular-calendar';
import { ModalEventsComponent } from './modules/admin/components/modal-events/modal-events.component';
import { DeleteComponent } from './modules/admin/components/delete/delete.component';  
import { MatTooltipModule } from '@angular/material/tooltip';
registerLocaleData(localeEs, 'es');  
import { MatDatepickerModule } from '@angular/material/datepicker';

import { HorarioComponent } from './modules/admin/calendario/horario/horario.component';
import { VisorHorarioComponent } from './modules/admin/calendario/visor-horario/visor-horario.component';
import { EditHorarioComponent } from './modules/admin/calendario/edit-horario/edit-horario.component';
import { RegHorarioComponent } from './modules/admin/calendario/reg-horario/reg-horario.component';
import { LstDesHorarioComponent } from './modules/admin/calendario/lst-des-horario/lst-des-horario.component';
import { DatosPersonalesProfesoresComponent } from './modules/profesor/perfil/datos-personales-profesores/datos-personales-profesores.component';
import { EditPerfilComponent } from './modules/profesor/perfil/edit-perfil/edit-perfil.component';
import { LsClaseComponent } from './modules/admin/clase/ls-clase/ls-clase.component';
import { LisDesClaseComponent } from './modules/admin/clase/lis-des-clase/lis-des-clase.component';
import { VisorClaseComponent } from './modules/admin/clase/visor-clase/visor-clase.component';
import { EditClaseComponent } from './modules/admin/clase/edit-clase/edit-clase.component';
import { ClasesComponent } from './modules/profesor/clases/clases/clases.component';
import { DetalleClaseComponent } from './modules/profesor/clases/detalle-clase/detalle-clase.component';
import { ClaseDevComponent } from './modules/profesor/clases/clase-dev/clase-dev.component';
import { InformacionComponent } from './modules/profesor/clases/informacion/informacion.component';
import { EstudianteDevProComponent } from './modules/profesor/clases/estudiante-dev-pro/estudiante-dev-pro.component';
import { ResumenClaProDevComponent } from './modules/profesor/clases/resumen-cla-pro-dev/resumen-cla-pro-dev.component';
import { ProfesorDevProComponent } from './modules/profesor/clases/profesor-dev-pro/profesor-dev-pro.component';
import { AdminClasesComponent } from './modules/admin/modulo-clases/admin-clases/admin-clases.component';
import { AdminDevClassComponent } from './modules/admin/modulo-clases/admin-dev-class/admin-dev-class.component';
import { AdminClaveDevComponent } from './modules/admin/modulo-clases/admin-clave-dev/admin-clave-dev.component';
import { AdminClaseDiaComponent } from './modules/admin/modulo-clases/admin-clase-dia/admin-clase-dia.component';
import { AdminCargaClaseComponent } from './modules/admin/modulo-clases/admin-carga-clase/admin-carga-clase.component';
import { AdminCargaEditClaseComponent } from './modules/admin/modulo-clases/admin-carga-edit-clase/admin-carga-edit-clase.component';
import { LsPartidoComponent } from './modules/admin/partido/ls-partido/ls-partido.component';
import { EditPartidoComponent } from './modules/admin/partido/edit-partido/edit-partido.component';
import { RegPartidoComponent } from './modules/admin/partido/reg-partido/reg-partido.component';
import { VisorPartidoComponent } from './modules/admin/partido/visor-partido/visor-partido.component';
import { HistorialPartidoAdminComponent } from './modules/admin/partido/historial-partido-admin/historial-partido-admin.component';
import { HistorialEditAdminComponent } from './modules/admin/partido/historial-edit-admin/historial-edit-admin.component';
import { ProfesorDiaClaseComponent } from './modules/profesor/clases/profesor-dia-clase/profesor-dia-clase.component';
import { RegEjercicioComponent } from './modules/profesor/ejercicio/reg-ejercicio/reg-ejercicio.component';
import { EditEjecicioComponent } from './modules/profesor/ejercicio/edit-ejecicio/edit-ejecicio.component';
import { ModuloPartidoComponent } from './modules/profesor/partido/modulo-partido/modulo-partido.component';
import { HistorialPartidoProfesoresComponent } from './modules/profesor/partido/historial-partido-profesores/historial-partido-profesores.component';
import { EstadisticasPartidoComponent } from './modules/profesor/partido/estadisticas-partido/estadisticas-partido.component';
import { EstadisticasPartidoAdminComponent } from './modules/admin/partido/estadisticas-partido-admin/estadisticas-partido-admin.component';
import { CalendarioProfesorComponent } from './modules/profesor/calendario/calendario-profesor/calendario-profesor.component';
import { AsignacionEstudianteComponent } from './modules/profesor/estudiante/asignacion-estudiante/asignacion-estudiante.component';
import { ModuloLesionesComponent } from './modules/profesor/lesiones/modulo-lesiones/modulo-lesiones.component';
import { RegLesionesComponent } from './modules/profesor/lesiones/reg-lesiones/reg-lesiones.component';
import { DpEstduanteComponent } from './modules/estudiante/datos-personales/dp-estduante/dp-estduante.component';
import { ContraAdminComponent } from './modules/admin/configuracion/contra-admin/contra-admin.component';
import { EditPerfilEstudianteComponent } from './modules/estudiante/datos-personales/edit-perfil-estudiante/edit-perfil-estudiante.component';
import { DetalleClaseEstudianteComponent } from './modules/estudiante/clases/detalle-clase-estudiante/detalle-clase-estudiante.component';
import { ClaseDevEstudianteComponent } from './modules/estudiante/clases/clase-dev-estudiante/clase-dev-estudiante.component';
import { EstudianteDiaClaseComponent } from './modules/estudiante/clases/estudiante-dia-clase/estudiante-dia-clase.component';
import { ResumenEstudianteComponent } from './modules/estudiante/clases/resumen-estudiante/resumen-estudiante.component';
import { DiaEstudianteComponent } from './modules/estudiante/clases/dia-estudiante/dia-estudiante.component';
import { AlumnosEstudianteComponent } from './modules/estudiante/clases/alumnos-estudiante/alumnos-estudiante.component';
import { ProfeEstudianteComponent } from './modules/estudiante/clases/profe-estudiante/profe-estudiante.component';
import { LesionEstudianteComponent } from './modules/estudiante/clases/lesion-estudiante/lesion-estudiante.component';
import { PartidoEstudianteComponent } from './modules/estudiante/partido/partido-estudiante/partido-estudiante.component';
import { HistorialPartidoEstudianteComponent } from './modules/estudiante/partido/historial-partido-estudiante/historial-partido-estudiante.component';
import { CalendarioEstudianteComponent } from './modules/estudiante/calendario/calendario-estudiante/calendario-estudiante.component';
import { ModuloEvaluacionComponent } from './modules/profesor/clases/evaluacion/modulo-evaluacion/modulo-evaluacion.component';
import { HistorialEvaluacionComponent } from './modules/profesor/clases/evaluacion/historial-evaluacion/historial-evaluacion.component';
import { HistorialEvaluacionProfesorComponent } from './modules/profesor/clases/evaluacion/historial-evaluacion-profesor/historial-evaluacion-profesor.component';
import { GraficoEvaluacionProfesorComponent } from './modules/profesor/clases/evaluacion/grafico-evaluacion-profesor/grafico-evaluacion-profesor.component';
import { ModuloAdminEvaluacionComponent } from './modules/admin/evaluacion/modulo-admin-evaluacion/modulo-admin-evaluacion.component';
import { HistorialEvaluacionAdminComponent } from './modules/admin/evaluacion/historial-evaluacion-admin/historial-evaluacion-admin.component';
import { ModuloEvaluacionEstudianteComponent } from './modules/estudiante/clases/evaluacion/modulo-evaluacion-estudiante/modulo-evaluacion-estudiante.component';
import { HistorialEstudianteEvaluacionComponent } from './modules/estudiante/clases/evaluacion/historial-estudiante-evaluacion/historial-estudiante-evaluacion.component';
import { GraficoEstudianteEvaluacionComponent } from './modules/estudiante/clases/evaluacion/grafico-estudiante-evaluacion/grafico-estudiante-evaluacion.component';
import { RegActividadesComponent } from './modules/profesor/configuracion/reg-actividades/reg-actividades.component';
import { ActualizarContraComponent } from './modules/profesor/configuracion/actualizar-contra/actualizar-contra.component';
import { EditContraComponent } from './modules/profesor/configuracion/edit-contra/edit-contra.component';
import { ListarUsuarioAdminComponent } from './modules/admin/configuracion/contraseña/listar-usuario-admin/listar-usuario-admin.component';
import { ProfesorContrasenaComponent } from './modules/admin/configuracion/contraseña/profesor-contrasena/profesor-contrasena.component';
import { EstudianteContrasenaComponent } from './modules/admin/configuracion/contraseña/estudiante-contrasena/estudiante-contrasena.component';
import { AdminContrasenaComponent } from './modules/admin/configuracion/contraseña/admin-contrasena/admin-contrasena.component';
import { EditRegDetalleLesionesComponent } from './modules/profesor/lesiones/edit-reg-detalle-lesiones/edit-reg-detalle-lesiones.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    //PAGES
    InicioComponent,
    NosotrosComponent,
    SedesComponent,
    LoginComponent,
    //COMPONENTES
    NavbarComponent,
    FooterComponent,
    //ADMINISTRADOR
    NavbarAdministradorComponent,
    HomeAdminComponent,
    DatosPersonalesComponent,
    //ESTUDIANTE
    NavbarEstudianteComponent,
    HomeEstudianteComponent,
    PrincipalEstudianteComponent,
    //PROFESOR
    NavbarProfesorComponent,
    HomeProfesorComponent,
    PrincipalProfesorComponent,

    SedesComponent,

    PrincipalComponent,

    AppComponent,
    RegUsuarioComponent,
    UsuarioAdministradorComponent,
    LstUsuarioComponent,
    VisorUsuarioComponent,
    EditUsuarioComponent,
    DtUsuarioComponent,
    EdtDatosComponent,
    ModalEliminacionComponent,
    LsDesUsuarioComponent,
    ModalRestaurancionComponent,
    RegistrarProfesorComponent,
    SedeComponent,
    RegSedeComponent,
    EditSedeComponent,
    VisorSedeComponent,
    LstDesSedeComponent,
    CargoComponent,
    VisorCargoComponent,
    EditCargoComponent,
    RegCargoComponent,
    LstDesCargoComponent,
    ProfesorComponent,
    VisorProfesorComponent,
    EditProfesorComponent,
    LstDesProfesorComponent,
    LstProfesoresComponent,
    LsTablaGeneralComponent,
    RegTbGeneralComponent,
    EditTbGeneralComponent,
    VisorTbGeneralComponent,
    LtDevComponent,
    EditDevComponent,
    RegDevComponent,
    DvProPerfilComponent,
    RegEstudianteComponent,
     ListEstudianteComponent,
     LstDesEstudianteComponent,
     EditEstudianteComponent,
     VisorEstudianteComponent,
     EstudianteComponent,
     DvEstPerfilComponent,
     LstDesTbGeneralComponent,
     LstDesLtDevComponent,
     ActividadesComponent,
     ProfesoresExcelComponent,
     EstudianteExcelComponent,
     RegAsginacionComponent,
     MantEquipoComponent,
     EditEquipoComponent,
     VisorEqupoComponent,
     LsDesEquipoComponent,
     RegERquipoComponent,
     EquipoComponent,
     EquipoPerfilComponent,
     LsLesionesComponent,
     VisorLesionComponent,
     VisorLesiondetComponent,
     CalendarioComponent,
     ModalEventsComponent,
     DeleteComponent,
   
     HorarioComponent,
     VisorHorarioComponent,
     EditHorarioComponent,
     RegHorarioComponent,
     LstDesHorarioComponent,
     DatosPersonalesProfesoresComponent,
     EditPerfilComponent,
     LsClaseComponent,
     LisDesClaseComponent,
     VisorClaseComponent,
     EditClaseComponent,
     ClasesComponent,
     DetalleClaseComponent,
     ClaseDevComponent,
     InformacionComponent,
     EstudianteDevProComponent,
     ResumenClaProDevComponent,
     ProfesorDevProComponent,
     AdminClasesComponent,
     AdminDevClassComponent,
     AdminClaveDevComponent,
     AdminClaseDiaComponent,
     AdminCargaClaseComponent,
     AdminCargaEditClaseComponent,
     LsPartidoComponent,
     EditPartidoComponent,
     RegPartidoComponent,
     VisorPartidoComponent,
     HistorialPartidoAdminComponent,
     HistorialEditAdminComponent,
     ProfesorDiaClaseComponent,
     RegEjercicioComponent,
     EditEjecicioComponent,
     ModuloPartidoComponent,
     HistorialPartidoProfesoresComponent,
     EstadisticasPartidoComponent,
     EstadisticasPartidoAdminComponent,
     CalendarioProfesorComponent,
     AsignacionEstudianteComponent,
     ModuloLesionesComponent,
     RegLesionesComponent,
     DpEstduanteComponent,
     ContraAdminComponent,
     EditPerfilEstudianteComponent,
     DetalleClaseEstudianteComponent,
     ClaseDevEstudianteComponent,
     EstudianteDiaClaseComponent,
     ResumenEstudianteComponent,
     DiaEstudianteComponent,
     AlumnosEstudianteComponent,
     ProfeEstudianteComponent,
     LesionEstudianteComponent,
     PartidoEstudianteComponent,
     HistorialPartidoEstudianteComponent,
     CalendarioEstudianteComponent,
     ModuloEvaluacionComponent,
     HistorialEvaluacionComponent,
     HistorialEvaluacionProfesorComponent,
     GraficoEvaluacionProfesorComponent,
     ModuloAdminEvaluacionComponent,
     HistorialEvaluacionAdminComponent,
     ModuloEvaluacionEstudianteComponent,
     HistorialEstudianteEvaluacionComponent,
     GraficoEstudianteEvaluacionComponent,
     RegActividadesComponent,
     ActualizarContraComponent,
     EditContraComponent,
     ListarUsuarioAdminComponent,
     ProfesorContrasenaComponent,
     EstudianteContrasenaComponent,
     AdminContrasenaComponent,
     EditRegDetalleLesionesComponent,
 

   
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    MatSortModule,
    CommonModule,
    MatTooltipModule,
    MatGridListModule,
    MatOptionModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxPaginationModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatPaginatorModule,
    FormsModule, // Si estás usando formularios basados en plantillas
    ReactiveFormsModule, // Si estás usando formularios reactivos
    MatNativeDateModule,
   
    MatDatepickerModule,

  ],

  providers: [authInterceptorProviders,{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }