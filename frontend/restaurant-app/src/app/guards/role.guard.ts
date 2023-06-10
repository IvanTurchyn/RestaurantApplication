import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {

  constructor(private router: Router, private authService: AuthService) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.authService.currentUserValue;

    if (!user) {
      void this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data && route.data['roles'];

    if (!requiredRoles) {
      return true;
    }

    const userRole = (user as any)['role'];

    if (!requiredRoles.includes(userRole)) {
      void this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
