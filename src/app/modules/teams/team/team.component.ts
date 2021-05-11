import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';

import { TeamModel } from '../shared/team.model';
import { TeamsService } from '../shared/teams.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations: [enterPageAnimation]
})
export class TeamComponent implements OnInit, DoCheck {
  team: TeamModel;
  oldUrlId: string;
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teamsService: TeamsService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  edit() {
    this.router.navigate([`teams/${this.urlId}/edit`]);
  }

  getTeam(urlId: string) {
    this.loading = true;
    this.teamsService.getItemsByField('urlId', urlId)
      .subscribe((teams: TeamModel[]) => {
        if (teams.length) {
          this.team = teams[0];
          this.breadcrumbItems = [
            {label: 'Teams', routerLink: '/teams'},
            {label: this.team.name}
          ];
        }
        this.loading = false;
      });
  }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getTeam(this.urlId);
    }
  }

  ngOnInit(): void {
  }
}
