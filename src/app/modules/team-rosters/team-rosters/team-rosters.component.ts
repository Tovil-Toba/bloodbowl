import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';

import { enterPageAnimation } from '../../../shared/animations';
import { PlayerProfileModel } from '../../shared/player-profile.model';
import { TeamRoster } from '../shared/team-roster';
import { TeamRosterModel } from '../shared/team-roster.model';
import { TeamRostersService } from '../shared/team-rosters.service';

@Component({
  selector: 'app-team-rosters',
  templateUrl: './team-rosters.component.html',
  styleUrls: ['./team-rosters.component.css'],
  providers: [ConfirmationService],
  animations: [enterPageAnimation]
})
export class TeamRostersComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  loading = false;
  teamRoster: TeamRosterModel;
  teamRosters: TeamRosterModel[] = [];
  teamRosterFormDialog = false;
  teamRosterInfoDialog = false;

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
  }

  onTeamRosterFormSubmit(teamRoster: TeamRosterModel): void {
    this.teamRosterFormDialog = false;
  }

  openNewTeamRosterDialog(): void {
    this.teamRoster = new TeamRoster();
    this.teamRosterFormDialog = true;
  }

  openTeamRosterInfoDialog(teamRoster: TeamRosterModel): void {
    this.teamRoster = teamRoster;
    this.teamRosterInfoDialog = true;
  }
}
