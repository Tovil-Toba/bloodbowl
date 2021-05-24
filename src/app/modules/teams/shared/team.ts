import { TeamModel } from './team.model';

export class Team implements TeamModel {
  id: number;
  roster: string;
  urlId: string;
  rank?: number;
  logo?: string;
  photo?: string;
  name: string;
  colours?: string;
  owner: string;
  headCoach?: string;
  homeStadium?: string;
  players: string;
  honours?: string;
  hallOfFamePlayers?: string;
  spikeMagazineRating?: number;
  bio?: string;

  constructor(team?: Record<string, any>) {
    this.id = team?.id;
    this.roster = team?.roster ?? '';
    this.urlId = team?.urlId ?? '';
    this.rank = team?.rank;
    this.photo = team?.photo;
    this.name = team?.name;
    this.colours = team?.colours;
    this.owner = team?.owner ?? '';
    this.headCoach = team?.headCoach;
    this.homeStadium = team?.homeStadium;
    this.players = team?.players ?? '';
    this.honours = team?.honours;
    this.hallOfFamePlayers = team?.hallOfFamePlayers;
    this.spikeMagazineRating = team?.spikeMagazineRating;
    this.bio = team?.bio;
  }
}
