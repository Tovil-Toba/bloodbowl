import { StarPlayerModel } from './star-player.model';
import { PlayerProfileModel } from '../../shared/player-profile.model';

export class StarPlayer implements StarPlayerModel {
  id: number;
  urlId: string;
  name: string;
  playerProfiles: PlayerProfileModel[];
  playsFor: string;
  specialRules: string;

  constructor(starPlayer?: Record<string, any>) {
    this.id = starPlayer?.id;
    this.urlId = starPlayer?.urlId ?? '';
    this.name = starPlayer?.name ?? '';
    this.playerProfiles = starPlayer?.playerProfiles ?? [];
    this.playsFor = starPlayer?.playsFor ?? '';
    this.specialRules = starPlayer?.specialRules ?? '';
  }
}
