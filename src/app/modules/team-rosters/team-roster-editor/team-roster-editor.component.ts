import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { TeamRoster } from '../shared/team-roster';
import { TeamRosterModel } from '../shared/team-roster.model';
import { TeamRostersService } from '../shared/team-rosters.service';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-roster-editor.component.html',
  styleUrls: ['./team-roster-editor.component.css'],
  animations: [enterPageAnimation]
})
export class TeamRosterEditorComponent implements DoCheck {

  breadcrumbItems: MenuItem[] = [];
  loading = false;
  oldUrlId: string;
  teamRoster: TeamRosterModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public teamRostersService: TeamRostersService
  ) { }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.breadcrumbItems = [
        { label: 'Team Rosters', routerLink: '/team-rosters' }
      ];
      if (this.urlId) {
        this.getTeamRoster(this.urlId);
      } else {
        this.breadcrumbItems.push(
          { label: 'New Team Roster' },
          { label: 'Add' }
        );
        this.teamRoster = new TeamRoster();
      }
    }
  }

  onTeamRosterFormSubmit(teamRoster: TeamRosterModel): void {
    this.teamRoster = _.clone(teamRoster);
    this.router.navigate([`team-rosters/${this.teamRoster.urlId}/edit`]);
    this.breadcrumbItems = [
      { label: 'Team Rosters', routerLink: '/team-rosters' },
      { label: this.teamRoster.name, routerLink: `/team-rosters/${this.teamRoster.urlId}` },
      { label: 'Edit' }
    ];
  }

  private get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  private getTeamRoster(urlId: string): void {
    const index = _.findIndex(this.teamRostersService.teamRosters, { urlId });
    if (index !== -1) {
      this.teamRoster = this.teamRostersService.teamRosters[index];
      this.breadcrumbItems.push(
        { label: this.teamRoster.name, routerLink: `/team-rosters/${this.urlId}` },
        { label: 'Edit' }
      );
    }
  }

}
