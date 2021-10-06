import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(
    private authservice: AuthenticationService,
    private routerService: RouterService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const bearerToken = localStorage.getItem('Bearer');

    if (bearerToken != null) {
      const authStatus = this.authservice.isUserAuthenticated(bearerToken).then(
        (data) => {
          return data;
        },
        (err) => {
          console.log(err);
        }
      );

      if (authStatus) {
        return true;
      }
    } else {
      this.routerService.routeToLogin();
      return false;
    }
  }
}
