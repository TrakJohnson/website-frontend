import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-infos',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
}
