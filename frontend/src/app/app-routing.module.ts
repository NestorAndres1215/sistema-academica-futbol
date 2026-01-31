import { AdminGuard } from './core/guard/admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//ADMINISTRADOR

import { ProfesorGuard } from './core/guard/profesor.guard';
import { EstudianteGuard } from './core/guard/estudiante.guard';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { EquipoComponent } from './features/admin/asignacion/equipo/equipo.component';
import { MantEquipoComponent } from './features/admin/asignacion/mant-equipo/mant-equipo.component';
import { RegAsginacionComponent } from './features/admin/asignacion/reg-asginacion/reg-asginacion.component';
import { CalendarioComponent } from './features/admin/calendario/calendario/calendario.component';
import { HorarioComponent } from './features/admin/calendario/horario/horario.component';
import { EstudianteExcelComponent } from './features/admin/carga-archivos/estudiante-excel/estudiante-excel.component';
import { ProfesoresExcelComponent } from './features/admin/carga-archivos/profesores-excel/profesores-excel.component';
import { LsClaseComponent } from './features/admin/clase/ls-clase/ls-clase.component';
import { CargoComponent } from './features/admin/configuracion/cargo/cargo/cargo.component';
import { ListarUsuarioAdminComponent } from './features/admin/configuracion/contraseña/listar-usuario-admin/listar-usuario-admin.component';
import { ActividadesComponent } from './features/admin/configuracion/registro/actividades/actividades.component';
import { SedeComponent } from './features/admin/configuracion/sede/sede/sede.component';
import { LsTablaGeneralComponent } from './features/admin/configuracion/tabla-generales/ls-tabla-general/ls-tabla-general.component';
import { DatosPersonalesComponent } from './features/admin/datos-personales/datos-personales.component';
import { EstudianteComponent } from './features/admin/estudiante/estudiante/estudiante.component';
import { ListEstudianteComponent } from './features/admin/estudiante/list-estudiante/list-estudiante.component';
import { RegEstudianteComponent } from './features/admin/estudiante/reg-estudiante/reg-estudiante.component';
import { HomeAdminComponent } from './features/admin/home-admin/home-admin.component';
import { LsLesionesComponent } from './features/admin/lesiones/ls-lesiones/ls-lesiones.component';
import { AdminClasesComponent } from './features/admin/modulo-clases/admin-clases/admin-clases.component';
import { AdminDevClassComponent } from './features/admin/modulo-clases/admin-dev-class/admin-dev-class.component';
import { EstadisticasPartidoAdminComponent } from './features/admin/partido/estadisticas-partido-admin/estadisticas-partido-admin.component';
import { HistorialPartidoAdminComponent } from './features/admin/partido/historial-partido-admin/historial-partido-admin.component';
import { LsPartidoComponent } from './features/admin/partido/ls-partido/ls-partido.component';
import { PrincipalComponent } from './features/admin/principal/principal.component';
import { LstProfesoresComponent } from './features/admin/profesor/lst-profesores/lst-profesores.component';
import { ProfesorComponent } from './features/admin/profesor/profesor/profesor.component';
import { RegistrarProfesorComponent } from './features/admin/profesor/registrar-profesor/registrar-profesor.component';
import { LstUsuarioComponent } from './features/admin/usuario/lst-usuario/lst-usuario.component';
import { RegUsuarioComponent } from './features/admin/usuario/reg-usuario/reg-usuario.component';
import { UsuarioAdministradorComponent } from './features/admin/usuario/usuario-administrador/usuario-administrador.component';
import { InicioComponent } from './features/auth/inicio/inicio.component';
import { LoginComponent } from './features/auth/login/login.component';
import { NosotrosComponent } from './features/auth/nosotros/nosotros.component';
import { SedesComponent } from './features/auth/sedes/sedes.component';
import { CalendarioEstudianteComponent } from './features/estudiante/calendario/calendario-estudiante/calendario-estudiante.component';
import { DetalleClaseEstudianteComponent } from './features/estudiante/clases/detalle-clase-estudiante/detalle-clase-estudiante.component';
import { DpEstduanteComponent } from './features/estudiante/datos-personales/dp-estduante/dp-estduante.component';
import { HomeEstudianteComponent } from './features/estudiante/home-estudiante/home-estudiante.component';
import { HistorialPartidoEstudianteComponent } from './features/estudiante/partido/historial-partido-estudiante/historial-partido-estudiante.component';
import { PartidoEstudianteComponent } from './features/estudiante/partido/partido-estudiante/partido-estudiante.component';
import { PrincipalEstudianteComponent } from './features/estudiante/principal-estudiante/principal-estudiante.component';
import { CalendarioProfesorComponent } from './features/profesor/calendario/calendario-profesor/calendario-profesor.component';
import { ClasesComponent } from './features/profesor/clases/clases/clases.component';
import { DetalleClaseComponent } from './features/profesor/clases/detalle-clase/detalle-clase.component';
import { ActualizarContraComponent } from './features/profesor/configuracion/actualizar-contra/actualizar-contra.component';
import { RegActividadesComponent } from './features/profesor/configuracion/reg-actividades/reg-actividades.component';
import { AsignacionEstudianteComponent } from './features/profesor/estudiante/asignacion-estudiante/asignacion-estudiante.component';
import { HomeProfesorComponent } from './features/profesor/home-profesor/home-profesor.component';
import { ModuloLesionesComponent } from './features/profesor/lesiones/modulo-lesiones/modulo-lesiones.component';
import { EstadisticasPartidoComponent } from './features/profesor/partido/estadisticas-partido/estadisticas-partido.component';
import { HistorialPartidoProfesoresComponent } from './features/profesor/partido/historial-partido-profesores/historial-partido-profesores.component';
import { ModuloPartidoComponent } from './features/profesor/partido/modulo-partido/modulo-partido.component';
import { DatosPersonalesProfesoresComponent } from './features/profesor/perfil/datos-personales-profesores/datos-personales-profesores.component';
import { PrincipalProfesorComponent } from './features/profesor/principal-profesor/principal-profesor.component';


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
