import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { TeamRosterModel } from '../shared/team-roster.model';
import { TeamRostersService } from '../shared/team-rosters.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class TeamRosterComponent implements OnInit, DoCheck {

  oldUrlId: string;
  teamRoster: TeamRosterModel;
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
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
        { label: this.teamRoster.name }
      ];
    }
  }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getTeamRoster(this.urlId);
    }
  }

  ngOnInit(): void {
  }

  deleteTeamRoster(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete team roster "${this.teamRoster.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teamRostersService.deleteItem(this.teamRoster.id).subscribe(() => {
          const index = _.findIndex(this.teamRostersService.teamRosters, { id: this.teamRoster.id });
          // _.remove(this.teamRostersService.teamRosters, { id: this.teamRoster.id });
          this.teamRostersService.teamRosters.splice(index, 1);
        });
      }
    });
  }

  editTeamRoster(): void {
    this.router.navigate([`team-rosters/${this.urlId}/edit`]);
  }

  navigateToTeamRoster(urlId: string): void {
    this.router.navigate([`team-rosters/${urlId}`]);
  }

}
