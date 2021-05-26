import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SkillsInfoComponent } from './skills-info/skills-info.component';
import { StarPlayerInfoComponent } from './star-player-info/star-player-info.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamRosterInfoComponent } from './team-roster-info/team-roster-info.component';

@NgModule({
  declarations: [
    SkillsInfoComponent,
    StarPlayerInfoComponent,
    TeamInfoComponent,
    TeamRosterInfoComponent
  ],
  imports: [SharedModule],
  exports: [
    SkillsInfoComponent,
    StarPlayerInfoComponent,
    TeamInfoComponent,
    TeamRosterInfoComponent
  ],
  providers: [MessageService]
})
export class SharedCommonModule { }
