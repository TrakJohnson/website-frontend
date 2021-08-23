import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './viewTeam.component.html',
  styleUrls: ['./viewTeam.component.scss']
})
export class ViewTeamComponent implements OnInit {

  constructor(private team : TeamService,
              private popup : PopupService) { }

  members_by_pole : any[] = []

  ngOnInit(): void {

    this.team.getMembrersAllMembers()
    .then((data) => {
      var pole_id = 1;
      var pole_list = [];
      for(let member of data) {
        if (member.pole_id === pole_id) {
          pole_list.push(member);
        }
        else {
          this.members_by_pole.push(pole_list)
          pole_id++;
          pole_list = [];
        }
      }
      this.members_by_pole.push(pole_list); //pushing the last pole 
      console.log(this.members_by_pole)
    })
    .catch((error) => {
      this.popup.state$.next([false, error.message])
    })

    

  }

}
