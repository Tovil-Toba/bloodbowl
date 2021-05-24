export interface TeamModel {
  id: number;
  roster: string;
  urlId: string;
  rank?: number; // для сортировки
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
}
