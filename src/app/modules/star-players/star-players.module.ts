import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';

import { SharedModule } from '../../shared/shared.module';
import { SharedCommonModule } from '../shared/shared-common.module';
import { StarPlayerComponent } from './star-player/star-player.component';
import { StarPlayersComponent } from './star-players/star-players.component';
import { StarPlayerEditorComponent } from './star-player-editor/star-player-editor.component';
import { StarPlayerFormComponent } from './star-player-form/star-player-form.component';
import { UniqueUrlIdValidatorDirective } from './shared/url-id.directive';

@NgModule({
  declarations: [
    StarPlayerComponent,
    StarPlayersComponent,
    StarPlayerEditorComponent,
    StarPlayerFormComponent,
    UniqueUrlIdValidatorDirective
  ],
  imports: [
    SharedModule,
    SharedCommonModule
  ],
  providers: [MessageService]
})
export class StarPlayersModule { }
