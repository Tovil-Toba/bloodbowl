import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { TeamModel } from '../shared/team.model';
import { TeamsService } from '../shared/teams.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [enterPageAnimation],
  providers: [ConfirmationService]
})
export class TeamComponent implements OnInit, DoCheck {

  breadcrumbItems: MenuItem[] = [];
  carouselPage = 0;
  loading = false;
  oldUrlId: string;
  team: TeamModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,
    public teamsService: TeamsService
  ) { }

  deleteTeam(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete team "${this.team.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teamsService.deleteItem(this.team.id).subscribe(() => {
          const index = _.findIndex(this.teamsService.teams, { id: this.team.id });
          this.teamsService.teams.splice(index, 1);
          this.carouselPage = index - 1;
        });
      }
    });
  }

  editTeam(): void {
    this.router.navigate([`teams/${this.urlId}/edit`]);
  }

  getTeam(urlId: string): void {
    this.breadcrumbItems = [
      { label: 'Teams', routerLink: '/teams' },
    ];
    const index = _.findIndex(this.teamsService.teams, { urlId });
    this.carouselPage = index;
    if (index !== -1) {
      this.team = this.teamsService.teams[index];
      this.breadcrumbItems.push(
        { label: this.team.name }
      );
    }
  }

  newTeam(): void {
    this.router.navigate(['teams/add']);
  }

  ngDoCheck(): void {
    if (this.teamsService.teams.length && this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getTeam(this.urlId);
    }
  }

  ngOnInit(): void {
  }

  onCarouselPage(event: { page: number }) {
    const team = this.teamsService.teams[event.page];
    this.getTeam(team.urlId);
    this.router.navigate([`/teams/${team.urlId}`]);
  }

  private get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

}
