import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

const endpoint = 'http://localhost:8080/mongo/library/';
const httpOptions = {
  headers: new HttpHeaders({
    'access-control-allow-origin':'*',
    'content-type':  'application/json'
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

  list(q:any): Observable<any> {
    let queryParams = '';
    if(q){
      queryParams = "?q=" + encodeURIComponent(JSON.stringify(q));
    }
    return this.http.get(endpoint + this.entityName + queryParams).pipe(
        map(this.extractData));
  }

  get(id): Observable<any> {
    return this.http.get(endpoint + this.entityName + '/' + id).pipe(
        map(this.extractData));
  }

  save(entity): Observable<any> {
    return this.http.post<any>(endpoint + this.entityName, JSON.stringify(entity), httpOptions).pipe(
        tap((entity) => console.log(`saved ${this.entityName} w/ id=${entity._id}`)),
        catchError(this.handleError<any>('save '))
    );
  }

  update(id, entity): Observable<any> {
    return this.http.put(endpoint + this.entityName + '/' + id, JSON.stringify(entity), httpOptions).pipe(
        tap(_ => console.log(`updated ${this.entityName} id=${id}`)),
        catchError(this.handleError<any>('updateEntity'))
    );
  }

  delete (id): Observable<any> {
    return this.http.delete<any>(endpoint + this.entityName + '/' + id, httpOptions).pipe(
        tap(_ => console.log(`deleted ${this.entityName} id=${id}`)),
        catchError(this.handleError<any>('deleteEntity'))
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
