import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private popup: PopupService,
    private auth : AuthService) {}

  loadingSub : Subscription;
  loading : boolean;

  authSub : Subscription;
  isAuth : boolean;
  token : string | null;


  events = [{title: "1", description :"desc1", link: "#", image : "image"},{title: "2" , description : "desc2", link: "#", image : "image2"}]

  async ngOnInit() {

    this.loadingSub = this.popup.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    )

    this.authSub = this.auth.isAuth$.subscribe(
      (dataAuth) => {
        this.isAuth = dataAuth;
      }
    )

    this.token = localStorage.getItem('token');
    if (this.token && !this.isAuth) {
      console.log("Want To connecct");
      await this.auth.loginFromToken(this.token)
      .then(() => {
        this.popup.loading$.next(false);
      })
      .catch((error) => {
        this.popup.loading$.next(false);
        this.popup.state$.next([false, error.message]);
      }
    );
    }
  }
}
