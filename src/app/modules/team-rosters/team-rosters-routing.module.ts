import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamRostersComponent } from './team-rosters/team-rosters.component';

const routes: Routes = [
  { path: 'team-rosters/:urlId', component: TeamRostersComponent },
  { path: 'team-rosters', component: TeamRostersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRostersRoutingModule { }
