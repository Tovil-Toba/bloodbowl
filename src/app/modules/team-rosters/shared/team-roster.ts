import { TeamRosterModel } from './team-roster.model';
import { PlayerProfileModel } from '../../shared/player-profile.model';

export class TeamRoster implements TeamRosterModel {
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

  constructor(teamRoster?: Record<string, any>) {
    this.id = teamRoster?.id;
    this.urlId = teamRoster?.urlId ?? '';
    this.name = teamRoster?.name ?? '';
    this.notableExamples = teamRoster?.notableExamples;
    this.description = teamRoster?.description ?? '';
    this.playerProfiles = teamRoster?.playerProfiles ?? [];
    this.bigGuyRules = teamRoster?.bigGuyRules;
    this.reRollCost = teamRoster?.reRollCost ?? 0;
    this.tier = teamRoster?.tier ?? 1;
    this.race = teamRoster?.race ?? 'Other';
    this.specialRules = teamRoster?.specialRules ?? '';
    this.apothecary = !!teamRoster?.name;
  }
}
