import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { TeamRostersComponent } from './team-rosters/team-rosters.component';

@NgModule({
  declarations: [
    TeamRostersComponent
  ],
  imports: [SharedModule],
  providers: [MessageService]
})
export class TeamRostersModule { }
