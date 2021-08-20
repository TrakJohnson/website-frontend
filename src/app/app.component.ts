import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
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
  token : string | null;


  events = [{title: "1", description :"desc1", link: "#", image : "image"},{title: "2" , description : "desc2", link: "#", image : "image2"}]

  ngOnInit() {
    this.popup.loading$.next(true);
    

    this.token = localStorage.getItem('token');

    console.log("token : " + this.token)

    if (this.token) {
      this.auth.loginFromToken(this.token)
      .then(() => {
        this.popup.loading$.next(false);
      })
      .catch((error) => {
        this.popup.loading$.next(false);
        console.log(error.message)
      }
    );
    }

    this.loadingSub = this.popup.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    )

    this.popup.loading$.next(false);
  }

}
