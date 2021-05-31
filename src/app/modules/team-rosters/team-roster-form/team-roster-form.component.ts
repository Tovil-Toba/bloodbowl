import { Component, EventEmitter, DoCheck, Input, Output } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { PlayerProfile } from '../../shared/player-profile';
import { PlayerProfileModel } from '../../shared/player-profile.model';
import { TeamRosterModel } from '../shared/team-roster.model';
import { TeamRostersService } from '../shared/team-rosters.service';

import { TEAM_ROSTER_RACES } from '../shared/team-roster-races';

@Component({
  selector: 'app-team-roster-form',
  templateUrl: './team-roster-form.component.html',
  styleUrls: ['./team-roster-form.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class TeamRosterFormComponent implements DoCheck {

  @Input() teamRoster: TeamRosterModel;
  @Output() submittedTeamRoster = new EventEmitter<TeamRosterModel>();

  breadcrumbItems: MenuItem[] = [];
  clonedPlayerProfiles: { [s: string]: PlayerProfileModel; } = {};
  clonedTeamRoster: TeamRosterModel;
  editingRowKeys: { [s: string]: boolean; } = {};
  loading = false;
  oldTeamRoster: TeamRosterModel;
  submitLoading = false;
  teamRosterRaces: string[] = TEAM_ROSTER_RACES;

  constructor(
    private confirmationService: ConfirmationService,
    public teamRostersService: TeamRostersService,
  ) { }

  addNewPlayerProfile(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    const newPlayerProfile = new PlayerProfile({ id: this.clonedTeamRoster.playerProfiles.length + 1 });
    this.clonedTeamRoster.playerProfiles.push(newPlayerProfile);
    this.onRowEditInit(newPlayerProfile);
  }

  ngDoCheck(): void {
    if (!_.isEqual(this.teamRoster, this.oldTeamRoster)) {
      this.oldTeamRoster = _.clone(this.teamRoster);
      this.clonedTeamRoster = _.clone(this.teamRoster);
      this.teamRostersService.selectedTeamRosterUrlId = this.teamRoster.urlId;
      if (!this.clonedTeamRoster.id) {
        this.addNewPlayerProfile();
      }
    }
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
    this.clonedTeamRoster.playerProfiles[index] = this.clonedPlayerProfiles[playerProfile.id];
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
    if (!this.clonedTeamRoster.id) {
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
          const clonedTeamRosters = _.clone(this.teamRostersService.teamRosters);
          const index = _.findIndex(clonedTeamRosters, { id: this.clonedTeamRoster.id });
          clonedTeamRosters.splice(index, 1, this.clonedTeamRoster);
          this.teamRostersService.teamRosters = clonedTeamRosters;
          this.submittedTeamRoster.emit(this.clonedTeamRoster);
          this.submitLoading = false;
        });
    }
  }

}
