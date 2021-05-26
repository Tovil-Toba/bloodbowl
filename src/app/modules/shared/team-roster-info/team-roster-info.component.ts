import { Component, Input, OnInit, DoCheck } from '@angular/core';
import * as _ from 'lodash';

import { PlayerProfileModel } from '../player-profile.model';
import { SkillModel } from '../../skills/shared/skill.model';
import { StarPlayerModel } from '../../star-players/shared/star-player.model';
import { StarPlayersService } from '../../star-players/shared/star-players.service';
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
  starPlayers: StarPlayerModel[] = [];
  quantities: Record<string, number> = {};
  assistantCoaches = 0;
  apothecary = 0;
  cheerleaders = 0;
  numberOfPlayers = 0;
  reRolls = 0;
  teamRosterCost = 0;
  teamInfoDialog = false;
  skillInfoDialog = false;

  constructor(
    private starPlayersService: StarPlayersService,
    private teamsService: TeamsService,
    public teamRostersService: TeamRostersService
  ) { }

  getFirstBigGuy(): void {
    this.firstBigGuy = _.find<PlayerProfileModel>(
      this.teamRoster.playerProfiles,
      (playerProfile: PlayerProfileModel) => playerProfile.cost >= 115000
    );
  }

  getQuantities(): void {
    this.quantities = {};
    this.teamRoster.playerProfiles.forEach((playerProfile: PlayerProfileModel) => {
      this.quantities[playerProfile.position] = 0;
    });
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

  decreaseApothecary(): void {
    if (this.apothecary > 0) {
      this.apothecary--;
      this.teamRosterCost = this.teamRosterCost - 50000;
    }
  }

  increaseApothecary(): void {
    if (this.apothecary < 1) {
      this.apothecary++;
      this.teamRosterCost = this.teamRosterCost + 50000;
    }
  }

  decreaseAssistantCoaches(): void {
    if (this.assistantCoaches > 0) {
      this.assistantCoaches--;
      this.teamRosterCost = this.teamRosterCost - 10000;
    }
  }

  increaseAssistantCoaches(): void {
    if (this.assistantCoaches < 6) {
      this.assistantCoaches++;
      this.teamRosterCost = this.teamRosterCost + 10000;
    }
  }

  decreaseCheerleaders(): void {
    if (this.cheerleaders > 0) {
      this.cheerleaders--;
      this.teamRosterCost = this.teamRosterCost - 10000;
    }
  }

  increaseCheerleaders(): void {
    if (this.cheerleaders < 12) {
      this.cheerleaders++;
      this.teamRosterCost = this.teamRosterCost + 10000;
    }
  }

  decreaseReRolls(): void {
    if (this.reRolls > 0) {
      this.reRolls--;
      this.teamRosterCost = this.teamRosterCost - this.teamRoster.reRollCost;
    }
  }

  increaseReRolls(): void {
    if (this.reRolls < 8) {
      this.reRolls++;
      this.teamRosterCost = this.teamRosterCost + this.teamRoster.reRollCost;
    }
  }

  decreaseQuantity(playerProfile: PlayerProfileModel): void {
    if (this.quantities[playerProfile.position] > 0) {
      this.quantities[playerProfile.position]--;
      this.teamRosterCost = this.teamRosterCost - playerProfile.cost;
      this.numberOfPlayers--;
    }
  }

  increaseQuantity(playerProfile: PlayerProfileModel): void {
    if (this.quantities[playerProfile.position] < playerProfile.quantity) {
      this.quantities[playerProfile.position]++;
      this.teamRosterCost = this.teamRosterCost + playerProfile.cost;
      this.numberOfPlayers++;
    }
  }

  ngDoCheck(): void {
    if (!_.isEqual(this.teamRoster, this.oldTeamRoster)) {
      this.oldTeamRoster = _.clone(this.teamRoster);
      this.resetTeamRoster();
      this.getTeams();
      this.getFirstBigGuy();
      this.starPlayers = this.starPlayersService.getStarPlayersBySpecialRules(this.teamRoster.specialRules);
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

  resetTeamRoster(): void {
    this.getQuantities();
    this.assistantCoaches = 0;
    this.apothecary = 0;
    this.cheerleaders = 0;
    this.numberOfPlayers = 0;
    this.reRolls = 0;
    this.teamRosterCost = 0;
  }

}
