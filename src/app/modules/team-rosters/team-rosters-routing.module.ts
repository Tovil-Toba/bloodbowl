import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamRostersComponent } from './team-rosters/team-rosters.component';
import { TeamRosterEditorComponent } from './team-roster-editor/team-roster-editor.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';

const routes: Routes = [
  { path: 'team-rosters/:urlId/edit', component: TeamRosterEditorComponent },
  { path: 'team-rosters/:urlId', component: TeamRosterComponent },
  { path: 'team-rosters', component: TeamRostersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRostersRoutingModule { }
