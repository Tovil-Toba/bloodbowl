import { StarPlayerModel } from './star-player.model';

export interface StarPlayersTableRowModel {
  id: number;
  starPlayer: StarPlayerModel;
  name: string;
  cost: number;
  movementAllowance: number;
  strength: number;
  agility: number;
  passingAbility?: number;
  armourValue: number;
  skillsAndTraits: string;
  bigGuy?: boolean;
  numberOfPlayers?: number;
}
