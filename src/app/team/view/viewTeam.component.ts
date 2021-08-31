import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pole } from 'src/app/models/pole.model';
import { PoleService } from 'src/app/services/poles.service';
import { PopupService } from 'src/app/services/popup.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './viewTeam.component.html',
  styleUrls: ['./viewTeam.component.scss']
})
export class ViewTeamComponent implements OnInit {

  constructor(private team : TeamService,
              private popup : PopupService,
              private poleService : PoleService,) { }

  polesSub : Subscription;
  poles : any = {};

  ngOnInit(): void {

    this.polesSub = this.poleService.poles$.subscribe(
      (poleData) => {
        console.log({poles: poleData});
        this.poles = poleData;
      }
    )
    this.poleService.getPoles();
    this.popup.loading$.next(false);
  }

  keys() : Array<string> {
    return Object.keys(this.poles);
  }

}
