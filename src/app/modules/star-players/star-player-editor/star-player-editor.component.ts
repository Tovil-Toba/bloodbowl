import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { StarPlayerModel } from '../shared/star-player.model';
import { StarPlayersService } from '../shared/star-players.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-star-player-editor',
  templateUrl: './star-player-editor.component.html',
  styleUrls: ['./star-player-editor.component.css'],
  animations: [enterPageAnimation]
})
export class StarPlayerEditorComponent implements OnInit {

  starPlayer: StarPlayerModel;
  breadcrumbItems: MenuItem[];
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
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
        { label: this.starPlayer.name, routerLink: `/star-players/${this.urlId}` },
        { label: 'Edit' }
      ];
    }
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Star Players' },
      { label: 'New Star Player' },
      { label: 'Add' }
    ];
    this.getStarPlayer(this.urlId);
  }

  onStarPlayerFormSubmit(starPlayer: StarPlayerModel): void {
    this.starPlayer = starPlayer;
    this.breadcrumbItems = [
      { label: 'Star Players', routerLink: '/star-players' },
      { label: this.starPlayer.name, routerLink: `/star-players/${this.urlId}` },
      { label: 'Edit' }
    ];
  }

}
