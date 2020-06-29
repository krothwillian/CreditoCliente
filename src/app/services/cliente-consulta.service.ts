import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteConsultaService {

  // URL para carregar todos os clientes cadastrados
  urlListarTodos = 'http://localhost:8080/consulta/clientes';
  // URL put, delete, post
  url = 'http://localhost:8080/consulta/cliente';

  constructor(private http: HttpClient) { }

  // Headers
  httpOptions= {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Lista de todos os clientes
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlListarTodos)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Cadastrar um novo Cliente
  novo(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Tratamento de erro
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client
      errorMessage = error.error.message;
    } else {
      // servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
