import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {

  constructor(private popup : PopupService) {}

  stateSub : Subscription;

  message : string;
  success : boolean;

  ngOnInit(): void {
    this.message = "";
    this.success = false;

    document.getElementById("popup")!.ontransitionend = () => {
      if (document.getElementById("popup")!.style.opacity == "1") {  
        document.getElementById("popup")!.style.opacity = "0";
      } 
      
    }

    this.stateSub = this.popup.state$.subscribe(
      (state) => {
        if (state[1] != "") {
          this.OnChangeState(state);
        }
      }
    );
  }

  OnChangeState(newState : [boolean, string]) {
    this.message = newState[1];
    this.success = newState[0];
    setTimeout(function(){
      document.getElementById("popup")!.style.opacity = "1";
    }, 10);
  }

}
