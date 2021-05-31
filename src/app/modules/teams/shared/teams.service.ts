import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { Crud } from '../../../core/crud';
import { TeamModel } from './team.model';
import { TeamRosterModel } from '../../team-rosters/shared/team-roster.model';
import { TeamRostersService } from '../../team-rosters/shared/team-rosters.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends Crud<TeamModel> {

  teams: TeamModel[] = [];
  loading = false;
  selectedTeamUrlId: string;

  constructor(
    public http: HttpClient,
    public messageService: MessageService,
    private teamRostersService: TeamRostersService
  ) {
    super('api/teams', http, messageService);
  }

  getTeamsByRaces(): Record<string, TeamModel[]> {
    const racesByTeamRosters: Record<string, string> = {};
    this.teamRostersService.teamRosters.forEach((teamRoster: TeamRosterModel) => {
      if (!racesByTeamRosters[teamRoster.name]) {
        racesByTeamRosters[teamRoster.name] = teamRoster.race;
      }
    });

    const teamsByRaces: Record<number, TeamModel[]> = {};
    this.teams.forEach((team: TeamModel) => {
      const race = racesByTeamRosters[team.roster];
      if (!teamsByRaces[race]) {
        teamsByRaces[race] = [];
      }
      teamsByRaces[race].push(team);
    });

    return teamsByRaces;
  }

  getTeamsByTiers(): Record<number, TeamModel[]> {
    const tiersByTeamRosters: Record<string, number> = {};
    this.teamRostersService.teamRosters.forEach((teamRoster: TeamRosterModel) => {
      if (!tiersByTeamRosters[teamRoster.name]) {
        tiersByTeamRosters[teamRoster.name] = teamRoster.tier;
      }
    });

    const teamsByTiers: Record<number, TeamModel[]> = {};
    this.teams.forEach((team: TeamModel) => {
      const tier = tiersByTeamRosters[team.roster];
      if (!teamsByTiers[tier]) {
        teamsByTiers[tier] = [];
      }
      teamsByTiers[tier].push(team);
    });

    return teamsByTiers;
  }

  getTeamsByUrlId$(urlId: string): Observable<TeamModel[]> {
    const url = `api/teams/?urlId=^${urlId}$`;
    return this.http.get<TeamModel[]>(url);
  }

  getTeamByName(name: string): TeamModel {
    return _.find<TeamModel>(this.teams, (team: TeamModel) => team.name.toLowerCase() === name.toLowerCase());
  }
}
