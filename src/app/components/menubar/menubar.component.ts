import { Component, OnInit, DoCheck } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { ThemesService } from '../../core/themes.service';
import { ThemeModel } from '../../models/theme.model';
import { ThemeFilenameModel } from '../../models/theme-filename.model';
import { TeamsService } from '../../modules/teams/shared/teams.service';
import { TeamModel } from '../../modules/teams/shared/team.model';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit, DoCheck {

  items: MenuItem[];
  oldReloadTeamsTrigger: number;

  constructor(
    public themesService: ThemesService,
    private teamsService: TeamsService
  ) { }

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
    const menuItems: MenuItem[] = [];
    this.teamsService.getItems().subscribe((teams: TeamModel[]) => {
      teams.forEach((team: TeamModel) => {
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
    });
    return menuItems;
  }

  changeTheme(filename: ThemeFilenameModel): void {
    this.themesService.changeTheme(filename);
  }

  ngDoCheck(): void {
    if (this.teamsService.reloadTeamsTrigger !== this.oldReloadTeamsTrigger) {
      this.oldReloadTeamsTrigger = this.teamsService.reloadTeamsTrigger;

      this.items = [
        {
          label: 'Teams',
          icon: 'pi pi-fw pi-users',
          items: this.teamsItems
        },
        {
          label: 'Skills',
          icon: 'pi pi-fw pi-list',
          items: [
            {
              label: 'General',
              routerLink: ['/skills/general']
            },
            {
              label: 'Agility',
              routerLink: ['/skills/agility']
            },
            {
              label: 'Passing',
              routerLink: ['/skills/passing']
            },
            {
              label: 'Strength',
              routerLink: ['/skills/strength']
            },
            {
              label: 'Mutation',
              routerLink: ['/skills/mutation']
            },
            {
              label: 'Traits',
              routerLink: ['/skills/traits']
            }
          ]
        },
        {
          label: 'Themes',
          icon: 'pi pi-fw pi-palette',
          items: this.themesItems
        },
        {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off'
        }
      ];
    }
  }

  ngOnInit(): void {
  }
}
