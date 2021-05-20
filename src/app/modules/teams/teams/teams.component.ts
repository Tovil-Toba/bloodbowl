import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { TeamsService } from '../shared/teams.service';
import { TeamModel } from '../shared/team.model';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  animations: [enterPageAnimation],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class TeamsComponent implements OnInit {

  teams: TeamModel[];
  team: TeamModel;
  breadcrumbItems: MenuItem[];
  loading = false;
  teamFormDialog = false;
  teamInfoDialog = false;

  constructor(
    private confirmationService: ConfirmationService,
    public teamsService: TeamsService
  ) { }

  editTeam(team: TeamModel): void {
    this.team = team;
    this.teamFormDialog = true;
  }

  deleteTeam(team: TeamModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete team "' + team.name + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teamsService.deleteItem(team.id).subscribe(() => {
          this.teamsService.teams = this.teamsService.teams.filter(val => val.id !== team.id);
        });
      }
    });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Teams' }
    ];
  }

  onTeamFormSubmit(team: TeamModel): void {
    this.teamFormDialog = false;
  }

  openNewTeamDialog(): void {
    this.team = {} as TeamModel;
    this.teamFormDialog = true;
  }

  openTeamInfoDialog(team: TeamModel): void {
    this.team = team;
    this.teamInfoDialog = true;
  }

}
