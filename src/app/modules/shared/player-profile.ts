import { PlayerProfileModel } from './player-profile.model';
import { POSITIONS } from '../../constants/positions';

export class PlayerProfile implements PlayerProfileModel {
  id: number;
  quantity: number;
  name?: string;
  position?: string;
  cost: number;
  movementAllowance: number;
  strength: number;
  agility: number;
  passingAbility?: number;
  armourValue: number;
  skillsAndTraits: string;
  primary: string;
  secondary: string;
  race?: string;
  bigGuy?: boolean;

  constructor(playerProfile?: Record<string, any>) {
    this.id = playerProfile?.id;
    this.quantity = playerProfile?.quantity ?? 1;
    this.name = playerProfile?.name;
    this.position = playerProfile?.position ?? POSITIONS[0];
    this.cost = playerProfile?.cost ?? 0;
    this.movementAllowance = playerProfile?.movementAllowance ?? 0;
    this.strength = playerProfile?.strength ?? 0;
    this.agility = playerProfile?.agility ?? 0;
    this.passingAbility = playerProfile?.passingAbility ?? 0;
    this.armourValue = playerProfile?.armourValue ?? 0;
    this.skillsAndTraits = playerProfile?.skillsAndTraits ?? '';
    this.primary = playerProfile?.primary;
    this.secondary = playerProfile?.secondary;
    this.race = playerProfile?.race;
    this.bigGuy = !!playerProfile?.bigGuy;
  }
}
