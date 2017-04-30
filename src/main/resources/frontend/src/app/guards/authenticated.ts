import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import 'rxjs/add/operator/catch';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn().map(() => {
      if (state.url !== '/login') {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }).catch(() => {
      if (state.url === '/login') {
        return of(true);
      }
      this.router.navigate(['/login']);
      return of(false);
    });
  }
}
