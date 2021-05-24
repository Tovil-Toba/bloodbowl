import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { TeamRostersService } from '../shared/team-rosters.service';
import { TeamRosterModel } from '../shared/team-roster.model';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-roster-editor.component.html',
  styleUrls: ['./team-roster-editor.component.css'],
  animations: [enterPageAnimation]
})
export class TeamRosterEditorComponent implements OnInit {

  teamRoster: TeamRosterModel;
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public teamRostersService: TeamRostersService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  getTeamRoster(urlId: string): void {
    const index = _.findIndex(this.teamRostersService.teamRosters, { urlId });
    if (index !== -1) {
      this.teamRoster = this.teamRostersService.teamRosters[index];
      this.breadcrumbItems = [
        { label: 'Team Rosters', routerLink: '/team-rosters' },
        { label: this.teamRoster.name, routerLink: `/team-rosters/${this.urlId}` },
        { label: 'Edit' }
      ];
    }
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Team Rosters' },
      { label: 'New Team Roster' },
      { label: 'Add' }
    ];
    this.getTeamRoster(this.urlId);
  }

  onTeamRosterFormSubmit(teamRoster: TeamRosterModel): void {
    this.teamRoster = teamRoster;
    this.breadcrumbItems = [
      { label: 'Teams', routerLink: '/team-rosters' },
      { label: this.teamRoster.name, routerLink: `/team-rosters/${this.urlId}` },
      { label: 'Edit' }
    ];
  }

}
