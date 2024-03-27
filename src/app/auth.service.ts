import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData : any  = {};
  private apiUrl = 'https://localhost:44388/api/Common/login';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}


  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(this.apiUrl, body);
    //return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  setUser(userData:any)
 {    
this.userData = userData;
  }   
getUserDepartment():string

{    
return this.userData ? this.userData.department:'';
}

}
