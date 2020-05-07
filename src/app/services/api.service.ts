import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'https://api.paymentwall.com/api/';
  uid: string = '52e368ca73af471771274f3cc6833ac8'

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  GetCountry(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'rest/country?uid=' + this.uid)
      .pipe(
        retry(1),
        catchError(this.errorHandle)
      )
  }

  GetPaymentMethod(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'payment-systems/?country_code=vn')
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
