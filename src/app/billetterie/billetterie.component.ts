import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-billetterie',
  templateUrl: './billetterie.component.html',
  styleUrls: ['./billetterie.component.scss']
})
export class BilletterieComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  onNavigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }

}
