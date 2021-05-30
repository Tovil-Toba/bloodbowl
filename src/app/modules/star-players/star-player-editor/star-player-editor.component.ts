import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { StarPlayer } from '../shared/star-player';
import { StarPlayerModel } from '../shared/star-player.model';
import { StarPlayersService } from '../shared/star-players.service';

@Component({
  selector: 'app-star-player-editor',
  templateUrl: './star-player-editor.component.html',
  styleUrls: ['./star-player-editor.component.css'],
  animations: [enterPageAnimation]
})
export class StarPlayerEditorComponent implements DoCheck {

  breadcrumbItems: MenuItem[] = [];
  loading = false;
  oldUrlId: string;
  starPlayer: StarPlayerModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public starPlayersService: StarPlayersService
  ) { }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.breadcrumbItems = [
        { label: 'Star Players', routerLink: '/star-players' }
      ];
      if (this.urlId) {
        this.getStarPlayer(this.urlId);
      } else {
        this.breadcrumbItems.push(
          { label: 'New Star Player' },
          { label: 'Add' }
        );
        this.starPlayer = new StarPlayer();
      }
    }
  }

  onStarPlayerFormSubmit(starPlayer: StarPlayerModel): void {
    this.starPlayer = _.clone(starPlayer);
    this.router.navigate([`star-players/${this.starPlayer.urlId}/edit`]);
    this.breadcrumbItems = [
      { label: 'Star Players', routerLink: '/star-players' },
      { label: this.starPlayer.name, routerLink: `/star-players/${this.urlId}` },
      { label: 'Edit' }
    ];
  }

  private get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  private getStarPlayer(urlId: string): void {
    const index = _.findIndex(this.starPlayersService.starPlayers, { urlId });
    if (index !== -1) {
      this.starPlayer = this.starPlayersService.starPlayers[index];
      this.breadcrumbItems.push(
        { label: this.starPlayer.name, routerLink: `/star-players/${this.urlId}` },
        { label: 'Edit' }
      );
    }
  }

}
