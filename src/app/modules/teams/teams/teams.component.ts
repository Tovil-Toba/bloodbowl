import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { TeamsService } from '../shared/teams.service';
import { TeamRostersService } from '../../team-rosters/shared/team-rosters.service';
import { TeamModel } from '../shared/team.model';
import { Team } from '../shared/team';
import { TeamRosterModel } from '../../team-rosters/shared/team-roster.model';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [
    ConfirmationService,
    MessageService
  ],
  animations: [enterPageAnimation]
})
export class TeamsComponent implements OnInit {

  teams: TeamModel[];
  team: TeamModel;
  teamRoster: TeamRosterModel;
  breadcrumbItems: MenuItem[];
  loading = false;
  teamFormDialog = false;
  teamInfoDialog = false;
  teamRosterInfoDialog = false;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    public teamsService: TeamsService,
    private teamRostersService: TeamRostersService
  ) { }

  deleteTeam(team: TeamModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete team "${team.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teamsService.deleteItem(team.id).subscribe(() => {
          this.teamsService.teams = this.teamsService.teams.filter(val => val.id !== team.id);
        });
      }
    });
  }

  editTeam(team: TeamModel): void {
    this.team = team;
    this.teamFormDialog = true;
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Teams' }
    ];
  }

  navigateToTeam(team: TeamModel): void {
    this.router.navigate([`teams/${team.urlId}`]);
  }

  onTeamFormSubmit(team: TeamModel): void {
    this.teamFormDialog = false;
  }

  openNewTeamDialog(): void {
    this.team = new Team();
    this.teamFormDialog = true;
  }

  openTeamInfoDialog(team: TeamModel): void {
    this.team = team;
    this.teamInfoDialog = true;
  }

  openTeamRosterInfoDialog(name: string): void {
    this.teamRoster = _.find(this.teamRostersService.teamRosters, { name });
    if (this.teamRoster) {
      this.teamRosterInfoDialog = true;
    }
  }

}
