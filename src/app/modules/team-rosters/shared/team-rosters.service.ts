import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { Crud } from '../../../core/crud';
import { TeamRosterModel } from './team-roster.model';

@Injectable({
  providedIn: 'root'
})
export class TeamRostersService extends Crud<TeamRosterModel> {

  teamRosters: TeamRosterModel[] = [];
  loading = false;
  selectedTeamRosterUrlId: string;

  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/teamRosters', http, messageService);
  }

  getTeamRostersBySpecialRules(specialRules: string): TeamRosterModel[] {
    specialRules = specialRules.split('...')[0].trim();
    return _.filter(this.teamRosters, teamRoster => teamRoster.specialRules.includes(specialRules));
  }

  getTeamRostersByUrlId$(urlId: string): Observable<TeamRosterModel[]> {
    const url = `api/teamRosters/?urlId=^${urlId}$`;
    return this.http.get<TeamRosterModel[]>(url);
  }

}
