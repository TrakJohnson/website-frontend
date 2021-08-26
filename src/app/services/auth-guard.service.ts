import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return new Observable(
            (observer) => {
                this.auth.isAuth$.subscribe(
                    (auth) => {
                        if (!auth) {
                            if (localStorage.getItem('token') != null) {
                              this.auth.loginFromToken(localStorage.getItem('token'))
                              .then(() => {
                                observer.next(true);
                              })
                              .catch((error) => {
                                this.router.navigate(['/login']); 
                              });
                            }                  
                        }
                        else { observer.next(true); }
                        
                    }
                );
            }
        );
      }

}