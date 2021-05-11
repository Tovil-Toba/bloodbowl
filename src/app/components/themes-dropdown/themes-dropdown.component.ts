import { Component, OnInit } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';

import { ThemesService } from '../../core/themes.service';
import { ThemeModel } from '../../models/theme.model';
import { ThemeFilenameModel } from '../../models/theme-filename.model';

@Component({
  selector: 'app-themes-dropdown',
  templateUrl: './themes-dropdown.component.html',
  styleUrls: ['./themes-dropdown.component.css']
})
export class ThemesDropdownComponent implements OnInit {

  groupedThemes: SelectItemGroup[];

  constructor(public themesService: ThemesService) {
  }

  private getGroupedThemes(): void {
    this.groupedThemes = [];
    Object.entries(this.themesService.themes)
      .forEach(([key, themes]: [string, ThemeModel[]]) => {
        const selectItemGroup: SelectItemGroup = {
          label: key,
          items: []
        };
        themes.forEach((theme: ThemeModel) => {
          selectItemGroup.items.push(
            {
              label: theme.name,
              value: theme.filename,
              icon: theme.image
            }
          );
        });
        this.groupedThemes.push(selectItemGroup);
      });
  }

  changeTheme(event: { originalEvent: Event; value: ThemeFilenameModel }): void {
    this.themesService.changeTheme(event.value);
  }

  ngOnInit() {
    this.getGroupedThemes();
  }

}
