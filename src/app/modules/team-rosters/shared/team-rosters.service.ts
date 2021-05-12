import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { Crud } from '../../../core/crud';
import { TeamRosterModel } from './team-roster.model';

@Injectable({
  providedIn: 'root'
})
export class TeamRostersService extends Crud<TeamRosterModel> {

  reloadTeamRostersTrigger = 0;
  selectedTeamRosterUrlId: string;

  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/teamRosters', http, messageService);
  }

  reloadTeamRosters(): void {
    this.reloadTeamRostersTrigger = Date.now();
  }
}
