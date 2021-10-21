import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class CoreService {

  protected baseUrl: string = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get(this.baseUrl + endpoint, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  post(endpoint: string, element: any) {
    return this.http.post(this.baseUrl + endpoint, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  upload(endpoint: string, formData: FormData) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post(this.baseUrl + endpoint, formData).pipe(
      catchError(this.handleError)
    );
  }

  download(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint, { observe: 'response', responseType: 'blob' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  downloadWithParams(endpoint: string, element: any) {
    return this.http.post<any>(this.baseUrl + endpoint, element, { observe: 'response', responseType: 'blob' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  downloadPDF(endpoint: string) {
    window.open(this.baseUrl + endpoint, "_blank")
  }

  putWithOutParam(endpoint: string, element: any) {
    return this.http.put(this.baseUrl + endpoint, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  put(endpoint: string, element: any) {
    return this.http.put(this.baseUrl + endpoint + '/' + element.id, element, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete(endpoint: string, id: any) {
    return this.http.delete(this.baseUrl + endpoint + '/' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getWithParams(endpoint: string, parametros: any) {
    const httpOption = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      }),
      params: parametros
    };
    return this.http.get<any[]>(this.baseUrl + endpoint, httpOption).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("+++ begin DSI: ", new Date());
    console.log('+++ error.status=' + error.status);
    console.log("+++ error.message=", error.message);
    console.log("+++ error.error=", error.error);
    let msj = "";
    if (error.error instanceof ErrorEvent) {
      console.log("+++ ErrorEvent=", error.error.message);
      msj = error.error.message;
    } else if (error.error === 'Unauthorized.') {
      msj = "Uso de servicio no autorizado (Unauthorized).";
    } else if (error.error instanceof ProgressEvent && error.message.match("Unknown Error")) {
      console.log("+++ ERROR COM: ProgressEvent: ", error.message);
      msj = "ERROR COM: " + error.message;
    } else if (error.error instanceof ProgressEvent && !error.message.match("Unknown Error")) {
      console.log("+++ ProgressEvent: ", error.message);
      msj = error.message;
    } else if (Array.isArray(error.error)) {
      msj = error.error[0];
    } else {
      console.log("+++ dsi errors:", error.error.errors);
      if (error.error.errors.error) {
        if (Array.isArray(error.error.errors.error)) {
          msj = error.error.errors.error[0];
        } else {
          msj = error.error.errors.error;
        }
      } else if (Array.isArray(error.error.errors)) {
        msj = error.error.errors[0];
      } else {
        if (error.error.errors === undefined) {
          msj = error.message;
        } else {
          msj = error.error.errors;
        }
      }
    }
    console.log("+++ end DSI: ", new Date());
    return throwError(msj);
  }

}
