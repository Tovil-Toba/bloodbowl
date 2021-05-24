import { Component, Input, OnInit } from '@angular/core';

import { TeamModel } from '../../teams/shared/team.model';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  @Input() team: TeamModel;

  constructor() { }

  ngOnInit(): void {
  }

}
