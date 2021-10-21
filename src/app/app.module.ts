import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { ConductorComponent } from './conductor/conductor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { InicioComponent } from './inicio/inicio.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuditoriaComponent } from './auditoria/auditoria.component';

@NgModule({
  declarations: [
    AppComponent,
    ConductorComponent,
    InicioComponent,
    SupervisorComponent,
    VehiculoComponent,
    AuditoriaComponent
  ],
  imports: [
    AppRoutes,
    ToastModule,
    BrowserModule,
    ButtonModule,
    RouterModule.forRoot([]),
    ToolbarModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    CardModule,
    BrowserAnimationsModule
  ],
  providers: [RouterTestingModule, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
