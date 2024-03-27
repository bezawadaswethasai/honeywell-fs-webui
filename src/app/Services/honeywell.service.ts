import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HoneywellService {

  responseData: any;


  
  private baseUrl = 'https://localhost:7094/api/Registration';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}

  constructor(private http: HttpClient) { }



  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registration`, (data), this.httpOptions).pipe(catchError(this.errorHandler));
  
  }

  // getPosts(): Observable<any> {
  //   return this.http.get('http://localhost:3000/posts');
  // }

  setResponseData(data: any): void {
    this.responseData = data;
  }

  getResponseData(): any {
    return this.responseData;
  }

  errorHandler(error: {
    error: {
        message: string;
    };status: any;message: any;
}) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
}

  
}
