import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { TeamModel } from '../shared/team.model';
import { TeamsService } from '../shared/teams.service';
import { Team } from '../shared/team';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.css'],
  animations: [enterPageAnimation]
})
export class TeamEditorComponent implements DoCheck {

  breadcrumbItems: MenuItem[] = [];
  loading = false;
  oldUrlId: string;
  team: TeamModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public teamsService: TeamsService
  ) { }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.breadcrumbItems = [
        { label: 'Teams', routerLink: '/teams' }
      ];
      if (this.urlId) {
        this.getTeam(this.urlId);
      } else {
        this.breadcrumbItems.push(
          { label: 'New Team' },
          { label: 'Add' }
        );
        this.team = new Team();
      }
    }
  }

  onTeamFormSubmit(team: TeamModel): void {
    this.team = _.clone(team);
    this.router.navigate([`teams/${this.team.urlId}/edit`]);
    this.breadcrumbItems = [
      { label: 'Teams', routerLink: '/teams' },
      { label: this.team.name, routerLink: `/teams/${this.urlId}` },
      { label: 'Edit' }
    ];
  }

  private get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  private getTeam(urlId: string): void {
    const index = _.findIndex(this.teamsService.teams, { urlId });
    if (index !== -1) {
      this.team = this.teamsService.teams[index];
      this.breadcrumbItems = [
        { label: 'Teams', routerLink: '/teams' },
        { label: this.team.name, routerLink: `/teams/${this.urlId}` },
        { label: 'Edit' }
      ];
    }
  }

}
