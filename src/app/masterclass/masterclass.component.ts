import { Component, OnInit } from '@angular/core';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-masterclass',
  templateUrl: './masterclass.component.html',
  styleUrls: ['./masterclass.component.scss']
})
export class MasterclassComponent implements OnInit {

  constructor(private popup : PopupService) { }

  ngOnInit(): void {
    this.popup.loading$.next(false);

  }

}
