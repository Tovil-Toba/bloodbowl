import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TeamModel } from './modules/teams/shared/team.model';
import { TeamRosterModel } from './modules/team-rosters/shared/team-roster.model';
import { SkillModel } from './modules/skills/shared/skill.model';
import { GalleriaImageModel } from './models/galleria-image.model';

import teamsJson from '../assets/data/teams.json';
import teamRostersJson from '../assets/data/team-rosters.json';
import skillsJson from '../assets/data/skills.json';
import galleriaJson from '../assets/data/galleria.json';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const teams: TeamModel[] = teamsJson.data;
    const teamRosters: TeamRosterModel[] = teamRostersJson.data;
    const skills: SkillModel[] = skillsJson.data;
    const galleria: GalleriaImageModel[] = galleriaJson.data;

    return {
      teams,
      teamRosters,
      skills,
      galleria
    };
  }
}
