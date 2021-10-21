import { Component, OnInit } from '@angular/core';
import { CoreService } from '../_services/core.service';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.css']
})
export class SupervisorComponent implements OnInit {

  // Variables tabla Supervisor
  columnas: any[] = [];
  registros: any[] = [];
  totalRecords = 0;

  // Constructor del componente supervisor
  constructor(
    public coreService: CoreService,
  ) { }

  ngOnInit(): void {

        // Columnas definidas para las columnas de la tabla de supervisor
        this.columnas = [
          { header: 'Codigo', field: 'id' },
          { header: 'Nombre', field: 'nombre' },
        ];
        this.getListadoSupervisores();
  }

  // Metodo para obtener el listado de supervisor
  getListadoSupervisores() {

    this.coreService.get('/supervisor').subscribe(
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
