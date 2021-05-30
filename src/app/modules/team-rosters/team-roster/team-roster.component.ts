import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { TeamRosterModel } from '../shared/team-roster.model';
import { TeamRostersService } from '../shared/team-rosters.service';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class TeamRosterComponent implements DoCheck {

  breadcrumbItems: MenuItem[];
  loading = false;
  oldUrlId: string;
  teamRoster: TeamRosterModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,
    public teamRostersService: TeamRostersService
  ) { }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getTeamRoster(this.urlId);
    }
  }

  deleteTeamRoster(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete team roster "${this.teamRoster.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teamRostersService.deleteItem(this.teamRoster.id).subscribe(() => {
          const index = _.findIndex(this.teamRostersService.teamRosters, { id: this.teamRoster.id });
          this.teamRostersService.teamRosters.splice(index, 1);
          this.navigateToTeamRoster(this.teamRostersService.teamRosters[0].urlId);
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

  newTeamRoster(): void {
    this.router.navigate(['team-rosters/add']);
  }

  private get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  private getTeamRoster(urlId: string): void {
    this.breadcrumbItems = [
      { label: 'Team Rosters', routerLink: '/team-rosters' },
    ];
    const index = _.findIndex(this.teamRostersService.teamRosters, { urlId });
    if (index !== -1) {
      this.teamRoster = this.teamRostersService.teamRosters[index];
      this.breadcrumbItems.push(
        { label: this.teamRoster.name }
      );
    }
  }

}
