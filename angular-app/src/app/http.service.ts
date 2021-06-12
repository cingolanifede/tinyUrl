import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import * as Constantes from './config';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':  'application/json' })
  };

  getAll() : Observable<any>{
    return this.http.get('/api')
    .pipe(
      catchError(this.handleError)
    );
  }
  
  postUrl(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('/api', data, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  getUrl(id: any) : Observable<any>{
    const url =`/api/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }
}
