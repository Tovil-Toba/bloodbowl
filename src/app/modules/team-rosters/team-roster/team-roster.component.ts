import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { TeamRosterModel } from '../shared/team-roster.model';
import { PlayerProfileModel } from '../shared/player-profile.model';
import { TeamRostersService } from '../shared/team-rosters.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class TeamRosterComponent implements OnInit, DoCheck {

  oldUrlId: string;
  teamRoster: TeamRosterModel;
  clonedPlayerProfiles: { [s: string]: PlayerProfileModel; } = {};
  breadcrumbItems: MenuItem[];
  loading = false;
  statuses: any[];
  editingRowKeys: { [s: string]: boolean; } = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    public teamRostersService: TeamRostersService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  addNewPlayerProfile(): void {
    const newPlayerProfile = { id: this.teamRoster.playerProfiles.length + 1 } as PlayerProfileModel;
    this.teamRoster.playerProfiles.push(newPlayerProfile);
    this.onRowEditInit(newPlayerProfile);
  }

  getTeamRoster(urlId: string): void {
    const index = _.findIndex(this.teamRostersService.teamRosters, { urlId });
    if (index !== -1) {
      this.teamRoster = this.teamRostersService.teamRosters[index];
      this.breadcrumbItems = [
        { label: 'Team Rosters', routerLink: '/team-rosters' },
        { label: this.teamRoster.name }
      ];
    }
  }

  ngDoCheck(): void {
    if (this.urlId !== this.oldUrlId) {
      this.oldUrlId = this.urlId;
      this.getTeamRoster(this.urlId);
    }
  }

  ngOnInit(): void {
  }

  onRowEditInit(playerProfile: PlayerProfileModel): void {
    this.clonedPlayerProfiles[playerProfile.id.toString()] = _.clone(playerProfile);
    this.editingRowKeys[playerProfile.id.toString()] = true;
  }

  onRowEditSave(playerProfile: PlayerProfileModel): void {
    console.log('onRowEditSave', playerProfile);
  }

  onRowEditCancel(playerProfile: PlayerProfileModel, index: number): void {
    this.teamRoster.playerProfiles[index] = this.clonedPlayerProfiles[playerProfile.id];
    delete this.clonedPlayerProfiles[playerProfile.id];
  }

  onRowDelete(playerProfile: PlayerProfileModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete player profile "' + playerProfile.position + '"?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const clonedPlayerProfiles: PlayerProfileModel[] = _.clone(this.teamRoster.playerProfiles);
        this.teamRoster.playerProfiles = clonedPlayerProfiles
          .filter((profile: PlayerProfileModel) => profile.id !== playerProfile.id);
      }
    });
  }
}
