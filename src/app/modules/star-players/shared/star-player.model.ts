import { PlayerProfileModel } from '../../shared/player-profile.model';

export interface StarPlayerModel {
  id: number;
  urlId: string;
  name: string;
  playerProfiles: PlayerProfileModel[];
  playsFor: string;
  specialRules: string;
}
