import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { PlayerProfileModel } from '../player-profile.model';
import { SkillModel } from '../../skills/shared/skill.model';
import { TeamRosterModel } from '../../team-rosters/shared/team-roster.model';
import { TeamsService } from '../../teams/shared/teams.service';
import { TeamRostersService } from '../../team-rosters/shared/team-rosters.service';
import { TeamModel } from '../../teams/shared/team.model';
import { Team } from '../../teams/shared/team';

@Component({
  selector: 'app-team-roster-info',
  templateUrl: './team-roster-info.component.html',
  styleUrls: ['./team-roster-info.component.css']
})
export class TeamRosterInfoComponent implements OnInit, DoCheck {

  @Input() teamRoster: TeamRosterModel;

  oldTeamRoster: TeamRosterModel;
  skill: SkillModel;
  team: TeamModel;
  teams: TeamModel[] = [];
  firstBigGuy: PlayerProfileModel;
  teamInfoDialog = false;
  skillInfoDialog = false;

  constructor(
    private router: Router,
    private teamsService: TeamsService,
    public teamRostersService: TeamRostersService
  ) { }

  getFirstBigGuy(): void {
    this.firstBigGuy = _.find<PlayerProfileModel>(
      this.teamRoster.playerProfiles,
      (playerProfile: PlayerProfileModel) => playerProfile.cost >= 115000
    );
  }

  getTeams(): void {
    if (this.teamRoster.notableExamples) {
      try {
        this.teams = [];
        const notableExamples: string[] = this.teamRoster.notableExamples.split(',');
        for (let teamName of notableExamples) {
          teamName = teamName.trim();
          let team: TeamModel = this.teamsService.getTeamByName(teamName);
          if (!team) {
            team = new Team({ name: teamName });
          }
          this.teams.push(team);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  ngDoCheck(): void {
    if (!_.isEqual(this.teamRoster, this.oldTeamRoster)) {
      this.oldTeamRoster = _.clone(this.teamRoster);
      this.getTeams();
      this.getFirstBigGuy();
    }
  }

  ngOnInit(): void {
  }

  openSkillInfoDialog(skill: SkillModel): void {
    this.skill = skill;
    this.skillInfoDialog = true;
  }

  openTeamInfoDialog(team: TeamModel): void {
    this.team = team;
    this.teamInfoDialog = true;
  }

}
