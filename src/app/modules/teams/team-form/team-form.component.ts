import { Component, Input, OnInit } from '@angular/core';
import { TeamModel } from '../shared/team.model';
import { ActivatedRoute } from '@angular/router';

import { TeamsService } from '../shared/teams.service';
import { base64toFile } from '../../../shared/base64toFile';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  @Input() team: TeamModel;

  logo: string;
  photo: string;
  logos: File[] = [];
  photos: File[] = [];
  loading = false;
  submitLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamsService: TeamsService
  ) { }

  ngOnInit(): void {
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

  onLogoSelect(event) {
    for (const file of event.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.logo = reader.result.toString();
      };
    }
  }

  onPhotoSelect(event) {
    for (const file of event.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.photo = reader.result.toString();
      };
    }
  }

  onLogoClear() {
    this.logo = '';
  }

  onPhotoClear() {
    this.photo = '';
  }

  onSubmit() {
    this.submitLoading = true;
    this.team.logo = this.logo;
    this.team.photo = this.photo;
    if (!this.team.id) {
      this.teamsService.addItem(this.team)
        .subscribe(() => {
          this.teamsService.reloadTeams();
          this.submitLoading = false;
        });
    } else {
      this.teamsService.updateItem(this.team)
        .subscribe(() => {
          this.teamsService.reloadTeams();
          this.submitLoading = false;
        });
    }
  }

}
