import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SharedCommonModule} from '../shared/shared-common.module';
import { TeamComponent } from './team/team.component';
import { TeamEditorComponent } from './team-editor/team-editor.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { UniqueUrlIdValidatorDirective } from './shared/url-id.directive';

@NgModule({
  declarations: [
    TeamComponent,
    TeamEditorComponent,
    TeamsComponent,
    TeamFormComponent,
    UniqueUrlIdValidatorDirective
  ],
  imports: [
    SharedModule,
    SharedCommonModule
  ],
  providers: [MessageService]
})
export class TeamsModule { }
