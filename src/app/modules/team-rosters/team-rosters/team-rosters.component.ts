import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { TeamRostersService } from '../shared/team-rosters.service';
import { TeamRosterModel } from '../shared/team-roster.model';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-rosters',
  templateUrl: './team-rosters.component.html',
  styleUrls: ['./team-rosters.component.css'],
  animations: [enterPageAnimation]
})
export class TeamRostersComponent implements OnInit {

  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    public teamRostersService: TeamRostersService
  ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Team Rosters' }
    ];
  }

}
