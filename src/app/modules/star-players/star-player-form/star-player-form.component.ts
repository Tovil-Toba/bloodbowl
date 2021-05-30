import { Component, EventEmitter, DoCheck, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { PlayerProfile } from '../../shared/player-profile';
import { POSITIONS } from '../../../constants/positions';
import { PlayerProfileModel } from '../../shared/player-profile.model';
import { StarPlayerModel } from '../shared/star-player.model';
import { StarPlayersService } from '../shared/star-players.service';

@Component({
  selector: 'app-star-player-form',
  templateUrl: './star-player-form.component.html',
  styleUrls: ['./star-player-form.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class StarPlayerFormComponent implements DoCheck {

  @Input() starPlayer: StarPlayerModel;
  @Output() submittedStarPlayer = new EventEmitter<StarPlayerModel>();

  breadcrumbItems: MenuItem[] = [];
  clonedStarPlayer: StarPlayerModel;
  clonedPlayerProfiles: { [s: string]: PlayerProfileModel; } = {};
  editingRowKeys: { [s: string]: boolean; } = {};
  loading = false;
  oldStarPlayer: StarPlayerModel;
  positions: string[] = POSITIONS;
  submitLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    public starPlayersService: StarPlayersService
  ) { }

  addNewPlayerProfile(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    const newPlayerProfile = new PlayerProfile({ id: this.starPlayer.playerProfiles.length + 1 });
    this.clonedStarPlayer.playerProfiles.push(newPlayerProfile);
    this.onRowEditInit(newPlayerProfile);
  }

  ngDoCheck(): void {
    if (!_.isEqual(this.starPlayer, this.oldStarPlayer)) {
      this.oldStarPlayer = _.clone(this.starPlayer);
      this.clonedStarPlayer = _.clone(this.starPlayer);
      this.starPlayersService.selectedStarPlayerUrlId = this.starPlayer.urlId;
      if (!this.clonedStarPlayer.id) {
        this.addNewPlayerProfile();
      }
    }
  }

  onRowEditInit(playerProfile: PlayerProfileModel): void {
    this.clonedPlayerProfiles[playerProfile.id.toString()] = _.clone(playerProfile);
    this.editingRowKeys[playerProfile.id.toString()] = true;
  }

  onRowEditSave(playerProfile: PlayerProfileModel): void {
    const index = _.findIndex(this.clonedStarPlayer.playerProfiles, { id: playerProfile.id });
    this.clonedStarPlayer.playerProfiles.splice(index, 1, playerProfile);
    this.clonedStarPlayer = _.clone(this.clonedStarPlayer);
  }

  onRowEditCancel(playerProfile: PlayerProfileModel, index: number): void {
    this.clonedStarPlayer.playerProfiles[index] = this.clonedPlayerProfiles[playerProfile.id];
    delete this.clonedPlayerProfiles[playerProfile.id];
  }

  onRowDelete(playerProfile: PlayerProfileModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete player profile "' + playerProfile.position + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clonedStarPlayer.playerProfiles = _.clone(this.clonedStarPlayer.playerProfiles
          .filter((profile: PlayerProfileModel) => profile.id !== playerProfile.id)
        );
      }
    });
  }

  onSubmit(): void {
    this.submitLoading = true;
    if (!this.clonedStarPlayer.id) {
      this.starPlayersService.addItem(this.clonedStarPlayer)
        .subscribe((starPlayer: StarPlayerModel) => {
          this.clonedStarPlayer = _.clone(starPlayer);
          const clonedStarPlayers = _.clone(this.starPlayersService.starPlayers);
          clonedStarPlayers.push(this.clonedStarPlayer);
          this.starPlayersService.starPlayers = clonedStarPlayers;
          this.submittedStarPlayer.emit(starPlayer);
          this.submitLoading = false;
        });
    } else {
      this.starPlayersService.updateItem(this.clonedStarPlayer)
        .subscribe(() => {
          const clonedStarPlayers = _.clone(this.starPlayersService.starPlayers);
          const index = _.findIndex(clonedStarPlayers, { id: this.clonedStarPlayer.id });
          clonedStarPlayers.splice(index, 1, this.clonedStarPlayer);
          this.starPlayersService.starPlayers =  _.clone(clonedStarPlayers);
          this.submittedStarPlayer.emit(this.clonedStarPlayer);
          this.starPlayersService.activateReloadingTrigger();
          this.submitLoading = false;
        });
    }
  }

}
