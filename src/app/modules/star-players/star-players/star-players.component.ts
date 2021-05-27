import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { PlayerProfileModel } from '../../shared/player-profile.model';
import { SkillModel } from '../../skills/shared/skill.model';
import { StarPlayersService } from '../shared/star-players.service';
import { StarPlayerModel } from '../shared/star-player.model';
import { StarPlayer } from '../shared/star-player';
import { StarPlayersTableRowModel } from '../shared/star-players-table-row.model';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-star-players',
  templateUrl: './star-players.component.html',
  styleUrls: ['./star-players.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class StarPlayersComponent implements OnInit {

  starPlayers: StarPlayerModel[] = [];
  starPlayer: StarPlayer;
  starPlayersTableRows: StarPlayersTableRowModel[] = [];
  skill: SkillModel;
  breadcrumbItems: MenuItem[];
  loading = false;
  skillInfoDialog = false;
  starPlayerFormDialog = false;
  starPlayerInfoDialog = false;

  constructor(
    private confirmationService: ConfirmationService,
    public starPlayersService: StarPlayersService
  ) { }

  getStarPlayerTableRows(): void {
    const starPlayersTableRows = [];
    let id = 1;

    this.starPlayersService.starPlayers.forEach((starPlayer: StarPlayer) => {
      starPlayer.playerProfiles.forEach((playerProfile: PlayerProfileModel) => {
        const starPlayerTableRow: StarPlayersTableRowModel = {
          id,
          starPlayer,
          name: playerProfile.name,
          cost: starPlayer.playerProfiles[0].cost,
          movementAllowance: playerProfile.movementAllowance,
          strength: playerProfile.strength,
          agility: playerProfile.agility,
          passingAbility: playerProfile.passingAbility,
          armourValue: playerProfile.armourValue,
          skillsAndTraits: playerProfile.skillsAndTraits,
          bigGuy: playerProfile.bigGuy,
          numberOfPlayers: starPlayer.playerProfiles.length,
        };
        id++;
        starPlayersTableRows.push(starPlayerTableRow);
      });
    });

    this.starPlayersTableRows = starPlayersTableRows;
  }

  deleteStarPlayer(starPlayer: StarPlayerModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete star player "${starPlayer.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.starPlayersService.deleteItem(starPlayer.id).subscribe(() => {
          this.starPlayersService.starPlayers = this.starPlayersService.starPlayers
            .filter(val => val.id !== starPlayer.id);
          this.getStarPlayerTableRows();
        });
      }
    });
  }

  editStarPlayer(starPlayer: StarPlayerModel): void {
    this.starPlayer = starPlayer;
    this.starPlayerFormDialog = true;
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Star Players' }
    ];
    this.getStarPlayerTableRows();
  }

  onStarPlayerFormSubmit(starPlayer: StarPlayerModel): void {
    this.getStarPlayerTableRows();
    this.starPlayerFormDialog = false;
  }

  openNewStarPlayerDialog(): void {
    this.starPlayer = new StarPlayer();
    this.starPlayerFormDialog = true;
  }

  openSkillInfoDialog(skill: SkillModel): void {
    this.skill = skill;
    this.skillInfoDialog = true;
  }

  openStarPlayerInfoDialog(starPlayer: StarPlayerModel): void {
    this.starPlayer = starPlayer;
    this.starPlayerInfoDialog = true;
  }

}
