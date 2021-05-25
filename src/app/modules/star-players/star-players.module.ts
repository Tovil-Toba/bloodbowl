import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { UniqueUrlIdValidatorDirective } from './shared/url-id.directive';
import { StarPlayersComponent } from './star-players/star-players.component';
import { StarPlayerComponent } from './star-player/star-player.component';
import { StarPlayerEditorComponent } from './star-player-editor/star-player-editor.component';

@NgModule({
  declarations: [UniqueUrlIdValidatorDirective, StarPlayersComponent, StarPlayerComponent, StarPlayerEditorComponent],
  imports: [SharedModule],
  providers: [MessageService]
})
export class StarPlayersModule { }
