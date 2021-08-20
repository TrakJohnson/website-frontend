import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-billetterie',
  templateUrl: './billetterie.component.html',
  styleUrls: ['./billetterie.component.scss']
})
export class BilletterieComponent implements OnInit {

  private isAuthSub: Subscription;
  isAuth: boolean = false;
  private isAdminSub: Subscription;
  isAdmin: boolean = false; 

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (status) => {
        this.isAuth = status;
      }
    )
    this.isAdminSub = this.auth.admin$.subscribe(
      (status) => {
        this.isAdmin = status;
      }
    )
    
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

}
