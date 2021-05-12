import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { GalleriaModule } from 'primeng/galleria';
import { MenubarModule } from 'primeng/menubar';
import { ScrollTopModule } from 'primeng/scrolltop';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { SkillsRoutingModule } from './modules/skills/skills-routing.module';
import { TeamsRoutingModule } from './modules/teams/teams-routing.module';
import { TeamRostersRoutingModule } from './modules/team-rosters/team-rosters-routing.module';

import { SkillsModule } from './modules/skills/skills.module';
import { TeamsModule } from './modules/teams/teams.module';
import { TeamRostersModule } from './modules/team-rosters/team-rosters.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ThemesDropdownComponent } from './components/themes-dropdown/themes-dropdown.component';
import { InMemoryDataService } from './in-memory-data.service';

import { DB_CONFIG } from './constants/db-config';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenubarComponent,
    ThemesDropdownComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    GalleriaModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    MenubarModule,
    NgxIndexedDBModule.forRoot(DB_CONFIG),
    SharedModule,
    SkillsModule,
    SkillsRoutingModule,
    ScrollTopModule,
    TeamsModule,
    TeamRostersModule,
    TeamsRoutingModule,
    TeamRostersRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
