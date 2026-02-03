import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
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
import { authInterceptorProviders } from './core/interceptor/auth.interceptor';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NavbarAdministradorComponent } from './core/layout/navbar-administrador/navbar-administrador.component';
import { NavbarEstudianteComponent } from './core/layout/navbar-estudiante/navbar-estudiante.component';
import { NavbarProfesorComponent } from './core/layout/navbar-profesor/navbar-profesor.component';
import { ModalEliminacionComponent } from './shared/modal/modal-eliminacion/modal-eliminacion.component';
import localeEs from '@angular/common/locales/es';
import { ModalEventsComponent } from './shared/modal/modal-events/modal-events.component';
import { MatTooltipModule } from '@angular/material/tooltip';
registerLocaleData(localeEs, 'es');
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EditEquipoComponent } from './features/admin/asignacion/edit-equipo/edit-equipo.component';
import { EquipoPerfilComponent } from './features/admin/asignacion/equipo-perfil/equipo-perfil.component';
import { EquipoComponent } from './features/admin/asignacion/equipo/equipo.component';
import { LsDesEquipoComponent } from './features/admin/asignacion/ls-des-equipo/ls-des-equipo.component';
import { MantEquipoComponent } from './features/admin/asignacion/mant-equipo/mant-equipo.component';
import { RegAsginacionComponent } from './features/admin/asignacion/reg-asginacion/reg-asginacion.component';
import { RegERquipoComponent } from './features/admin/asignacion/reg-erquipo/reg-erquipo.component';
import { VisorEqupoComponent } from './features/admin/asignacion/visor-equpo/visor-equpo.component';
import { CalendarioComponent } from './features/admin/calendario/calendario/calendario.component';
import { EditHorarioComponent } from './features/admin/calendario/edit-horario/edit-horario.component';
import { HorarioComponent } from './features/admin/calendario/horario/horario.component';
import { LstDesHorarioComponent } from './features/admin/calendario/lst-des-horario/lst-des-horario.component';
import { RegHorarioComponent } from './features/admin/calendario/reg-horario/reg-horario.component';
import { VisorHorarioComponent } from './features/admin/calendario/visor-horario/visor-horario.component';
import { EstudianteExcelComponent } from './features/admin/carga-archivos/estudiante-excel/estudiante-excel.component';
import { ProfesoresExcelComponent } from './features/admin/carga-archivos/profesores-excel/profesores-excel.component';
import { EditClaseComponent } from './features/admin/clase/edit-clase/edit-clase.component';
import { LisDesClaseComponent } from './features/admin/clase/lis-des-clase/lis-des-clase.component';
import { LsClaseComponent } from './features/admin/clase/ls-clase/ls-clase.component';
import { VisorClaseComponent } from './features/admin/clase/visor-clase/visor-clase.component';
import { CargoComponent } from './features/admin/configuracion/cargo/cargo/cargo.component';
import { EditCargoComponent } from './features/admin/configuracion/cargo/edit-cargo/edit-cargo.component';
import { LstDesCargoComponent } from './features/admin/configuracion/cargo/lst-des-cargo/lst-des-cargo.component';
import { RegCargoComponent } from './features/admin/configuracion/cargo/reg-cargo/reg-cargo.component';
import { VisorCargoComponent } from './features/admin/configuracion/cargo/visor-cargo/visor-cargo.component';
import { AdminContrasenaComponent } from './features/admin/configuracion/contraseña/admin-contrasena/admin-contrasena.component';
import { EstudianteContrasenaComponent } from './features/admin/configuracion/contraseña/estudiante-contrasena/estudiante-contrasena.component';
import { ListarUsuarioAdminComponent } from './features/admin/configuracion/contraseña/listar-usuario-admin/listar-usuario-admin.component';
import { ProfesorContrasenaComponent } from './features/admin/configuracion/contraseña/profesor-contrasena/profesor-contrasena.component';
import { ActividadesComponent } from './features/admin/configuracion/registro/actividades/actividades.component';
import { EditSedeComponent } from './features/admin/configuracion/sede/edit-sede/edit-sede.component';
import { LstDesSedeComponent } from './features/admin/configuracion/sede/lst-des-sede/lst-des-sede.component';
import { RegSedeComponent } from './features/admin/configuracion/sede/reg-sede/reg-sede.component';
import { SedeComponent } from './features/admin/configuracion/sede/sede/sede.component';
import { VisorSedeComponent } from './features/admin/configuracion/sede/visor-sede/visor-sede.component';
import { EditDevComponent } from './features/admin/configuracion/tabla-generales/edit-dev/edit-dev.component';
import { EditTbGeneralComponent } from './features/admin/configuracion/tabla-generales/edit-tb-general/edit-tb-general.component';
import { LsTablaGeneralComponent } from './features/admin/configuracion/tabla-generales/ls-tabla-general/ls-tabla-general.component';
import { LstDesLtDevComponent } from './features/admin/configuracion/tabla-generales/lst-des-lt-dev/lst-des-lt-dev.component';
import { LstDesTbGeneralComponent } from './features/admin/configuracion/tabla-generales/lst-des-tb-general/lst-des-tb-general.component';
import { LtDevComponent } from './features/admin/configuracion/tabla-generales/lt-dev/lt-dev.component';
import { RegDevComponent } from './features/admin/configuracion/tabla-generales/reg-dev/reg-dev.component';
import { RegTbGeneralComponent } from './features/admin/configuracion/tabla-generales/reg-tb-general/reg-tb-general.component';
import { VisorTbGeneralComponent } from './features/admin/configuracion/tabla-generales/visor-tb-general/visor-tb-general.component';
import { DatosPersonalesComponent } from './features/admin/datos-personales/datos-personales.component';
import { EdtDatosComponent } from './features/admin/datos-personales/edt-datos/edt-datos.component';
import { DvEstPerfilComponent } from './features/admin/estudiante/dv-est-perfil/dv-est-perfil.component';
import { EditEstudianteComponent } from './features/admin/estudiante/edit-estudiante/edit-estudiante.component';
import { EstudianteComponent } from './features/admin/estudiante/estudiante/estudiante.component';
import { ListEstudianteComponent } from './features/admin/estudiante/list-estudiante/list-estudiante.component';
import { LstDesEstudianteComponent } from './features/admin/estudiante/lst-des-estudiante/lst-des-estudiante.component';
import { RegEstudianteComponent } from './features/admin/estudiante/reg-estudiante/reg-estudiante.component';
import { VisorEstudianteComponent } from './features/admin/estudiante/visor-estudiante/visor-estudiante.component';
import { HistorialEvaluacionAdminComponent } from './features/admin/evaluacion/historial-evaluacion-admin/historial-evaluacion-admin.component';
import { ModuloAdminEvaluacionComponent } from './features/admin/evaluacion/modulo-admin-evaluacion/modulo-admin-evaluacion.component';
import { HomeAdminComponent } from './features/admin/home-admin/home-admin.component';
import { LsLesionesComponent } from './features/admin/lesiones/ls-lesiones/ls-lesiones.component';
import { VisorLesionComponent } from './features/admin/lesiones/visor-lesion/visor-lesion.component';
import { VisorLesiondetComponent } from './features/admin/lesiones/visor-lesiondet/visor-lesiondet.component';
import { AdminCargaClaseComponent } from './features/admin/modulo-clases/admin-carga-clase/admin-carga-clase.component';
import { AdminCargaEditClaseComponent } from './features/admin/modulo-clases/admin-carga-edit-clase/admin-carga-edit-clase.component';
import { AdminClaseDiaComponent } from './features/admin/modulo-clases/admin-clase-dia/admin-clase-dia.component';
import { AdminClasesComponent } from './features/admin/modulo-clases/admin-clases/admin-clases.component';
import { AdminClaveDevComponent } from './features/admin/modulo-clases/admin-clave-dev/admin-clave-dev.component';
import { AdminDevClassComponent } from './features/admin/modulo-clases/admin-dev-class/admin-dev-class.component';
import { EditPartidoComponent } from './features/admin/partido/edit-partido/edit-partido.component';
import { EstadisticasPartidoAdminComponent } from './features/admin/partido/estadisticas-partido-admin/estadisticas-partido-admin.component';
import { HistorialEditAdminComponent } from './features/admin/partido/historial-edit-admin/historial-edit-admin.component';
import { HistorialPartidoAdminComponent } from './features/admin/partido/historial-partido-admin/historial-partido-admin.component';
import { LsPartidoComponent } from './features/admin/partido/ls-partido/ls-partido.component';
import { RegPartidoComponent } from './features/admin/partido/reg-partido/reg-partido.component';
import { VisorPartidoComponent } from './features/admin/partido/visor-partido/visor-partido.component';
import { PrincipalComponent } from './features/admin/principal/principal.component';
import { DvProPerfilComponent } from './features/admin/profesor/dv-pro-perfil/dv-pro-perfil.component';
import { EditProfesorComponent } from './features/admin/profesor/edit-profesor/edit-profesor.component';
import { LstDesProfesorComponent } from './features/admin/profesor/lst-des-profesor/lst-des-profesor.component';
import { LstProfesoresComponent } from './features/admin/profesor/lst-profesores/lst-profesores.component';
import { ProfesorComponent } from './features/admin/profesor/profesor/profesor.component';
import { RegistrarProfesorComponent } from './features/admin/profesor/registrar-profesor/registrar-profesor.component';
import { VisorProfesorComponent } from './features/admin/profesor/visor-profesor/visor-profesor.component';
import { DtUsuarioComponent } from './features/admin/usuario/dt-usuario/dt-usuario.component';
import { EditUsuarioComponent } from './features/admin/usuario/edit-usuario/edit-usuario.component';
import { LsDesUsuarioComponent } from './features/admin/usuario/ls-des-usuario/ls-des-usuario.component';
import { LstUsuarioComponent } from './features/admin/usuario/lst-usuario/lst-usuario.component';
import { RegUsuarioComponent } from './features/admin/usuario/reg-usuario/reg-usuario.component';
import { UsuarioAdministradorComponent } from './features/admin/usuario/usuario-administrador/usuario-administrador.component';
import { VisorUsuarioComponent } from './features/admin/usuario/visor-usuario/visor-usuario.component';
import { LoginComponent } from './features/auth/login/login.component';
import { CalendarioEstudianteComponent } from './features/estudiante/calendario/calendario-estudiante/calendario-estudiante.component';
import { AlumnosEstudianteComponent } from './features/estudiante/clases/alumnos-estudiante/alumnos-estudiante.component';
import { ClaseDevEstudianteComponent } from './features/estudiante/clases/clase-dev-estudiante/clase-dev-estudiante.component';
import { DetalleClaseEstudianteComponent } from './features/estudiante/clases/detalle-clase-estudiante/detalle-clase-estudiante.component';
import { EstudianteDiaClaseComponent } from './features/estudiante/clases/estudiante-dia-clase/estudiante-dia-clase.component';
import { GraficoEstudianteEvaluacionComponent } from './features/estudiante/clases/evaluacion/grafico-estudiante-evaluacion/grafico-estudiante-evaluacion.component';
import { HistorialEstudianteEvaluacionComponent } from './features/estudiante/clases/evaluacion/historial-estudiante-evaluacion/historial-estudiante-evaluacion.component';
import { ModuloEvaluacionEstudianteComponent } from './features/estudiante/clases/evaluacion/modulo-evaluacion-estudiante/modulo-evaluacion-estudiante.component';
import { LesionEstudianteComponent } from './features/estudiante/clases/lesion-estudiante/lesion-estudiante.component';
import { ProfeEstudianteComponent } from './features/estudiante/clases/profe-estudiante/profe-estudiante.component';
import { ResumenEstudianteComponent } from './features/estudiante/clases/resumen-estudiante/resumen-estudiante.component';
import { DpEstduanteComponent } from './features/estudiante/datos-personales/dp-estduante/dp-estduante.component';
import { EditPerfilEstudianteComponent } from './features/estudiante/datos-personales/edit-perfil-estudiante/edit-perfil-estudiante.component';
import { HomeEstudianteComponent } from './features/estudiante/home-estudiante/home-estudiante.component';
import { HistorialPartidoEstudianteComponent } from './features/estudiante/partido/historial-partido-estudiante/historial-partido-estudiante.component';
import { PartidoEstudianteComponent } from './features/estudiante/partido/partido-estudiante/partido-estudiante.component';
import { PrincipalEstudianteComponent } from './features/estudiante/principal-estudiante/principal-estudiante.component';
import { CalendarioProfesorComponent } from './features/profesor/calendario/calendario-profesor/calendario-profesor.component';
import { ClaseDevComponent } from './features/profesor/clases/clase-dev/clase-dev.component';
import { ClasesComponent } from './features/profesor/clases/clases/clases.component';
import { DetalleClaseComponent } from './features/profesor/clases/detalle-clase/detalle-clase.component';
import { EstudianteDevProComponent } from './features/profesor/clases/estudiante-dev-pro/estudiante-dev-pro.component';
import { GraficoEvaluacionProfesorComponent } from './features/profesor/clases/evaluacion/grafico-evaluacion-profesor/grafico-evaluacion-profesor.component';
import { HistorialEvaluacionProfesorComponent } from './features/profesor/clases/evaluacion/historial-evaluacion-profesor/historial-evaluacion-profesor.component';
import { HistorialEvaluacionComponent } from './features/profesor/clases/evaluacion/historial-evaluacion/historial-evaluacion.component';
import { ModuloEvaluacionComponent } from './features/profesor/clases/evaluacion/modulo-evaluacion/modulo-evaluacion.component';
import { InformacionComponent } from './features/profesor/clases/informacion/informacion.component';
import { ProfesorDevProComponent } from './features/profesor/clases/profesor-dev-pro/profesor-dev-pro.component';
import { ProfesorDiaClaseComponent } from './features/profesor/clases/profesor-dia-clase/profesor-dia-clase.component';
import { ResumenClaProDevComponent } from './features/profesor/clases/resumen-cla-pro-dev/resumen-cla-pro-dev.component';
import { ActualizarContraComponent } from './features/profesor/configuracion/actualizar-contra/actualizar-contra.component';
import { EditContraComponent } from './features/profesor/configuracion/edit-contra/edit-contra.component';
import { RegActividadesComponent } from './features/profesor/configuracion/reg-actividades/reg-actividades.component';
import { EditEjecicioComponent } from './features/profesor/ejercicio/edit-ejecicio/edit-ejecicio.component';
import { RegEjercicioComponent } from './features/profesor/ejercicio/reg-ejercicio/reg-ejercicio.component';
import { AsignacionEstudianteComponent } from './features/profesor/estudiante/asignacion-estudiante/asignacion-estudiante.component';
import { HomeProfesorComponent } from './features/profesor/home-profesor/home-profesor.component';
import { EditRegDetalleLesionesComponent } from './features/profesor/lesiones/edit-reg-detalle-lesiones/edit-reg-detalle-lesiones.component';
import { ModuloLesionesComponent } from './features/profesor/lesiones/modulo-lesiones/modulo-lesiones.component';
import { RegLesionesComponent } from './features/profesor/lesiones/reg-lesiones/reg-lesiones.component';
import { EstadisticasPartidoComponent } from './features/profesor/partido/estadisticas-partido/estadisticas-partido.component';
import { HistorialPartidoProfesoresComponent } from './features/profesor/partido/historial-partido-profesores/historial-partido-profesores.component';
import { ModuloPartidoComponent } from './features/profesor/partido/modulo-partido/modulo-partido.component';
import { DatosPersonalesProfesoresComponent } from './features/profesor/perfil/datos-personales-profesores/datos-personales-profesores.component';
import { EditPerfilComponent } from './features/profesor/perfil/edit-perfil/edit-perfil.component';
import { PrincipalProfesorComponent } from './features/profesor/principal-profesor/principal-profesor.component';
import { ButtonComponent } from './shared/button/button.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { TablaComponent } from './shared/tabla/tabla.component';
import { SearchComponent } from './shared/search/search.component';
import { FilterSelectComponent } from './shared/filter-select/filter-select.component';
import { PaginationComponent } from './shared/pagination/pagination.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [

    LoginComponent,
    NavbarAdministradorComponent,
    HomeAdminComponent,
    DatosPersonalesComponent,
    NavbarEstudianteComponent,
    HomeEstudianteComponent,
    PrincipalEstudianteComponent,
    NavbarProfesorComponent,
    HomeProfesorComponent,
    PrincipalProfesorComponent,
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
    ModuloEvaluacionComponent,
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

    EditPerfilEstudianteComponent,
    DetalleClaseEstudianteComponent,
    ClaseDevEstudianteComponent,
    EstudianteDiaClaseComponent,
    ResumenEstudianteComponent,
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
    ButtonComponent,
    TituloComponent,
    TablaComponent,
    SearchComponent,
    FilterSelectComponent,
    PaginationComponent,
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
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],

  providers: [authInterceptorProviders, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }