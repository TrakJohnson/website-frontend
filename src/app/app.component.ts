import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PopupService } from './services/popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private popup: PopupService) {}

  loadingSub : Subscription;
  loading : boolean;

  ngOnInit() {

    this.loadingSub = this.popup.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    )

    this.popup.loading$.next(false);
  }

}
