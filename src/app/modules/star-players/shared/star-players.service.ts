import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as _ from 'lodash';

import { Crud } from '../../../core/crud';
import { StarPlayerModel } from './star-player.model';

@Injectable({
  providedIn: 'root'
})
export class StarPlayersService extends Crud<StarPlayerModel> {

  starPlayers: StarPlayerModel[] = [];
  loading = false;
  selectedStarPlayerUrlId: string;

  constructor(
    public http: HttpClient,
    public messageService: MessageService
  ) {
    super('api/starPlayers', http, messageService);
  }

  getStarPlayersBySpecialRules(teamRosterSpecialRules: string): StarPlayerModel[] {
    const specialRulesArray = teamRosterSpecialRules.split(', ');

    for (let i = 0; i < specialRulesArray.length; i++) {
      specialRulesArray[i] = specialRulesArray[i].trim();
      if (specialRulesArray[i].includes('Favoured of')) {
        specialRulesArray[i] = 'Favoured of...';
      }
    }

    return _.filter<StarPlayerModel[]>(
      this.starPlayers,
      (starPlayer: StarPlayerModel) => {
        return starPlayer.playsFor === 'Any team.' ||
          new RegExp(specialRulesArray.join('|')).test(starPlayer.playsFor);
      }
    );
  }

  getStarPlayersByUrlId$(urlId: string): Observable<StarPlayerModel[]> {
    const url = `api/starPlayers/?urlId=^${urlId}$`;
    return this.http.get<StarPlayerModel[]>(url);
  }

}
