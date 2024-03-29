import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TeamModel } from '../../teams/shared/team.model';
import { TeamRosterModel } from '../../team-rosters/shared/team-roster.model';
import { TeamRostersService } from '../../team-rosters/shared/team-rosters.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent {

  @Input() team: TeamModel;

  teamRoster: TeamRosterModel;
  teamRosterInfoDialog = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teamRostersService: TeamRostersService
  ) { }

  navigateToTeamRoster(teamRosterName: string): void {
    this.teamRoster = this.teamRostersService.getTeamRosterByName(teamRosterName);
    this.router.navigate([`team-rosters/${this.teamRoster.urlId}`]);
  }

  openTeamRosterInfoDialog(teamRosterName: string): void {
    this.teamRoster = this.teamRostersService.getTeamRosterByName(teamRosterName);
    this.teamRosterInfoDialog = true;
  }

  showTeamRoster(teamRosterName: string): void {
    if (this.activatedRoute.snapshot.url[0].path === 'teams' &&
      this.activatedRoute.snapshot.url[1]?.path === this.team.urlId
    ) {
      this.navigateToTeamRoster(teamRosterName);
    } else {
      this.openTeamRosterInfoDialog(teamRosterName);
    }
  }

}
