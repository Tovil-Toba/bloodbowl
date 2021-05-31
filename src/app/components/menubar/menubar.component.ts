import { Component, DoCheck } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as _ from 'lodash';

import { PlayerProfileWithUrlIdModel } from '../../modules/shared/player-profile.model';
import { SkillCategoryModel } from '../../modules/skills/shared/skill-category.model';
import { StarPlayersService } from '../../modules/star-players/shared/star-players.service';
import { StarPlayerModel } from '../../modules/star-players/shared/star-player.model';
import { ThemesService } from '../../core/themes.service';
import { ThemeModel } from '../../models/theme.model';
import { ThemeFilenameModel } from '../../models/theme-filename.model';
import { TeamModel } from '../../modules/teams/shared/team.model';
import { TeamRostersService } from '../../modules/team-rosters/shared/team-rosters.service';
import { TeamRosterModel } from '../../modules/team-rosters/shared/team-roster.model';
import { TeamsService } from '../../modules/teams/shared/teams.service';

import { POSITIONS } from '../../constants/positions';
import { SKILL_CATEGORIES } from '../../modules/skills/shared/skill-categories';
import { TEAM_ROSTER_RACES } from '../../modules/team-rosters/shared/team-roster-races';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements DoCheck {

  items: MenuItem[];
  oldStarPlayers: StarPlayerModel[];
  oldStarPlayersReloadingTrigger = 0;
  oldTeams: TeamModel[];
  oldTeamRosters: TeamRosterModel[];

  constructor(
    public themesService: ThemesService,
    private teamsService: TeamsService,
    private teamRostersService: TeamRostersService,
    private starPlayersService: StarPlayersService
  ) { }

  changeTheme(filename: ThemeFilenameModel): void {
    this.themesService.changeTheme(filename);
  }

  ngDoCheck(): void {
    if (
      !_.isEqual(this.teamsService.teams, this.oldTeams) ||
      !_.isEqual(this.teamRostersService.teamRosters, this.oldTeamRosters) ||
      !_.isEqual(this.starPlayersService.starPlayers, this.oldStarPlayers) ||
      this.starPlayersService.reloadingTrigger !== this.oldStarPlayersReloadingTrigger
    ) {
      this.oldTeams = _.clone(this.teamsService.teams);
      this.oldTeamRosters = _.clone(this.teamRostersService.teamRosters);
      this.oldStarPlayers = _.clone(this.starPlayersService.starPlayers);
      this.oldStarPlayersReloadingTrigger = this.starPlayersService.reloadingTrigger;

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
          items: this.starPlayersItems
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

  private get starPlayersItems(): MenuItem[] {
    const menuItems: MenuItem[] = [
      {
        label: 'Table',
        routerLink: ['/star-players']
      },
      {
        separator: true
      }
    ];

    const starPlayersByPositions: Record<string, PlayerProfileWithUrlIdModel[]> =
      this.starPlayersService.getStarPlayersByPositions();

    POSITIONS.forEach((position: string) => {
      if (starPlayersByPositions[position]) {
        const menuItem: MenuItem = {
          label: position,
          items: []
        };
        starPlayersByPositions[position].forEach((playerProfile: PlayerProfileWithUrlIdModel) => {
          menuItem.items.push(
            {
              label: playerProfile.name,
              routerLink: [`/star-players/${playerProfile.urlId}`]
            }
          );
        });
        menuItems.push(menuItem);
      }
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

    const teamsByTiers: Record<number, TeamModel[]> = this.teamsService.getTeamsByTiers();

    [1, 2, 3].forEach(tier => {
      if (teamsByTiers[tier]) {
        const menuItem: MenuItem = {
          label: `Tier ${tier}`,
          items: []
        };
        teamsByTiers[tier].forEach((team: TeamModel) => {
          menuItem.items.push(this.getTeamMenuItem(team));
        });
        menuItems.push(menuItem);
      }
    });

    menuItems.push({
      separator: true
    });

    const teamsByRaces: Record<string, TeamModel[]> = this.teamsService.getTeamsByRaces();

    TEAM_ROSTER_RACES.forEach((race: string) => {
      if (teamsByRaces[race]) {
        const menuItem: MenuItem = {
          label: race,
          items: []
        };
        teamsByRaces[race].forEach((team: TeamModel) => {
          menuItem.items.push(this.getTeamMenuItem(team));
        });
        menuItems.push(menuItem);
      }
    });

    return menuItems;
  }

  private get teamRostersItems(): MenuItem[] {
    const menuItems: MenuItem[] = [
      {
        label: 'Table',
        routerLink: ['/team-rosters']
      },
      {
        separator: true
      }
    ];

    const teamRostersByTiers: Record<number, TeamRosterModel[]> = this.teamRostersService.getTeamRostersByTiers();

    [1, 2, 3].forEach(tier => {
      if (teamRostersByTiers[tier]) {
        const menuItem: MenuItem = {
          label: `Tier ${tier}`,
          items: []
        };
        teamRostersByTiers[tier].forEach((teamRoster: TeamRosterModel) => {
          menuItem.items.push(
            {
              label: teamRoster.name,
              routerLink: [`/team-rosters/${teamRoster.urlId}`]
            }
          );
        });
        menuItems.push(menuItem);
      }
    });

    menuItems.push({
      separator: true
    });

    const teamRostersByRaces: Record<number, TeamRosterModel[]> = this.teamRostersService.getTeamRostersByRaces();

    TEAM_ROSTER_RACES.forEach((race: string) => {
      if (teamRostersByRaces[race]) {
        const menuItem: MenuItem = {
          label: race,
          items: []
        };
        teamRostersByRaces[race].forEach((teamRoster: TeamRosterModel) => {
          menuItem.items.push(
            {
              label: teamRoster.name,
              routerLink: [`/team-rosters/${teamRoster.urlId}`]
            }
          );
        });
        menuItems.push(menuItem);
      }
    });

    return menuItems;
  }

  private getTeamMenuItem(team: TeamModel): MenuItem {
    return {
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
    };
  }

}
