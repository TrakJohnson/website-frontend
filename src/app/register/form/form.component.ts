import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  selectedForm : string = 'simple';

  constructor() { }

  ngOnInit(): void {
  }

  onSwitchForm(form : string) {
    this.selectedForm = form;
  }

}
