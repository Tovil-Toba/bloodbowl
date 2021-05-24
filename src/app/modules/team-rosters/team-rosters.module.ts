import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SharedCommonModule } from '../shared/shared-common.module';
import { TeamRostersComponent } from './team-rosters/team-rosters.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { TeamRosterFormComponent } from './team-roster-form/team-roster-form.component';
import { TeamRosterEditorComponent } from './team-roster-editor/team-roster-editor.component';
import { UniqueUrlIdValidatorDirective } from './shared/url-id.directive';

@NgModule({
  declarations: [
    TeamRostersComponent,
    TeamRosterComponent,
    TeamRosterFormComponent,
    TeamRosterEditorComponent,
    UniqueUrlIdValidatorDirective
  ],
  imports: [
    SharedModule,
    SharedCommonModule
  ],
  providers: [MessageService]
})
export class TeamRostersModule { }
