export interface PlayerProfileModel {
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
  primary?: string;
  secondary?: string;
  bigGuy?: boolean;
}
