import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { AlertasService } from '../_services/alerta.service';
import { CoreService } from '../_services/core.service';
import { lista } from '../_util/lista-utils';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css'],
  providers: [AlertasService, ConfirmationService]
})
export class ConductorComponent implements OnInit {

  // Variables tabla Conductor
  columnas: any[] = [];
  registros: any[] = [];
  listaVehiculos: any[] = [];
  totalRecords = 0;

  // Estados
  prepararConductor: boolean = false;
  botonGuardar: boolean = false;
  botonEditar: boolean = false;

  // Listas
  listaFormulario = lista;
  resultado: any;

  // Variables globales
  id: any;

  // Formulario del conductor el cual es reutilizado para agregar y editar
  formularioConductor = new FormGroup({
    nombre: new FormControl('', Validators.compose([Validators.required])),
    apellido: new FormControl('', Validators.compose([Validators.required])),
    cedula: new FormControl('', Validators.compose([Validators.required])),
    direccion: new FormControl('', Validators.compose([Validators.required])),
    telefono: new FormControl('', Validators.compose([Validators.required])),
    pais: new FormControl('', Validators.compose([Validators.required])),
    ciudad_nacimiento: new FormControl('', Validators.compose([Validators.required])),
    placa: new FormControl('', Validators.compose([Validators.required])),
    id_supervisor: new FormControl('', Validators.compose([Validators.required])),
  });

  // Constructor del componente Conductor
  constructor(

    public coreService: CoreService,
    public msj: AlertasService,
  ) { }

  ngOnInit(): void {

    // Columnas definidas para las columnas de la tabla de conductor
    this.columnas = [
      { header: 'Nombre', field: 'nombre' },
      { header: 'Apellido', field: 'apellido' },
      { header: 'Identificación', field: 'cedula' },
      { header: 'Dirección', field: 'direccion' },
      { header: 'Teléfono', field: 'telefono' },
      { header: 'Ciudad', field: 'ciudad_nacimiento' },
      { header: 'Placa', field: 'placa' },
      { header: 'Supervisor', field: 'id_supervisor' },
    ];

    this.getListadoConductores();
    this.getListaVehiculos();
  }

  // Metodo para obtener el listado de conductores
  getListadoConductores() {

    this.coreService.get('/conductor').subscribe(
      (res: any) => {
        this.registros = res;
        this.totalRecords = this.registros.length;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  // Metodo el cual obtiene la lista de vehiculos para obtener lista de la placa al momento de agregar y enlazarlo a un conductor
  getListaVehiculos() {
    let lista: any = [];
    this.coreService.get('/vehiculos').subscribe(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {

          lista = res[i]['id'];
          this.listaVehiculos.push(lista);
        }

        this.totalRecords = this.registros.length;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  // Metodo para boton Agregar Conductor
  prepararNuevo() {

    this.prepararConductor = true;
    this.botonGuardar = true;
    this.botonEditar = false;
    this.formularioConductor.reset();
  }

  // Metodo para boton Volver
  volver() {
    this.prepararConductor = false;
    this.botonGuardar = false;
    this.botonEditar = false;
  }

  // Metodo para validar campos no validos
  campoNoValido(campo: any) {
    return this.formularioConductor.get(campo)?.invalid && this.formularioConductor.get(campo)?.touched;
  }

  // Boton guardar Conductor
  agregar() {
    let data = this.formularioConductor.valid;
    
    if (data) {
      this.formularioConductor.markAllAsTouched();
      this.postGuardarConductor();
    } else {
      this.formularioConductor.markAllAsTouched();
    }
  }

  // Metodo que envia la peticion al backend
  postGuardarConductor() {
    // Parametros que se envian desde el formulario para agregar un conductor
    let params = {
      nombre: this.formularioConductor.value.nombre,
      apellido: this.formularioConductor.value.apellido,
      cedula: this.formularioConductor.value.cedula,
      direccion: this.formularioConductor.value.direccion,
      telefono: this.formularioConductor.value.telefono,
      pais: this.formularioConductor.value.pais,
      ciudad_nacimiento: this.formularioConductor.value.ciudad_nacimiento,
      placa: this.formularioConductor.value.placa,
      id_supervisor: this.formularioConductor.value.id_supervisor,
    };

    this.coreService.post('/agregar', params).subscribe(
      (res: any) => {
        
        this.msj.info('Conductor Guardado Correctamente');
        this.getListadoConductores();
        this.prepararConductor = false;
      },
      (err: any) => {
        if (err.errors.error !== undefined && err.errors.error !== null) {
          for (let index = 0; index < err.errors.error.length; index++) {
            this.msj.error(err.errors.error[index]);
          }
        }
      }
    )
  }

  // Boton editar Usuario
  editarConductor(data: any) {

    this.id = data.id;
    this.prepararConductor = true;
    this.botonGuardar = false;
    this.botonEditar = true;
    this.formularioConductor.controls['nombre'].setValue(data.nombre);
    this.formularioConductor.controls['apellido'].setValue(data.apellido);
    this.formularioConductor.controls['cedula'].setValue(data.cedula);
    this.formularioConductor.controls['direccion'].setValue(data.direccion);
    this.formularioConductor.controls['telefono'].setValue(data.telefono);
    this.formularioConductor.controls['pais'].setValue(data.pais);
    this.formularioConductor.controls['ciudad_nacimiento'].setValue(data.ciudad_nacimiento);
    this.formularioConductor.controls['placa'].setValue(data.placa);
    this.formularioConductor.controls['id_supervisor'].setValue(data.id_supervisor);
  }

  // Boton actualizar Conductor
  actualizar() {

    let data = this.formularioConductor.valid;
    if (data) {
      this.formularioConductor.markAllAsTouched();
      this.postActualizarConductor();
    } else {
      this.formularioConductor.markAllAsTouched();
    }
  }

  // Metodo para actualizar un conductor
  postActualizarConductor() {

    // Parametros que se envian del formulario para actualizar el conductor
    let params = {
      id: this.id,
      nombre: this.formularioConductor.value.nombre,
      apellido: this.formularioConductor.value.apellido,
      cedula: this.formularioConductor.value.cedula,
      direccion: this.formularioConductor.value.direccion,
      telefono: this.formularioConductor.value.telefono,
      pais: this.formularioConductor.value.pais,
      ciudad_nacimiento: this.formularioConductor.value.ciudad_nacimiento,
    }

    this.coreService.post('/actualizar-conductor/' + params.id, params).subscribe(
      (res: any) => {
        this.msj.info("Conductor actualizado exitosamente");
        this.getListadoConductores();
        this.prepararConductor = false;
      },

      (err: any) => {
        if (err.errors.error !== undefined && err.errors.error !== null) {
          for (let index = 0; index < err.errors.error.length; index++) {
            this.msj.error(err.errors.error[index]);
          }
        }
      }
    )
  }

  // Metodo del boton eliminar
  eliminarConductor(id: any) {
    this.deleteConductor(id);
  }

  // Metodo que envia la peticion al backend para eliminar un conductor
  deleteConductor(id: any){
    this.coreService.post('/eliminar-conductor/'+id, '').subscribe(
      (res: any) => {
        this.msj.info('Se eliminó correctamente el conductor');
        this.getListadoConductores();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
