import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { TeamRosterModel } from '../shared/team-roster.model';
import { PlayerProfileModel } from '../../shared/player-profile.model';
import { PlayerProfile } from '../../shared/player-profile';
import { TeamRostersService } from '../shared/team-rosters.service';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-roster-form',
  templateUrl: './team-roster-form.component.html',
  styleUrls: ['./team-roster-form.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class TeamRosterFormComponent implements OnInit {

  @Input() teamRoster: TeamRosterModel;
  @Output() submittedTeamRoster = new EventEmitter<TeamRosterModel>();

  clonedTeamRoster: TeamRosterModel;
  clonedPlayerProfiles: { [s: string]: PlayerProfileModel; } = {};
  breadcrumbItems: MenuItem[];
  editingRowKeys: { [s: string]: boolean; } = {};
  loading = false;
  submitLoading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    public teamRostersService: TeamRostersService,
  ) { }

  addNewPlayerProfile(event: MouseEvent): void {
    event.preventDefault();
    const newPlayerProfile = new PlayerProfile({ id: this.teamRoster.playerProfiles.length + 1 });
    this.clonedTeamRoster.playerProfiles.push(newPlayerProfile);
    this.onRowEditInit(newPlayerProfile);
  }

  ngOnInit(): void {
    this.clonedTeamRoster = _.clone(this.teamRoster);
    this.teamRostersService.selectedTeamRosterUrlId = this.teamRoster.urlId;
  }

  onRowEditInit(playerProfile: PlayerProfileModel): void {
    this.clonedPlayerProfiles[playerProfile.id.toString()] = _.clone(playerProfile);
    this.editingRowKeys[playerProfile.id.toString()] = true;
  }

  onRowEditSave(playerProfile: PlayerProfileModel): void {
    const index = _.findIndex(this.clonedTeamRoster.playerProfiles, { id: playerProfile.id });
    this.clonedTeamRoster.playerProfiles.splice(index, 1, playerProfile);
    this.clonedTeamRoster = _.clone(this.clonedTeamRoster);
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
        this.clonedTeamRoster.playerProfiles = _.clone(this.clonedTeamRoster.playerProfiles
          .filter((profile: PlayerProfileModel) => profile.id !== playerProfile.id)
        );
      }
    });
  }

  onSubmit(): void {
    this.submitLoading = true;
    if (!this.teamRoster.id) {
      this.teamRostersService.addItem(this.clonedTeamRoster)
        .subscribe((teamRoster: TeamRosterModel) => {
          this.clonedTeamRoster = _.clone(teamRoster);
          const clonedTeamRosters = _.clone(this.teamRostersService.teamRosters);
          clonedTeamRosters.push(this.clonedTeamRoster);
          this.teamRostersService.teamRosters = clonedTeamRosters;
          this.submittedTeamRoster.emit(teamRoster);
          this.submitLoading = false;
        });
    } else {
      this.teamRostersService.updateItem(this.clonedTeamRoster)
        .subscribe(() => {
          this.clonedTeamRoster = _.clone(this.clonedTeamRoster);
          const index = _.findIndex(this.teamRostersService.teamRosters, { id: this.clonedTeamRoster.id });
          const clonedTeamRosters = _.clone(this.teamRostersService.teamRosters);
          clonedTeamRosters.splice(index, 1, this.clonedTeamRoster);
          this.teamRostersService.teamRosters = clonedTeamRosters;
          this.submittedTeamRoster.emit(this.clonedTeamRoster);
          this.submitLoading = false;
        });
    }
  }

}
