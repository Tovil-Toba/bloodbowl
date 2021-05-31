import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { enterPageAnimation } from '../../../shared/animations';
import { PlayerProfileModel } from '../../shared/player-profile.model';
import { TeamRoster } from '../shared/team-roster';
import { TeamRosterModel } from '../shared/team-roster.model';
import { TeamRostersService } from '../shared/team-rosters.service';

import { TEAM_ROSTER_RACES } from '../shared/team-roster-races';

@Component({
  selector: 'app-team-rosters',
  templateUrl: './team-rosters.component.html',
  styleUrls: ['./team-rosters.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class TeamRostersComponent implements OnInit {

  apothecary = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];
  breadcrumbItems: MenuItem[] = [];
  loading = false;
  selectedApothecary: boolean | null = null;
  selectedRace: string | null = null;
  selectedTier: number | null = null;
  teamRoster: TeamRosterModel;
  teamRosters: TeamRosterModel[] = [];
  teamRosterFormDialog = false;
  teamRosterInfoDialog = false;
  teamRosterRaces: string[] = TEAM_ROSTER_RACES;
  tiers = [
    { label: 'Tier 1', value: 1 },
    { label: 'Tier 2', value: 2 },
    { label: 'Tier 3', value: 3 }
  ];

  constructor(
    private confirmationService: ConfirmationService,
    public teamRostersService: TeamRostersService
  ) { }

  deleteTeamRoster(teamRoster: TeamRosterModel): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete team roster "${teamRoster.name}"?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teamRostersService.deleteItem(teamRoster.id).subscribe(() => {
          this.teamRostersService.teamRosters = this.teamRostersService.teamRosters
            .filter(val => val.id !== teamRoster.id);
          this.teamRosters = this.teamRosters.filter(val => val.id !== teamRoster.id);
        });
      }
    });
  }

  editTeamRoster(teamRoster: TeamRosterModel): void {
    this.teamRoster = teamRoster;
    this.teamRosterFormDialog = true;
  }

  getPositionTooltip(playerProfile: PlayerProfileModel): string {
    return `
      <table>
        <tr>
          <th class="p-pr-3">QTY</th>
          <th class="p-pr-3 p-text-left">POSITION</th>
          <th class="p-pr-3">COST</th>
          <th class="p-pr-3">MA</th>
          <th class="p-pr-3">ST</th>
          <th class="p-pr-3">AG</th>
          <th class="p-pr-3">PA</th>
          <th class="p-pr-3">AV</th>
          <th class="p-pr-3 p-text-left">SKILLS & TRAITS</th>
          <th class="p-pr-3">PRIMARY</th>
          <th>SECONDARY</th>
        </tr>
        <tr>
          <td class="p-text-center p-pr-3">${playerProfile.quantity}</td>
          <td class="p-pr-3">${playerProfile.position}</td>
          <td class="p-text-center p-pr-3">${playerProfile.cost}</td>
          <td class="p-text-center p-pr-3">${playerProfile.movementAllowance}</td>
          <td class="p-text-center p-pr-3">${playerProfile.strength}</td>
          <td class="p-text-center p-pr-3">${playerProfile.agility}+</td>
          <td class="p-text-center p-pr-3">${playerProfile.passingAbility}+</td>
          <td class="p-text-center p-pr-3">${playerProfile.armourValue}+</td>
          <td class="p-pr-3">${playerProfile.skillsAndTraits}</td>
          <td class="p-text-center p-pr-3">${playerProfile.primary}</td>
          <td class="p-text-center p-pr-3">${playerProfile.secondary}</td>
        </tr>
      </table>
    `;
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Team Rosters' }
    ];
    this.teamRosters = _.clone(this.teamRostersService.teamRosters);
  }

  onTeamRosterFormSubmit(teamRoster: TeamRosterModel): void {
    this.teamRosterFormDialog = false;
  }

  onApothecaryChange(apothecary: boolean | null) {
    this.selectedApothecary = apothecary;
    this.applyFilters();
  }

  onRaceChange(race: string | null): void {
    this.selectedRace = race;
    this.applyFilters();
  }

  onTierChange(tier: number | null): void {
    this.selectedTier = tier;
    this.applyFilters();
  }

  openNewTeamRosterDialog(): void {
    this.teamRoster = new TeamRoster();
    this.teamRosterFormDialog = true;
  }

  openTeamRosterInfoDialog(teamRoster: TeamRosterModel): void {
    this.teamRoster = teamRoster;
    this.teamRosterInfoDialog = true;
  }

  private applyFilters(): void {
    if (this.selectedTier === null && this.selectedRace === null && this.selectedApothecary === null) {
      this.teamRosters = _.clone(this.teamRostersService.teamRosters);
      return;
    }

    let teamRosters = _.clone(this.teamRostersService.teamRosters);

    if (this.selectedTier) {
      teamRosters = _.filter(teamRosters, { tier: this.selectedTier });
    }
    if (this.selectedRace) {
      teamRosters = _.filter(teamRosters, { race: this.selectedRace });
    }
    if (this.selectedApothecary !== null) {
      teamRosters = _.filter(teamRosters, { apothecary: this.selectedApothecary });
    }

    this.teamRosters = teamRosters;
  }

}
