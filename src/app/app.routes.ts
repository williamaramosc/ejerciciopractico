import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { ConductorComponent } from './conductor/conductor.component';
import { InicioComponent } from './inicio/inicio.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';


export const routes: Routes = [

    { path: '', component: InicioComponent },
    { path: 'conductor', component: ConductorComponent },
    { path: 'supervisor', component: SupervisorComponent },
    { path: 'vehiculo', component: VehiculoComponent },
    { path: 'auditoria', component: AuditoriaComponent },
];

export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot(
    routes,
    {
        scrollPositionRestoration: 'enabled',
        useHash: true
    }
);