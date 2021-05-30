import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { Crud } from '../../../core/crud';
import { TeamModel } from '../../teams/shared/team.model';
import { TeamRosterModel } from './team-roster.model';

@Injectable({
  providedIn: 'root'
})
export class TeamRostersService extends Crud<TeamRosterModel> {

  loading = false;
  selectedTeamRosterUrlId: string;
  teamRosters: TeamRosterModel[] = [];

  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/teamRosters', http, messageService);
  }

  getTeamRosterByName(name: string): TeamRosterModel {
    return _.find<TeamModel>(this.teamRosters, (teamRoster: TeamRosterModel) => teamRoster.name.toLowerCase() === name.toLowerCase());
  }

  getTeamRostersBySpecialRules(specialRules: string): TeamRosterModel[] {
    specialRules = specialRules.split('...')[0].trim().toLowerCase();
    return _.filter(this.teamRosters, teamRoster => teamRoster.specialRules.toLowerCase().includes(specialRules));
  }

  getTeamRostersByTiers(): Record<number, TeamRosterModel[]> {
    const teamRostersByTiers: Record<number, TeamRosterModel[]> = {};
    this.teamRosters.forEach((teamRoster: TeamRosterModel) => {
      if (!teamRostersByTiers[teamRoster.tier]) {
        teamRostersByTiers[teamRoster.tier] = [];
      }
      teamRostersByTiers[teamRoster.tier].push(teamRoster);
    });
    return teamRostersByTiers;
  }

  getTeamRostersByUrlId$(urlId: string): Observable<TeamRosterModel[]> {
    const url = `api/teamRosters/?urlId=^${urlId}$`;
    return this.http.get<TeamRosterModel[]>(url);
  }

}
