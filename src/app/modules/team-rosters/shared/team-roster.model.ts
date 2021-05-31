import { PlayerProfileModel } from '../../shared/player-profile.model';

export interface TeamRosterModel {
  id: number;
  urlId: string;
  name: string;
  notableExamples?: string;
  description: string;
  playerProfiles: PlayerProfileModel[];
  bigGuyRules?: string;
  reRollCost: number;
  tier: number;
  race: string;
  specialRules: string;
  apothecary: boolean;
}
