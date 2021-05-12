import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { TeamComponent } from './team/team.component';
import { TeamEditorComponent } from './team-editor/team-editor.component';
import { TeamsComponent } from './teams/teams.component';
import { UniqueUrlIdValidatorDirective } from './shared/id.directive';
import { TeamFormComponent } from './team-form/team-form.component';
import { TeamInfoComponent } from './team-info/team-info.component';

@NgModule({
  declarations: [
    TeamComponent,
    TeamEditorComponent,
    TeamsComponent,
    UniqueUrlIdValidatorDirective,
    TeamFormComponent,
    TeamInfoComponent
  ],
  imports: [SharedModule],
  providers: [MessageService]
})
export class TeamsModule { }
