import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { Crud } from '../../../core/crud';
import { TeamModel } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends Crud<TeamModel> {

  teams: TeamModel[] = [];
  loading = false;
  selectedTeamUrlId: string;

  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/teams', http, messageService);
  }

  getTeamsByUrlId$(urlId: string): Observable<TeamModel[]> {
    const url = `api/teams/?urlId=^${urlId}$`;
    return this.http.get<TeamModel[]>(url);
  }

  getTeamByName(name: string): TeamModel {
    return _.find<TeamModel>(this.teams, { name });
  }
}
