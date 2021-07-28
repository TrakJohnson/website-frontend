import { Component, OnInit } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(private router: Router) { }

  events : any[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.events.push({
        title : "event " + i,
        link : "https://www.google.com",
        details : "best event of the year (i think so)",
        image : "https://picsum.photos/640/480?random=" + i});
    };
  
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

}
