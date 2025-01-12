import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/Auth.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<LoginResponse | null>(null);
  private _baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  login(login: string, password: string) {
    return this
      .httpClient
      .post<LoginResponse>(`${this._baseUrl}/auth/login`, { login, password })
      .pipe(
        tap(value => {
          console.log(value);
          this.user.next(value);
        }));
  }

  register(name: string, login: string, password: string) {
    return this
      .httpClient
      .post(`${this._baseUrl}/usuarios/`, { name, login, password });
  }
}
