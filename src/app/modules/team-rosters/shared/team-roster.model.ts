import { PlayerProfileModel } from './player-profile.model';

export interface TeamRosterModel {
  id: number;
  urlId: string;
  name: string;
  playerProfiles?: PlayerProfileModel[]; // TODO сделать обязательным, убрать ?
}
