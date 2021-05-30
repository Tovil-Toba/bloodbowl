import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { PlayerProfileWithUrlIdModel } from '../../shared/player-profile.model';
import { POSITIONS } from '../../../constants/positions';
import { StarPlayerModel } from '../shared/star-player.model';
import { StarPlayersService } from '../shared/star-players.service';

@Component({
  selector: 'app-star-player',
  templateUrl: './star-player.component.html',
  styleUrls: ['./star-player.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class StarPlayerComponent implements DoCheck {

  breadcrumbItems: MenuItem[] = [];
  loading = false;
  oldUrlId: string;
  playerProfileIndex = 0;
  positions: string[] = POSITIONS;
  starPlayer: StarPlayerModel;
  starPlayersByPositions: Record<string, PlayerProfileWithUrlIdModel[]> = {};
  tabIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,
    public starPlayersService: StarPlayersService
  ) { }

  deleteStarPlayer(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete star player "${this.starPlayer.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.starPlayersService.deleteItem(this.starPlayer.id).subscribe(() => {
          const index = _.findIndex(this.starPlayersService.starPlayers, { id: this.starPlayer.id });
          this.starPlayersService.starPlayers.splice(index, 1);
          this.navigateToStarPlayer(this.starPlayersService.starPlayers[0].urlId);
        });
      }
    });
  }

  editStarPlayer(): void {
    let urlId = this.urlId;
    const parts = urlId.split('-');
    if (/^\d+$/.test(parts[parts.length - 1])) {
      urlId = parts.join('-');
    }
    this.router.navigate([`star-players/${urlId}/edit`]);
  }

  navigateToStarPlayer(urlId: string): void {
    this.router.navigate([`star-players/${urlId}`]);
  }

  newStarPlayer(): void {
    this.router.navigate(['star-players/add']);
  }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getStarPlayer(this.urlId);
      this.getStarPlayersByPositions();
      if (this.starPlayer && this.starPlayer.playerProfiles[this.playerProfileIndex]) {
        this.tabIndex = this.positions.indexOf(this.starPlayer.playerProfiles[this.playerProfileIndex].position);
      }
    }
  }

  private get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  private getStarPlayer(urlId: string): void {
    const parts = urlId.split('-');
    if (/^\d+$/.test(parts[parts.length - 1])) {
      this.playerProfileIndex = +parts[parts.length - 1] - 1;
      parts.splice(parts.length - 1, 1);
      urlId = parts.join('-');
    } else {
      this.playerProfileIndex = 0;
    }

    this.breadcrumbItems = [
      { label: 'Star Players', routerLink: '/star-players' }
    ];
    const index = _.findIndex(this.starPlayersService.starPlayers, { urlId });
    if (index !== -1) {
      this.starPlayer = this.starPlayersService.starPlayers[index];
      this.breadcrumbItems.push(
        { label: this.starPlayer.name }
      );
    }
  }

  private getStarPlayersByPositions(): void {
    this.starPlayersByPositions = this.starPlayersService.getStarPlayersByPositions();
    const positions = _.clone(this.positions);
    positions.forEach((position: string, index: number) => {
      if (!this.starPlayersByPositions[position]) {
        positions.splice(index, 1);
      }
    });
    this.positions = positions;
  }

}
