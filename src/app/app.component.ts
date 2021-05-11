import { Component, HostBinding, OnInit } from '@angular/core';
import { PrimeNGConfig, FilterService } from 'primeng/api';

import { ThemesService } from './core/themes.service';
import { themeChangeAnimation } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    FilterService,
    PrimeNGConfig
  ],
  animations: [themeChangeAnimation]
})
export class AppComponent implements OnInit {
  @HostBinding('@.disabled') animationsDisabled = false;

  title = 'BloodBowl';

  constructor(
    private primengConfig: PrimeNGConfig,
    public themesService: ThemesService
  ) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.themesService.setDefaultTheme();
  }
}
