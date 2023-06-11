import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from "../models/user";
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private  router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getUserRole(): string {
    const currentUser = this.currentUserValue;
    return currentUser ? currentUser.role : '';
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    const currentUser = this.currentUserValue;
    return currentUser && currentUser.token ? currentUser.token.toString() : null;
  }

  refreshToken(): Observable<User | null> {
    return this.http.post<any>(`http://localhost:8080/api/refresh`, { token: this.getToken() })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  login(username: string, password: string) {
    console.log('Login data:', username, password); // Sprawdź, czy dane logowania są przekazywane poprawnie
    return this.http.post<any>(`http://localhost:8080/api/login`, { username, password })
      .pipe(map(user => {
        console.log('Login response:', user); // Sprawdź, czy otrzymujesz odpowiedź z backendu
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/profile'])
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
