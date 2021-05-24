import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SkillsInfoComponent } from './skills-info/skills-info.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamRosterInfoComponent } from './team-roster-info/team-roster-info.component';

@NgModule({
  declarations: [
    SkillsInfoComponent,
    TeamInfoComponent,
    TeamRosterInfoComponent
  ],
  imports: [SharedModule],
  exports: [
    SkillsInfoComponent,
    TeamInfoComponent,
    TeamRosterInfoComponent
  ],
  providers: [MessageService]
})
export class SharedCommonModule { }
