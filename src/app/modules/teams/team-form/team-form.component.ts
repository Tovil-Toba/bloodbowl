import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

import { base64toFile } from '../../../shared/base64toFile';
import { TeamModel } from '../shared/team.model';
import { TeamsService } from '../shared/teams.service';
import { TeamRostersService } from '../../team-rosters/shared/team-rosters.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  @Input() team: TeamModel;
  @Output() submittedTeam = new EventEmitter<TeamModel>();

  clonedTeam: TeamModel;
  logo: string;
  photo: string;
  logos: File[] = [];
  photos: File[] = [];
  loading = false;
  submitLoading = false;

  constructor(
    private teamsService: TeamsService,
    public teamRostersService: TeamRostersService
  ) { }

  ngOnInit(): void {
    this.clonedTeam = _.clone(this.team);
    this.teamsService.selectedTeamUrlId = this.team.urlId;
    this.logo = this.team.logo;
    this.photo = this.team.photo;
    if (this.team.logo) {
      this.logos.push(base64toFile(this.team.logo, 'logo'));
    }
    if (this.team.photo) {
      this.photos.push(base64toFile(this.team.photo, 'photo'));
    }
  }

  onLogoSelect(event): void {
    for (const file of event.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.logo = reader.result.toString();
      };
    }
  }

  onPhotoSelect(event): void {
    for (const file of event.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.photo = reader.result.toString();
      };
    }
  }

  onLogoClear(): void {
    this.logo = '';
  }

  onPhotoClear(): void {
    this.photo = '';
  }

  onSubmit(): void {
    this.submitLoading = true;
    this.clonedTeam.logo = this.logo;
    this.clonedTeam.photo = this.photo;
    if (!this.clonedTeam.id) {
      this.teamsService.addItem(this.clonedTeam)
        .subscribe((team: TeamModel) => {
          this.clonedTeam = _.clone(team);
          const clonedTeams = _.clone(this.teamsService.teams);
          clonedTeams.push(this.clonedTeam);
          this.teamsService.teams = clonedTeams;
          this.submittedTeam.emit(team);
          this.submitLoading = false;
        });
    } else {
      this.teamsService.updateItem(this.clonedTeam)
        .subscribe(() => {
          this.clonedTeam = _.clone(this.clonedTeam);
          const index = _.findIndex(this.teamsService.teams, { id: this.clonedTeam.id });
          const clonedTeams = _.clone(this.teamsService.teams);
          clonedTeams.splice(index, 1, this.clonedTeam);
          this.teamsService.teams = clonedTeams;
          this.submittedTeam.emit(this.clonedTeam);
          this.submitLoading = false;
        });
    }
  }

}
