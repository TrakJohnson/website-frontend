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
                console.log({CanActivate: this.auth});
                this.auth.isAuth$.subscribe(
                    (auth) => {
                        if (!auth) {
                            console.log({message : "redirect to login..."});
                            this.router.navigate(['/login']);
                        }
                        observer.next(true);
                    }
                );
            }
        );
      }

}