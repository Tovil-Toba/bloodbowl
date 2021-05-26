import { PlayerProfileModel } from './player-profile.model';

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
  bigGuy?: boolean;

  constructor(playerProfile?: Record<string, any>) {
    this.id = playerProfile?.id;
    this.quantity = playerProfile?.quantity ?? 1;
    this.name = playerProfile?.name;
    this.position = playerProfile?.position;
    this.cost = playerProfile?.cost ?? 50000;
    this.movementAllowance = playerProfile?.movementAllowance ?? 6;
    this.strength = playerProfile?.strength ?? 3;
    this.agility = playerProfile?.agility ?? 4;
    this.passingAbility = playerProfile?.passingAbility ?? 4;
    this.armourValue = playerProfile?.armourValue ?? 8;
    this.skillsAndTraits = playerProfile?.skillsAndTraits ?? '';
    this.primary = playerProfile?.primary;
    this.secondary = playerProfile?.secondary;
    this.bigGuy = !!playerProfile?.bigGuy;
  }
}
