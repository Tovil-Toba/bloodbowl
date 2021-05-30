import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamComponent } from './team/team.component';
import { TeamEditorComponent } from './team-editor/team-editor.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: 'teams/add', component: TeamEditorComponent },
  { path: 'teams/:urlId/edit', component: TeamEditorComponent },
  { path: 'teams/:urlId', component: TeamComponent },
  { path: 'teams', component: TeamsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
