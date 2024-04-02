import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable ,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData : any  = {};
  private apiUrl = 'https://localhost:44388/api/Common/login';
 
 

  private loginResponseSubject = new BehaviorSubject<any>({});

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}


  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log('hello',body);
   
    return this.http.post<any>('https://localhost:44388/api/Common/login', body);

    //return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  getloginresponse(): any {
    return this.loginResponseSubject.value;
  }
 
  setloginresponse(obj: any) {
    this.loginResponseSubject.next(obj);
  }

}
