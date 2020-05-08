import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Country } from '@models/country.model';

const apiURL: string = 'https://api.paymentwall.com/api/';
const apiAllCountries: string = 'https://account.fasterpay.com/api/countries';
const uid: string = '52e368ca73af471771274f3cc6833ac8'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  GetAllCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(apiAllCountries)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      )
  }

  GetCountry(): Observable<Country> {
    return this.httpClient.get<Country>(apiURL + 'rest/country?uid=' + uid)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      )
  }

  GetPaymentMethod(countryCode): Observable<any> {
    let params = {
      country_code: countryCode
    }
    return this.httpClient.get(apiURL + 'payment-systems/', { params })
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      )
  }

  // Error handling
  errorHandle(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
