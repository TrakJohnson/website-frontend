import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { PopupService } from './popup.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {

    constructor(private auth: AuthService,
                private router: Router,
                private popup : PopupService) {}

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
                        else {
                            this.auth.admin$.subscribe(
                                (admin) => {
                                    if (!admin) {
                                        console.log("lalalala");
                                        this.popup.loading$.next(false);
                                        this.popup.state$.next([false, "Vous n'êtes pas administrateur"]);
                                        observer.next(false);
                                    }
                                    else {observer.next(true);}
                                }
                            );
                        }
                    }
                );
            }
        );
      }

}