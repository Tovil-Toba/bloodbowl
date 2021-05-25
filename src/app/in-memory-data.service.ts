import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { GalleriaImageModel } from './models/galleria-image.model';
import { SkillModel } from './modules/skills/shared/skill.model';
import { StarPlayerModel } from './modules/star-players/shared/star-player.model';
import { TeamModel } from './modules/teams/shared/team.model';
import { TeamRosterModel } from './modules/team-rosters/shared/team-roster.model';

import galleriaJson from '../assets/data/galleria.json';
import skillsJson from '../assets/data/skills.json';
import starPlayersJson from '../assets/data/star-players.json';
import teamsJson from '../assets/data/teams.json';
import teamRostersJson from '../assets/data/team-rosters.json';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const galleria: GalleriaImageModel[] = galleriaJson.data;
    const skills: SkillModel[] = skillsJson.data;
    const starPlayers: StarPlayerModel[] = starPlayersJson.data;
    const teams: TeamModel[] = teamsJson.data;
    const teamRosters: TeamRosterModel[] = teamRostersJson.data;

    return {
      galleria,
      skills,
      starPlayers,
      teams,
      teamRosters
    };
  }
}
