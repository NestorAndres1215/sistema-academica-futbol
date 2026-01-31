import { AdminGuard } from './core/guard/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './modules/principal/principal.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { SedesComponent } from './pages/sedes/sedes.component';
import { LoginComponent } from './modules/config/login/login.component';
//ADMINISTRADOR
import { HomeAdminComponent } from './modules/admin/home-admin/home-admin.component';
import { ProfesorGuard } from './core/guard/profesor.guard';
import { EstudianteGuard } from './core/guard/estudiante.guard';
import { HomeEstudianteComponent } from './modules/estudiante/home-estudiante/home-estudiante.component';
import { PrincipalEstudianteComponent } from './modules/estudiante/principal-estudiante/principal-estudiante.component';
import { HomeProfesorComponent } from './modules/profesor/home-profesor/home-profesor.component';
import { PrincipalProfesorComponent } from './modules/profesor/principal-profesor/principal-profesor.component';
import { DatosPersonalesComponent } from './modules/admin/datos-personales/datos-personales.component';
import { RegUsuarioComponent } from './modules/admin/usuario/reg-usuario/reg-usuario.component';
import { UsuarioAdministradorComponent } from './modules/admin/usuario/usuario-administrador/usuario-administrador.component';
import { LstUsuarioComponent } from './modules/admin/usuario/lst-usuario/lst-usuario.component';
import { SedeComponent } from './modules/admin/configuracion/sede/sede/sede.component';
import { CargoComponent } from './modules/admin/configuracion/cargo/cargo/cargo.component';
import { RegistrarProfesorComponent } from './modules/admin/profesor/registrar-profesor/registrar-profesor.component';
import { ProfesorComponent } from './modules/admin/profesor/profesor/profesor.component';
import { LstProfesoresComponent } from './modules/admin/profesor/lst-profesores/lst-profesores.component';
import { LsTablaGeneralComponent } from './modules/admin/configuracion/tabla-generales/ls-tabla-general/ls-tabla-general.component';
import { RegEstudianteComponent } from './modules/admin/estudiante/reg-estudiante/reg-estudiante.component';
import { ListEstudianteComponent } from './modules/admin/estudiante/list-estudiante/list-estudiante.component';
import { EstudianteComponent } from './modules/admin/estudiante/estudiante/estudiante.component';
import { ActividadesComponent } from './modules/admin/configuracion/registro/actividades/actividades.component';
import { ProfesoresExcelComponent } from './modules/admin/carga-archivos/profesores-excel/profesores-excel.component';
import { EstudianteExcelComponent } from './modules/admin/carga-archivos/estudiante-excel/estudiante-excel.component';
import { RegAsginacionComponent } from './modules/admin/asignacion/reg-asginacion/reg-asginacion.component';
import { MantEquipoComponent } from './modules/admin/asignacion/mant-equipo/mant-equipo.component';
import { EquipoComponent } from './modules/admin/asignacion/equipo/equipo.component';
import { LsLesionesComponent } from './modules/admin/lesiones/ls-lesiones/ls-lesiones.component';
import { CalendarioComponent } from './modules/admin/calendario/calendario/calendario.component';
import { HorarioComponent } from './modules/admin/calendario/horario/horario.component';
import { DatosPersonalesProfesoresComponent } from './modules/profesor/perfil/datos-personales-profesores/datos-personales-profesores.component';
import { LsClaseComponent } from './modules/admin/clase/ls-clase/ls-clase.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ClasesComponent } from './modules/profesor/clases/clases/clases.component';
import { DetalleClaseComponent } from './modules/profesor/clases/detalle-clase/detalle-clase.component';
import { AdminClasesComponent } from './modules/admin/modulo-clases/admin-clases/admin-clases.component';
import { AdminDevClassComponent } from './modules/admin/modulo-clases/admin-dev-class/admin-dev-class.component';
import { LsPartidoComponent } from './modules/admin/partido/ls-partido/ls-partido.component';
import { HistorialPartidoAdminComponent } from './modules/admin/partido/historial-partido-admin/historial-partido-admin.component';
import { ModuloPartidoComponent } from './modules/profesor/partido/modulo-partido/modulo-partido.component';
import { HistorialPartidoProfesoresComponent } from './modules/profesor/partido/historial-partido-profesores/historial-partido-profesores.component';
import { EstadisticasPartidoComponent } from './modules/profesor/partido/estadisticas-partido/estadisticas-partido.component';
import { EstadisticasPartidoAdminComponent } from './modules/admin/partido/estadisticas-partido-admin/estadisticas-partido-admin.component';
import { CalendarioProfesorComponent } from './modules/profesor/calendario/calendario-profesor/calendario-profesor.component';
import { AsignacionEstudianteComponent } from './modules/profesor/estudiante/asignacion-estudiante/asignacion-estudiante.component';
import { ModuloLesionesComponent } from './modules/profesor/lesiones/modulo-lesiones/modulo-lesiones.component';
import { DpEstduanteComponent } from './modules/estudiante/datos-personales/dp-estduante/dp-estduante.component';
import { ContraAdminComponent } from './modules/admin/configuracion/contra-admin/contra-admin.component';
import { DetalleClaseEstudianteComponent } from './modules/estudiante/clases/detalle-clase-estudiante/detalle-clase-estudiante.component';
import { CalendarioEstudianteComponent } from './modules/estudiante/calendario/calendario-estudiante/calendario-estudiante.component';
import { HistorialPartidoEstudianteComponent } from './modules/estudiante/partido/historial-partido-estudiante/historial-partido-estudiante.component';
import { PartidoEstudianteComponent } from './modules/estudiante/partido/partido-estudiante/partido-estudiante.component';
import { RegActividadesComponent } from './modules/profesor/configuracion/reg-actividades/reg-actividades.component';
import { ActualizarContraComponent } from './modules/profesor/configuracion/actualizar-contra/actualizar-contra.component';
import { ListarUsuarioAdminComponent } from './modules/admin/configuracion/contraseña/listar-usuario-admin/listar-usuario-admin.component';
registerLocaleData(localeEs, 'es');
const routes: Routes = [
  { path: 'inicio', component: InicioComponent, pathMatch: 'full' },
  { path: 'sedes', component: SedesComponent, pathMatch: 'full' },
  { path: 'nosotros', component: NosotrosComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  //ADMINISTRADOR
  {
    path: 'administrador', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: PrincipalComponent, },
    ]
  },
  {
    path: 'utilitarios', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'carga-profesores-excel', component: ProfesoresExcelComponent, },
      { path: 'carga-estudiantes-excel', component: EstudianteExcelComponent, },
    ]
  },

  {
    path: 'perfil', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'datos-personales', component: DatosPersonalesComponent }
    ]
  },
  {
    path: 'usuario', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'registro-usuario-administrador', component: RegUsuarioComponent },
      { path: 'usuario-administrador', component: UsuarioAdministradorComponent },
      { path: 'listar-usuario-administrador', component: LstUsuarioComponent }
    ]
  },
  {
    path: 'configuracion', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'tabla-generales', component: LsTablaGeneralComponent },
      { path: 'sede', component: SedeComponent },
      { path: 'cargo', component: CargoComponent },
      { path: 'numeracion', component: ActividadesComponent },
      { path: 'administrador/contraseña', component: ListarUsuarioAdminComponent },
    ]
  },
  {
    path: 'clase', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'mantemiento-clase', component: LsClaseComponent },
      { path: 'modulos-clases', component: AdminClasesComponent },
      { path: 'modulos-clases/:codigo', component: AdminDevClassComponent }
    ]
  },
  {
    path: 'partido', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'mantenimiento-partidos', component: LsPartidoComponent },
      { path: 'historial', component: HistorialPartidoAdminComponent },
      { path: 'estadistica-partido', component: EstadisticasPartidoAdminComponent },
    ]
  },

  {
    path: 'profesores', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'registro-profesor', component: RegistrarProfesorComponent },
      { path: 'listar-profesor', component: ProfesorComponent },
      { path: 'mantenimiento-profesor', component: LstProfesoresComponent }


    ]
  },
  {
    path: 'estudiantes', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'registro-estudiante', component: RegEstudianteComponent },
      { path: 'mantenimiento-estudiante', component: ListEstudianteComponent },
      { path: 'listar-estudiante', component: EstudianteComponent },
      { path: 'lesiones', component: LsLesionesComponent }
    ]
  },
  {
    path: 'calendario', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'calendario', component: CalendarioComponent },
      { path: 'horario', component: HorarioComponent },
      { path: 'mantenimiento', component: HorarioComponent },
    ]
  },
  {
    path: 'equipo', component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'asignacion', component: RegAsginacionComponent },
      { path: 'mantenimiento-equipo', component: MantEquipoComponent },
      { path: 'equipos', component: EquipoComponent },
    ]
  },




  // ESTUDIANTE
  {
    path: 'estudiante', component: HomeEstudianteComponent,
    canActivate: [EstudianteGuard],
    children: [
      { path: '', component: PrincipalEstudianteComponent, },
    ]
  },
  {
    path: 'perfil', component: HomeEstudianteComponent,
    canActivate: [EstudianteGuard],
    children: [
      { path: 'estudiante/datos-personales', component: DpEstduanteComponent }
    ]
  },

  {
    path: 'clase', component: HomeEstudianteComponent,
    canActivate: [EstudianteGuard],
    children: [
      { path: 'estudiante/modulo-clase-estudiante', component: DetalleClaseEstudianteComponent },
    ]
  },
  {
    path: 'calendario', component: HomeEstudianteComponent,
    canActivate: [EstudianteGuard],
    children: [
      { path: 'estudiante/modulo-calendario', component: CalendarioEstudianteComponent },
    ]
  },
  {
    path: 'partidos', component: HomeEstudianteComponent,
    canActivate: [EstudianteGuard],
    children: [
      { path: 'estudiante/proximos-partidos', component: PartidoEstudianteComponent },
      { path: 'estudiante/historial-partidos', component: HistorialPartidoEstudianteComponent },
    ]
  },
  {
    path: 'configuracion', component: HomeEstudianteComponent,
    canActivate: [EstudianteGuard],
    children: [
      { path: 'det/cambiar-contraseña', component: ActualizarContraComponent },
      { path: 'det/registro-activades', component: RegActividadesComponent }
    ]
  },
  // PROFESOR
  {
    path: 'profesor', component: HomeProfesorComponent,
    canActivate: [ProfesorGuard],
    children: [
      { path: '', component: PrincipalProfesorComponent, },

    ]
  },
  {
    path: 'perfil', component: HomeProfesorComponent,
    canActivate: [ProfesorGuard],
    children: [
      { path: 'profesores/datos-personales', component: DatosPersonalesProfesoresComponent }
    ]
  },
  {
    path: 'clases', component: HomeProfesorComponent,
    canActivate: [ProfesorGuard],
    children: [
      { path: 'modulos', component: ClasesComponent },
      { path: 'modulos/:codigo', component: DetalleClaseComponent },
      { path: 'estudiante', component: AsignacionEstudianteComponent },
      { path: 'lesiones', component: ModuloLesionesComponent }
    ]
  },
  {
    path: 'partidos', component: HomeProfesorComponent,
    canActivate: [ProfesorGuard],
    children: [
      { path: 'proximos-partidos', component: ModuloPartidoComponent },
      { path: 'historial-partidos', component: HistorialPartidoProfesoresComponent },
      { path: 'estadisticas-partidos', component: EstadisticasPartidoComponent },
    ]
  },
  {
    path: 'modulo-calendario', component: HomeProfesorComponent,
    canActivate: [ProfesorGuard],
    children: [
      { path: 'calendario', component: CalendarioProfesorComponent },

    ]
  },
  {
    path: 'configuracion', component: HomeProfesorComponent,
    canActivate: [ProfesorGuard],
    children: [
      { path: 'cambiar-contraseña', component: ActualizarContraComponent },
      { path: 'de/registrado', component: RegActividadesComponent }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
