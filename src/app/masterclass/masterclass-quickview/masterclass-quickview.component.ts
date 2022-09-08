import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-masterclass-quickview',
  templateUrl: './masterclass-quickview.component.html',
  styleUrls: ['./masterclass-quickview.component.scss']
})
export class MasterclassQuickviewComponent implements OnInit {
  constructor() { }

  @Input() titre : string;
  @Input() places : string;
  @Input() horaires : string;
  @Input() prof : string;
  @Input() photo : string;
  @Input() reverse : boolean = false;
  @Input() salle : string = "";

  ngOnInit(): void {
  }

}
