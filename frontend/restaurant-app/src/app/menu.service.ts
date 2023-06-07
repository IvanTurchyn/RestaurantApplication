// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "./models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-endpoint.com';  // Zastąp właściwym adresem URL do Twojego API

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(`${this.apiUrl}/login`, user)
      .subscribe(
        data => {
          // Zapisz token JWT i dane użytkownika w local storage
          localStorage.setItem('currentUser', JSON.stringify(data));
        },
        error => {
          console.log(error);
        });
  }
}
