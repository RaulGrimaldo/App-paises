import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiURLS: string = 'https://restcountries.com/v3.1/'
  
  get httpParams(){
    return new HttpParams()
    .set('fields', 'name,flags,capital,population,cca2');
  }
  constructor(private http: HttpClient) { }

  

  buscarPais(termino: string): Observable<Country[]>{

    
    const url = `${this.apiURLS}/name/${termino}`
    return this.http.get<Country[]>(url, {params: this.httpParams});

      /*return this.http.get(url).pipe(
        catchError( err => of([]))
      );*/
  }

  buscarPaisCapital(termino: string): Observable<Country[]>{

    const url = `${this.apiURLS}/capital/${termino}`
    return this.http.get<Country[]>(url, {params: this.httpParams});

      /*return this.http.get(url).pipe(
        catchError( err => of([]))
      );*/
  }

  getByCode(id: string): Observable<Country[]>{

    const url = `${this.apiURLS}/alpha/${id}`
    return this.http.get<Country[]>(url);

      /*return this.http.get(url).pipe(
        catchError( err => of([]))
      );*/
  }

  buscarRegion(region: string): Observable<Country[]>{

    const url = `${this.apiURLS}/region/${region}`
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

}
