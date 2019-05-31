import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

const endpoint = 'http://localhost:8080/mongo/library/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  entityName = null;
  http:HttpClient;
  constructor(entity: String , http: HttpClient) {
    this.entityName = entity;
    this.http = http;
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  list(): Observable<any> {
    return this.http.get(endpoint + this.entityName).pipe(
        map(this.extractData));
  }

  get(id): Observable<any> {
    return this.http.get(endpoint + this.entityName + '/' + id).pipe(
        map(this.extractData));
  }


  add(product): Observable<any> {
    console.log(product);
    return this.http.post<any>(endpoint + this.entityName, JSON.stringify(product), httpOptions).pipe(
        tap((product) => console.log(`added ${this.entityName} w/ id=${product.id}`)),
        catchError(this.handleError<any>('add '))
    );
  }

  update(id, product): Observable<any> {
    return this.http.put(endpoint + this.entityName + '/' + id, JSON.stringify(product), httpOptions).pipe(
        tap(_ => console.log(`updated ${this.entityName} id=${id}`)),
        catchError(this.handleError<any>('updateProduct'))
    );
  }

  delete (id): Observable<any> {
    return this.http.delete<any>(endpoint + this.entityName + '/' + id, httpOptions).pipe(
        tap(_ => console.log(`deleted ${this.entityName} id=${id}`)),
        catchError(this.handleError<any>('deleteProduct'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
