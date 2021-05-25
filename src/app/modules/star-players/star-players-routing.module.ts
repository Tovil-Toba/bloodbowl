import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarPlayersComponent } from './star-players/star-players.component';
import { StarPlayerComponent } from './star-player/star-player.component';
import { StarPlayerEditorComponent} from './star-player-editor/star-player-editor.component';

const routes: Routes = [
  { path: 'star-players/:urlId/edit', component: StarPlayerEditorComponent },
  { path: 'star-players/:urlId', component: StarPlayerComponent },
  { path: 'star-players', component: StarPlayersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StarPlayersRoutingModule { }
