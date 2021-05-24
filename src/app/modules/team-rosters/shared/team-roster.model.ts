import { PlayerProfileModel } from './player-profile.model';

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
  specialRules: string;
  apothecary: boolean;
}
