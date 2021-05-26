import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { StarPlayerModel } from '../shared/star-player.model';
import { StarPlayersService } from '../shared/star-players.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-star-player',
  templateUrl: './star-player.component.html',
  styleUrls: ['./star-player.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class StarPlayerComponent implements OnInit, DoCheck {

  oldUrlId: string;
  starPlayer: StarPlayerModel;
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    public starPlayersService: StarPlayersService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  getStarPlayer(urlId: string): void {
    const index = _.findIndex(this.starPlayersService.starPlayers, { urlId });
    if (index !== -1) {
      this.starPlayer = this.starPlayersService.starPlayers[index];
      this.breadcrumbItems = [
        { label: 'Star Players', routerLink: '/star-players' },
        { label: this.starPlayer.name }
      ];
    }
  }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getStarPlayer(this.urlId);
    }
  }

  ngOnInit(): void {
  }

  deleteStarPlayer(): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete star player "${this.starPlayer.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.starPlayersService.deleteItem(this.starPlayer.id).subscribe(() => {
          const index = _.findIndex(this.starPlayersService.starPlayers, { id: this.starPlayer.id });
          // _.remove(this.starPlayersService.starPlayers, { id: this.starPlayer.id });
          this.starPlayersService.starPlayers.splice(index, 1);
          this.navigateToStarPlayer(this.starPlayersService.starPlayers[0].urlId);
        });
      }
    });
  }

  editStarPlayer(): void {
    this.router.navigate([`star-players/${this.urlId}/edit`]);
  }

  navigateToStarPlayer(urlId: string): void {
    this.router.navigate([`star-players/${urlId}`]);
  }

}
