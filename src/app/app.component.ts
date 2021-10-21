import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [MessageService,  HttpClient]
})
export class AppComponent implements OnInit {
  title = 'transporte';

  constructor(
    protected router: Router,
  ) {
  }
  ngOnInit(): void {

  }

  bienvenido() {
    this.router.navigate(['/']);
  }

  conductor() {
    this.router.navigate(['/conductor']);
  }

  supervisor() {
    this.router.navigate(['/supervisor']);
  }

  vehiculo() {
    this.router.navigate(['/vehiculo']);
  }

  auditoria() {
    this.router.navigate(['/auditoria']);
  }
}
