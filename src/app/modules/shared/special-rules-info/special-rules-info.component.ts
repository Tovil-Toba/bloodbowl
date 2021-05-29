import { Component, Input, OnInit, DoCheck } from '@angular/core';

import { TeamRostersService } from '../../team-rosters/shared/team-rosters.service';
import { TeamRosterModel } from '../../team-rosters/shared/team-roster.model';

@Component({
  selector: 'app-special-rules-info',
  templateUrl: './special-rules-info.component.html',
  styleUrls: ['./special-rules-info.component.css']
})
export class SpecialRulesInfoComponent implements OnInit, DoCheck {

  @Input() specialRules: string;

  oldSpecialRules: string;
  specialRulesArray: string[] = [];

  constructor(private teamRostersService: TeamRostersService) { }

  getTeamRosterTooltip(specialRules: string): string {
    let teamRosterTooltip = '';
    const teamRosters: TeamRosterModel[] = this.teamRostersService.getTeamRostersBySpecialRules(specialRules);
    teamRosters.forEach((teamRoster: TeamRosterModel) => {
      teamRosterTooltip += `${teamRoster.name}<br />`;
    });
    return teamRosterTooltip;
  }

  ngDoCheck(): void {
    if (this.specialRules !== this.oldSpecialRules) {
      this.specialRulesArray = this.specialRules.split(', ');
    }
  }

  ngOnInit(): void {
  }

}
