import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { TeamsService } from '../shared/teams.service';
import { TeamModel } from '../shared/team.model';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.css'],
  animations: [enterPageAnimation]
})
export class TeamEditorComponent implements OnInit {

  team: TeamModel;
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public teamsService: TeamsService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  getTeam(urlId: string): void {
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

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Teams' },
      { label: 'New Team' },
      { label: 'Add' }
    ];
    this.getTeam(this.urlId);
  }

  onTeamFormSubmit(team: TeamModel): void {
    this.team = team;
    this.breadcrumbItems = [
      { label: 'Teams', routerLink: '/teams' },
      { label: this.team.name, routerLink: `/teams/${this.urlId}` },
      { label: 'Edit' }
    ];
  }

}
