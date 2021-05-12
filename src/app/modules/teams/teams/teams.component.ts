import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { TeamsService } from '../shared/teams.service';
import { TeamModel } from '../shared/team.model';
import { MenuItem } from 'primeng/api';
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
export class TeamsComponent implements OnInit, DoCheck {

  oldReloadTeamsTrigger: number;
  teams: TeamModel[];
  team: TeamModel;
  breadcrumbItems: MenuItem[];
  loading = false;
  teamFormDialog = false;
  teamInfoDialog = false;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private teamsService: TeamsService
  ) { }

  ngDoCheck(): void {
    if (this.teamsService.reloadTeamsTrigger !== this.oldReloadTeamsTrigger) {
      this.oldReloadTeamsTrigger = this.teamsService.reloadTeamsTrigger;
      this.getTeams();
    }
  }

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
          this.teams = this.teams.filter(val => val.id !== team.id);
        });
      }
    });
  }

  getTeams(): void {
    this.loading = true;
    this.teamsService.getItems()
      .subscribe((teams: TeamModel[]) => {
        this.teams = teams;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Teams' }
    ];
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
