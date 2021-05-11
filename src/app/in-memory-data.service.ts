import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TeamModel } from './modules/teams/shared/team.model';
import { GalleriaImageModel } from './models/galleria-image.model';

import teamsJson from '../assets/data/teams.json';
import galleriaJson from '../assets/data/galleria.json';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teams: TeamModel[] = teamsJson.data;
    const galleria: GalleriaImageModel[] = galleriaJson.data;

    return {
      teams,
      galleria
    };
  }
}
