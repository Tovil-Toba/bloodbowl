import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TeamsService } from '../shared/teams.service';
import { TeamModel } from '../shared/team.model';
import { MenuItem } from 'primeng/api';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  animations: [enterPageAnimation]
})
export class TeamsComponent implements OnInit {
  teams: TeamModel[];
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    private router: Router,
    private teamsService: TeamsService
  ) { }

  getTeams(): void {
    this.loading = true;
    this.teamsService.getItems()
      .subscribe((teams: TeamModel[]) => {
        this.teams = teams;
        this.loading = false;
      });
  }

  goToTeam(id: string): void {
    this.router.navigate([`teams/${id}`]);
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Teams' }
    ];
    this.getTeams();
  }

}
