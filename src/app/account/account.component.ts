import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private popup: PopupService) {}

  loadingSub : Subscription;
  loading : boolean;

  ngOnInit(): void {

    this.loadingSub = this.popup.loading$.subscribe(
      (loading) => {
        this.loading = loading;
      }
    )

  }

}
