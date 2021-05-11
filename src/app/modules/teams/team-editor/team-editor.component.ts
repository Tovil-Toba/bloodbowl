import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MenuItem } from 'primeng/api';

import { base64toFile } from '../../../utils/base64toFile';
import { TeamsService } from '../shared/teams.service';
import { TeamModel } from '../shared/team.model';
import { enterPageAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-team-editor',
  templateUrl: './team-editor.component.html',
  styleUrls: ['./team-editor.component.css'],
  animations: [enterPageAnimation]
})
export class TeamEditorComponent implements OnInit {
  team: TeamModel;
  logo: string;
  photo: string;
  logos: File[] = [];
  photos: File[] = [];
  breadcrumbItems: MenuItem[];
  loading = false;
  submitLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private teamsService: TeamsService
  ) { }

  get urlId(): string {
    return this.activatedRoute.snapshot.paramMap.get('urlId');
  }

  getTeam(urlId: string) {
    this.loading = true;
    this.teamsService.getItemsByField('urlId', urlId)
      .subscribe((teams: TeamModel[]) => {
        if (teams.length) {
          const team = teams[0];
          this.teamsService.selectedTeamUrlId = team.urlId;
          this.team = team;
          this.logo = team.logo;
          this.photo = team.photo;
          if (team.logo) {
            this.logos.push(base64toFile(team.logo, 'logo'));
          }
          if (team.photo) {
            this.photos.push(base64toFile(team.photo, 'photo'));
          }
          this.breadcrumbItems = [
            { label: 'Teams', routerLink: '/teams' },
            { label: this.team.name, routerLink: `/teams/${this.urlId}` },
            { label: 'Edit' }
          ];
        }
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      { label: 'Teams' },
      { label: 'New Team' },
      { label: 'Add' }
    ];
    this.getTeam(this.urlId);
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
    this.teamsService.updateItem(this.team)
      .subscribe(() => {
        this.teamsService.reloadTeams();
        this.submitLoading = false;
      });
  }
}
