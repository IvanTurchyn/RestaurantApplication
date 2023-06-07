import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.authService.currentUserValue;

    if (!user) {
      // Jeśli nie ma zalogowanego użytkownika, przekieruj do strony logowania
      void this.router.navigate(['/login']);
      return false;
    }

    // Pobierz wymaganą rolę z metadanych trasy
    const requiredRole = next.data['role'];

    // Jeżeli użytkownik nie ma wymaganej roli, przekieruj go do strony logowania
    if ((user as any)['role'] !== requiredRole) {
      void this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
