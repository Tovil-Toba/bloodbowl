import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { PlaysForInfoComponent } from './plays-for-info/plays-for-info.component';
import { SharedModule } from '../../shared/shared.module';
import { SkillsInfoComponent } from './skills-info/skills-info.component';
import { SkillInfoDialogComponent } from './skill-info-dialog/skill-info-dialog.component';
import { SpecialRulesInfoComponent } from './special-rules-info/special-rules-info.component';
import { StarPlayerInfoComponent } from './star-player-info/star-player-info.component';
import { TeamInfoComponent } from './team-info/team-info.component';
import { TeamRosterInfoComponent } from './team-roster-info/team-roster-info.component';

@NgModule({
  declarations: [
    PlaysForInfoComponent,
    SkillsInfoComponent,
    SkillInfoDialogComponent,
    SpecialRulesInfoComponent,
    StarPlayerInfoComponent,
    TeamInfoComponent,
    TeamRosterInfoComponent
  ],
  imports: [SharedModule],
  exports: [
    PlaysForInfoComponent,
    SkillsInfoComponent,
    SkillInfoDialogComponent,
    SpecialRulesInfoComponent,
    StarPlayerInfoComponent,
    TeamInfoComponent,
    TeamRosterInfoComponent
  ],
  providers: [MessageService]
})
export class SharedCommonModule { }
