import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import * as _ from 'lodash';

import { TeamModel } from '../shared/team.model';
import { TeamsService } from '../shared/teams.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [enterPageAnimation],
  providers: [ConfirmationService]
})
export class TeamComponent implements OnInit, DoCheck {
  team: TeamModel;
  oldUrlId: string;
  breadcrumbItems: MenuItem[];
  carouselPage = 0;
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    public teamsService: TeamsService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  deleteTeam(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete team "${this.team.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teamsService.deleteItem(this.team.id).subscribe(() => {
          const index = _.findIndex(this.teamsService.teams, { id: this.team.id });
          // _.remove(this.teamsService.teams, { id: this.team.id });
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
    const index = _.findIndex(this.teamsService.teams, { urlId });
    this.carouselPage = index;
    if (index !== -1) {
      this.team = this.teamsService.teams[index];
      this.breadcrumbItems = [
        { label: 'Teams', routerLink: '/teams' },
        { label: this.team.name }
      ];
    }
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
    window.history.pushState('', '', `/teams/${team.urlId}`);
  }

}
