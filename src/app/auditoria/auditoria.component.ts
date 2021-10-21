import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../_services/alerta.service';
import { CoreService } from '../_services/core.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  // Variables tabla Auditoria
  columnas: any[] = [];
  registros: any[] = [];
  totalRecords = 0;

  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
  ) { }

  ngOnInit(): void {

    // Columnas definidas para las columnas de la tabla de vehiculos
    this.columnas = [
      { header: 'Código auditoria', field: 'id' },
      { header: 'Código Conductor', field: 'id_conductor' },
      { header: 'Acción', field: 'accion' },
      { header: 'Fecha', field: 'created_at' },
    ];
    this.getListadoAuditoria();
  }

  getListadoAuditoria() {
    this.coreService.get('/auditoria').subscribe(
      (res: any) => {
        this.registros = res;
        this.totalRecords = this.registros.length;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

}
