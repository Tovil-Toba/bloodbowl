import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { TeamRostersComponent } from './team-rosters/team-rosters.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';

@NgModule({
  declarations: [
    TeamRostersComponent,
    TeamRosterComponent
  ],
  imports: [SharedModule],
  providers: [MessageService]
})
export class TeamRostersModule { }
