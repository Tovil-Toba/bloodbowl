import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

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

  getStarPlayersByUrlId$(urlId: string): Observable<StarPlayerModel[]> {
    const url = `api/starPlayers/?urlId=^${urlId}$`;
    return this.http.get<StarPlayerModel[]>(url);
  }

}
