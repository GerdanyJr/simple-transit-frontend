import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/Auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  login(login: string, password: string) {
    return this
      .httpClient
      .post<LoginResponse>(`${this._baseUrl}/usuarios`, { login, password })
      .pipe(
        tap(value => sessionStorage
          .setItem("auth-token",
            value.authToken
          )));
  }

  register(name: string, login: string, password: string) {
    return this
      .httpClient
      .post(`${this._baseUrl}/auth/`, { name, login, password });
  }
}
