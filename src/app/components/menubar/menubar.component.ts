import { Component, OnInit, DoCheck } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { SKILL_CATEGORIES } from '../../modules/skills/shared/skill-categories';
import { SkillCategoryModel } from '../../modules/skills/shared/skill-category.model';
import { ThemesService } from '../../core/themes.service';
import { ThemeModel } from '../../models/theme.model';
import { ThemeFilenameModel } from '../../models/theme-filename.model';
import { TeamsService } from '../../modules/teams/shared/teams.service';
import { TeamRostersService } from '../../modules/team-rosters/shared/team-rosters.service';
import { TeamModel } from '../../modules/teams/shared/team.model';
import { TeamRosterModel } from '../../modules/team-rosters/shared/team-roster.model';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, DoCheck {

  items: MenuItem[];
  oldTeams: TeamModel[];
  oldTeamRosters: TeamRosterModel[];

  constructor(
    public themesService: ThemesService,
    private teamsService: TeamsService,
    private teamRostersService: TeamRostersService
  ) { }

  private get skillCategoriesItems(): MenuItem[] {
    const menuItems: MenuItem[] = [
      {
        label: 'Table',
        routerLink: ['/skills']
      },
      {
        separator: true
      }
    ];
    SKILL_CATEGORIES.forEach((skillCategory: SkillCategoryModel) => {
      menuItems.push(
        {
          label: skillCategory.name,
          routerLink: [`/skills/${skillCategory.urlId}`]
        }
      );
    });
    return menuItems;
  }

  private get themesItems(): MenuItem[] {
    const menuItems: MenuItem[] = [];
    Object.entries(this.themesService.themes)
      .forEach(([key, themes]: [string, ThemeModel[]]) => {
        const menuItem: MenuItem = {
          label: key,
          items: []
        };
        themes.forEach((theme: ThemeModel) => {
          menuItem.items.push(
            {
              label: `
                <div class="p-d-flex p-ai-center">
                  <img
                    src="assets/images/themes/${theme.image}"
                    alt="${theme.name}"
                    class="p-mr-2"
                    width="20"
                  />
                  <span>${theme.name}</span>
                </div>
              `,
              escape: false,
              command: () => this.changeTheme(theme.filename)
            }
          );
        });
        menuItems.push(menuItem);
      });
    return menuItems;
  }

  private get teamsItems(): MenuItem[] {
    const menuItems: MenuItem[] = [
      {
        label: 'Table',
        routerLink: ['/teams']
      },
      {
        separator: true
      }
    ];

    this.teamsService.teams.forEach((team: TeamModel) => {
      menuItems.push(
        {
          label: team.logo
            ?
              `
                <div class="p-d-flex p-ai-center">
                  <img
                    src="${team.logo}"
                    alt="${team.name}"
                    class="p-mr-2"
                    width="30"
                  />
                  <span>${team.name}</span>
                </div>
              `
            :
              `
                <div class="p-d-flex p-ai-center">
                  <span>${team.name}</span>
                </div>
              `
          ,
          escape: false,
          routerLink: [`/teams/${team.urlId}`]
        }
      );
    });

    return menuItems;
  }

  private get teamRostersItems(): MenuItem[] {
    const menuItems: MenuItem[] = [
      {
        label: 'All Team Rosters',
        routerLink: ['/team-rosters']
      },
      {
        separator: true
      }
    ];

    this.teamRostersService.teamRosters.forEach((teamRoster: TeamRosterModel) => {
      menuItems.push(
        {
          label: teamRoster.name,
          routerLink: [`/team-rosters/${teamRoster.urlId}`]
        }
      );
    });

    return menuItems;
  }

  changeTheme(filename: ThemeFilenameModel): void {
    this.themesService.changeTheme(filename);
  }

  ngDoCheck(): void {
    if (
      !_.isEqual(this.teamsService.teams, this.oldTeams) ||
      !_.isEqual(this.teamRostersService.teamRosters, this.oldTeamRosters)
    ) {
      this.oldTeams = _.clone(this.teamsService.teams);
      this.oldTeamRosters = _.clone(this.teamRostersService.teamRosters);

      this.items = [
        {
          label: 'Teams',
          icon: 'pi pi-fw pi-users',
          items: this.teamsItems
        },
        {
          label: 'Team Rosters',
          icon: 'pi pi-fw pi-table',
          items: this.teamRostersItems
        },
        {
          label: 'Star Players',
          icon: 'pi pi-fw pi-star',
          items: []
        },
        {
          label: 'Skills',
          icon: 'pi pi-fw pi-list',
          items: this.skillCategoriesItems
        },
        {
          label: 'Themes',
          icon: 'pi pi-fw pi-palette',
          items: this.themesItems
        },
        // {
        //   label: 'Quit',
        //   icon: 'pi pi-fw pi-power-off'
        // }
      ];
    }
  }

  ngOnInit(): void {
  }
}
