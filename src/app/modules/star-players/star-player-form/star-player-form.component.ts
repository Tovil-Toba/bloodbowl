import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { StarPlayerModel } from '../shared/star-player.model';
import { PlayerProfileModel } from '../../shared/player-profile.model';
import { PlayerProfile } from '../../shared/player-profile';
import { StarPlayersService } from '../shared/star-players.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-star-player-form',
  templateUrl: './star-player-form.component.html',
  styleUrls: ['./star-player-form.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class StarPlayerFormComponent implements OnInit {

  @Input() starPlayer: StarPlayerModel;
  @Output() submittedStarPlayer = new EventEmitter<StarPlayerModel>();

  clonedStarPlayer: StarPlayerModel;
  clonedPlayerProfiles: { [s: string]: PlayerProfileModel; } = {};
  breadcrumbItems: MenuItem[];
  editingRowKeys: { [s: string]: boolean; } = {};
  loading = false;
  submitLoading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    public starPlayersService: StarPlayersService
  ) { }

  addNewPlayerProfile(event: MouseEvent): void {
    event.preventDefault();
    const newPlayerProfile = new PlayerProfile({ id: this.starPlayer.playerProfiles.length + 1 });
    this.clonedStarPlayer.playerProfiles.push(newPlayerProfile);
    this.onRowEditInit(newPlayerProfile);
  }

  ngOnInit(): void {
    this.clonedStarPlayer = _.clone(this.starPlayer);
    this.starPlayersService.selectedStarPlayerUrlId = this.starPlayer.urlId;
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
    if (!this.starPlayer.id) {
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
          this.clonedStarPlayer = _.clone(this.clonedStarPlayer);
          const index = _.findIndex(this.starPlayersService.starPlayers, { id: this.clonedStarPlayer.id });
          const clonedStarPlayers = _.clone(this.starPlayersService.starPlayers);
          clonedStarPlayers.splice(index, 1, this.clonedStarPlayer);
          this.starPlayersService.starPlayers = clonedStarPlayers;
          this.submittedStarPlayer.emit(this.clonedStarPlayer);
          this.submitLoading = false;
        });
    }
  }

}
