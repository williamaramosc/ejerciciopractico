import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../_services/alerta.service';
import { CoreService } from '../_services/core.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  // Variables tabla Vehiculo
  columnas: any[] = [];
  registros: any[] = [];
  totalRecords = 0;

  // Contructor del componente Vehiculo
  constructor(
    public coreService: CoreService,
    public msj: AlertasService,
  ) { }

  ngOnInit(): void {

    // Columnas definidas para las columnas de la tabla de vehiculos
    this.columnas = [
      { header: 'Marca', field: 'marca' },
      { header: 'Modelo', field: 'modelo' },
      { header: 'Placa', field: 'id' },
      { header: 'Color', field: 'color' },
    ];
    this.getListadoVehiculo();
  }
  // Metodo para obtener el listado de vehiculos
  getListadoVehiculo() {

    this.coreService.get('/vehiculos').subscribe(
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
