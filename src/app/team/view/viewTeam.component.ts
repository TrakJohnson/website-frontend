import { Component, OnInit } from '@angular/core';
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

  poles_infos : any;
  number_of_poles = 18; // provisoire : permet de set la bonne taille pour le tableau regrupant les memebres par poles
  poles = new Array();

  ngOnInit(): void {
    for (let index = 0; index < this.number_of_poles; index ++) {this.poles.push([])};
    
    this.poleService.getPoles()
    .then((data :any) => {
      console.log({dataPoles : data});
      this.poles_infos = data;
      this.popup.loading$.next(false);
    })
    .catch((error) => {
      this.popup.state$.next([false, error.message]);
    })
  }

}
