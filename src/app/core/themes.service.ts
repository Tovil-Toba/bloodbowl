import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { ThemeModel } from '../models/theme.model';
import { ThemesModel } from '../models/themes.model';
import { ThemeFilenameModel } from '../models/theme-filename.model';

import { THEMES } from '../constants/themes';
import { DEFAULT_THEME_FILENAME } from '../constants/default-theme-filename';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  selectedTheme: ThemeFilenameModel;
  selectedThemeImage: string;
  themes: ThemesModel;

  constructor(private dbService: NgxIndexedDBService) {
    this.themes = THEMES;
  }

  changeTheme(filename: ThemeFilenameModel): void {
    const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
    themeLink.href = `assets/css/themes/${filename}/theme.css`;
    this.setSelectedTheme(filename);
  }

  setDefaultTheme(): void {
    this.dbService.getByKey('settings', 'selectedTheme')
      .subscribe((item: { key: string; value: ThemeFilenameModel }) => {
        const defaultThemeFilename = (item && item.value) || DEFAULT_THEME_FILENAME;
        this.changeTheme(defaultThemeFilename);
      });
  }

  setSelectedTheme(filename: ThemeFilenameModel): void {
    Object.values(this.themes).forEach((themes: ThemeModel[]) => {
      themes.forEach((theme: ThemeModel) => {
        if (theme.filename === filename) {
          this.selectedTheme = theme.filename;
          this.selectedThemeImage = theme.image;
          this.dbService
            .update('settings', { key: 'selectedTheme', value: theme.filename })
            .subscribe();
          return;
        }
      });
    });
  }
}
