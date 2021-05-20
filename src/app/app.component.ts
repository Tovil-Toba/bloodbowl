import { Component, HostBinding, OnInit } from '@angular/core';
import { PrimeNGConfig, FilterService } from 'primeng/api';

import { ThemesService } from './core/themes.service';
import { themeChangeAnimation } from './shared/animations';
import { TeamsService } from './modules/teams/shared/teams.service';
import { TeamRostersService } from './modules/team-rosters/shared/team-rosters.service';
import { SkillsService } from './modules/skills/shared/skills.service';
import { TeamModel } from './modules/teams/shared/team.model';
import { TeamRosterModel } from './modules/team-rosters/shared/team-roster.model';
import { SkillModel } from './modules/skills/shared/skill.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    FilterService,
    PrimeNGConfig
  ],
  animations: [themeChangeAnimation]
})
export class AppComponent implements OnInit {
  @HostBinding('@.disabled') animationsDisabled = false;

  title = 'Blood Bowl';

  constructor(
    private primengConfig: PrimeNGConfig,
    public themesService: ThemesService,
    public teamsService: TeamsService,
    public teamRostersService: TeamRostersService,
    public skillsService: SkillsService
  ) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.themesService.setDefaultTheme();
    this.teamsService.loading = true;
    this.teamRostersService.loading = true;
    this.skillsService.loading = true;

    this.teamsService.getItems().subscribe((teams: TeamModel[]) => {
      this.teamsService.teams = teams;
      this.teamsService.loading = false;
    });

    this.teamRostersService.getItems().subscribe((teamRosters: TeamRosterModel[]) => {
      this.teamRostersService.teamRosters = teamRosters;
      this.teamRostersService.loading = false;
    });

    this.skillsService.getItems().subscribe((skills: SkillModel[]) => {
      this.skillsService.skills = skills;
      this.skillsService.loading = false;
    });
  }
}
