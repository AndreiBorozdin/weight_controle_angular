import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  user: User
  constructor(private http: HttpClient) { }

  login(user: User): Observable<{token: string}>{
    return this.http.post<{token: string}>('/api/user/login', user)
      .pipe(tap(({token}) => {
        localStorage.setItem('token', token)
        this.setToken(token)
      }))
  }
  register(user: User): Observable<User>{
    return this.http.post<User>('/api/user/register', user)
  }
  getToken(): string{
    return this.token;
  }
  setToken(token: string){
    this.token = token
  }
  getUser():Observable<any>{
   return this.http.get<any>('api/user')
  }
  isAuthenticated(): boolean{
    return !!this.token
  }
  logout(){
    this.token = null
    localStorage.clear()
  }
}
