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
                console.log({CanActivate: this.auth});
                this.auth.isAuth$.subscribe(
                    (auth) => {
                        if (!auth) {
                            console.log({message : "redirect to login..."});
                            this.router.navigate(['/login']);                      
                        }
                        else {
                            console.log('there')
                            this.auth.admin$.subscribe(
                                (admin) => {
                                    if (!admin) {
                                        console.log({message : "Non administrateur"});
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